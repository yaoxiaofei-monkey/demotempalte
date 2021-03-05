<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
      <div class="title-container">
        <h3 class="title" style="text-align: center">
          {{ msg }}
        </h3>

      </div>

      <el-form-item prop="username">
        <span class="svg-container">
<!--          <svg-icon icon-class="user" />-->
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          :placeholder="loginForm.username"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">

<!--            <svg-icon icon-class="password" />-->
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            :placeholder="'login.password'"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
<!--            <i class="el-icon-delete"></i>-->
<!--            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />-->
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">
                 {{msg2}}
      </el-button>

    </el-form>
  </div>
</template>

<script>
import {login} from "../../api/login";

export default {
  name: 'HelloWorld',
  data(){

    //账号验证规则
    const validateUsername = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('账号不能为空'))
      } else {
        callback()
      }
    }
    //密码验证规则
    const validatePassword = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('请输入超过4位的密码'))
      } else {
        callback()
      }
    }
    return {
      msg:'系统登录',
      msg2:'登录',
      loginForm: {
        username: 'admin',
        password: 'admin'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  mounted(){
    // this.getdata()
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  methods: {

    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
   //显示或隐藏密码
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
   handleLogin() {
      this.$refs.loginForm.validate(valid => {
        console.log(valid)
        if (valid) {

          // this.$store.dispatch('user/login', this.loginForm)
          //   .then(() => {
          //     this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
          //     this.loading = false
          //   })
          //   .catch(() => {
          //     this.loading = false
          //   })
        this.getdata()

        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getdata(){
      this.loading = true
       let params = {
         userName: this.loginForm.username,
         password: this.loginForm.password
       }
      login(params).then(res=>{
         if(res.code ==200){
           this.loading = false
           //this.$router表示当前url\
           // console.log(this.$router)
           this.$message({
             message: '恭喜你，这是一条成功消息',
             type: 'success'
           });

           window.sessionStorage.setItem("token","1")
           //保存token,作为令牌每次请求其他地址时都要这个
           this.$router.push('/layout')

         }

      })
      // this.axios.post('http://192.168.2.125:8891/user/login', {
      //   userName: this.loginForm.username,
      //   password: this.loginForm.password
      // })
      //   .then(res=> {
      //     console.log(res)
      //     this.loading = false
      //
      //   })
      //   .catch(error=> {
      //     console.log(error)
      //   })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.login-container {
  height: 100vh;
  width: 100vw;
  background-color: #2d3a4b;
  overflow: hidden;
}
.login-form {
  position: relative;
  width: 520px;
  max-width: 100%;
  padding: 160px 35px 0;
  margin: 0 auto;
  overflow: hidden;
}
</style>
