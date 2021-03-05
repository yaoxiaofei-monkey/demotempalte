import request from '../utils/request.js'
//导入设置好的请求
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
