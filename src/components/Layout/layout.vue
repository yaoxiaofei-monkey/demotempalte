<template>
<div>
  <div style="height: 80px;background: dimgrey">
    <el-row>
      <el-col :span="3" style="text-align: center">
        <img src="../../assets/logo.png" alt="" height="80" style="vertical-align: bottom">
      </el-col>
      <el-col :span="19" style="text-align: center;line-height: 80px;font-size:20px">
        生成流程跟踪系统
      </el-col>
      <el-col :span="2" style="position: relative">

        <div style="height: 40px;line-height: 40px;margin-top: 20px">
        <el-dropdown @command="setdown">
            <span class="el-dropdown-link" style="font-size: 20px">
                 <i class="el-icon-user-solid" style="color: black"></i>
                <span style="color: black">用户管理</span>
            </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">退出</el-dropdown-item>
            <el-dropdown-item command="b">修改密码</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        </div>
      </el-col>

    </el-row>
  </div>
  <el-row>
    <el-col :span="3">
      <div class="grid-content bg-purple">
        <el-menu
          :uniqueOpened="true"
          :router="true"
          style="height:calc(100vh - 80px);"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">

          <el-menu-item index="/layout/dashbord">
            <i class="el-icon-view"></i>
            <template #title>首页</template>
          </el-menu-item>

          <el-menu-item index="/layout/shopManagement">
              <i class="el-icon-s-tools"></i>
            <template #title>车间管理</template>
          </el-menu-item>


          <el-menu-item index="/layout/processManagement">
            <i class="el-icon-menu"></i>
            <template #title>流程工艺管理</template>
          </el-menu-item>


          <el-menu-item index="/layout/productManagement" >
            <i class="el-icon-document"></i>
            <template #title>产品管理</template>
          </el-menu-item>


          <el-menu-item index="/layout/orderManagement">
            <i class="el-icon-edit-outline"></i>
            <template #title>订单管理</template>
          </el-menu-item>



          <el-menu-item index="/layout/outpuRegister">
            <i class="el-icon-document"></i>
            <template #title>产量登记</template>
          </el-menu-item>

        </el-menu>



      </div>
    </el-col>
    <el-col :span="21">
      <div class="grid-content bg-purple">
        <router-view/>
      </div>
    </el-col>

  </el-row>
  </div>
</template>

<script>
export default {
  name: "layout",
  methods:{
    setdown(command){
        if(command == "a"){
          this.$router.push('/')
        }else if(command == "b"){
          //修改密码

        }


    }


  }
}
</script>

<style scoped>
.el-row {
  /*row的样式*/
}
.el-col {
 /*col的样式*/
}
.el-dropdown-link {
  cursor: pointer;
  /*color: #409EFF;*/
}
</style>
