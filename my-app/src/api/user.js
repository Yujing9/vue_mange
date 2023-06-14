import request from './request'

export const userList = (params) => {
    // 发起一个get请求
  return request({
    url: '/users',
    params
  })
}
export const changeUserState = (uId, type) => {
  return request({
    url: `/users/${uId}/state/${type}`,
    method: 'put'
  })
}
export const addUser = (data) => {
  return request({
    url: '/users',
    method: 'post',
    data
  })
}
export const editUser = (data) => {
  return request({
    url: `/users/${data.id}`,
    method: 'put',
    data
  })
}
export const deleteUser = (id) => {
  return request({
    url: `/users/${id}`,
    method: 'delete'
  })
}