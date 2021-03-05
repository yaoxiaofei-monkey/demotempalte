import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login/login'
import layout from '../components/Layout/layout'
import shopManagement from '../components/proc/shopManagement'
import productManagement from '../components/proc/productManagement'
import processManagement from '../components/proc/processManagement'
import outpuRegister from '../components/proc/outpuRegister'
import orderManagement from '../components/proc/orderManagement'
import dashbord from '../components/proc/dashbord'
Vue.use(Router)

//Router是管理者
//routes是一组路由
//route是当前路由



const router = new Router({
  //为路由对象添加beforeEach

  routes: [
    {
      //表示首页是login组件
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/layout',
      name: 'layout',
      component: layout,
      redirect:'/layout/dashbord',
      //写了重定向后可以展示主路由下面的子路由
      children:[
        {
          path: '/layout/dashbord',
          name: 'dashbord',
          //name属性相当于路由路径的别名，写这个name属性后也能跳转到这个组件
          component: dashbord,
        },
        {
          path: '/layout/shopManagement',
          name: 'shopManagement',
          component: shopManagement,
        },
        {
          path: '/layout/processManagement',
          name: 'processManagement',
          component: processManagement,
        },
        {
          path: '/layout/productManagement',
          name: 'productManagement',
          component: productManagement,
        },
        {
          path: '/layout/orderManagement',
          name: 'orderManagement',
          component: orderManagement,
        },
        {
          path: '/layout/outpuRegister',
          name: 'outpuRegister',
          component: outpuRegister,
        },

      ]

    }
  ]
})
router.beforeEach((to,from,next)=>{
    //to表示将访问的路径
    //from表示从哪儿来
    //next表现下一个通过函数
    if(to.path ==='/'){
      return next()
    }else{
     const a =  window.sessionStorage.getItem('token')
      if(a){
        return next()
      }else{

        return next('/')
      }

    }






})
export default  router
