const request = (url, options) => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: 'https://stxcx.mywefu.com/'+url,
            method: options.method,
            data: options.method === 'GET' ? options.data : options.data,
            header: {
                "content-type": "application/x-www-form-urlencoded", // formdata格式
                "authorization":'bearer '+wx.getStorageSync('token')
            },
            success(request) {
                resolve(request.data)
                // if (request.data.code === 2000) {
                //     resolve(request.data)
                // } else {
                //     reject(request.data)
                // }
            },
            fail(error) {
                reject(error.data)
            }
        })
    })
 }
 
 const get = (url, options = {}) => {
    return request(url, { method: 'GET', data: options })
 }
 
 const post = (url, options) => {
    return request(url, { method: 'POST', data: options })
 }
 
 const put = (url, options) => {
    return request(url, { method: 'PUT', data: options })
 }
 
 // 不能声明DELETE（关键字）
 const remove = (url, options) => {
    return request(url, { method: 'DELETE', data: options })
 }
 
 module.exports = {
    get,
    post,
    put,
    remove
 }