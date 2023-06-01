import request from './request'

export const menuList = () => {
    // 发起一个get请求
  return request({
    url: '/menus',
    method: 'GET'
  })
}