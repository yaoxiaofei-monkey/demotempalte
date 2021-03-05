import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
const service = axios.create({
  baseURL: 'http://192.168.2.125:8891',
// url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000000 // request timeout
})

service.interceptors.request.use(
  config => {
    // do something before request is sent

    // if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
    //   config.headers['X-Token'] = getToken()
    // }
    //设置每次发送的请求头
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    // return Promise.reject(error)
    return error
  }
)

service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.、
    //不等于200就报错，使用element ui报错
    if (res.code !== 200) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          // store.dispatch('user/resetToken').then(() => {
          //   location.reload()
          // })
          console.log('失败')
        })
      }
      // return Promise.reject(new Error(res.message || 'Error'))
      return res
    } else {

      //code等于200直接返回res
      return res
    }
  },
  //响应错误信息处理
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
//暴露这个模块export default一个模块中只能有一个export default
//可以有多个export
export default service
