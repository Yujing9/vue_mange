import request from './request'

export const login = (data) => {
    // 发起一个post请求
  return request({
    url: '/login',
    method: 'POST',
    data
  })
}

// // 发起一个post请求
// axios({
//     method: 'post',
//     url: '/user/12345',
//     data: {
//       firstName: 'Fred',
//       lastName: 'Flintstone'
//     }
//   });