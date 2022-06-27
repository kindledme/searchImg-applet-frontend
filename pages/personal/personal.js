import api from '../../utils/request'
import {
    getOpenid,
    getPhone,
    login,
    getuseinfo,
    uesrlike,
    usercollect
} from '../../utils/api'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        num:1,
        loginShow:false,
        useobj:{},
        userinfo:{},
        loginShow2: false,
        likeList:[],
    },
    changenum(e){
        this.setData({
            num:e.currentTarget.dataset.index
        })
        if(this.data.num==1){
            this.getlikeList()
        }else if(this.data.num==2){
            this.getcollectList()
        }
    },
    getcollectList(){
        api.get(usercollect,{}).then(res=>{
            console.log('=====',res)
            if(res.code==1){
                this.setData({
                    likeList:res.data
                })
            }
        })
    },
    // 获取喜欢作品集
    getlikeList(){
        api.get(uesrlike,{}).then(res=>{
            console.log('=====',res)
            if(res.code==1){
                this.setData({
                    likeList:res.data
                })
            }
        })
    },
    navTodetail(e){
        wx.navigateTo({
          url: '../detail/detail?id=' + e.currentTarget.dataset.id,
        })
      },
    login() {
        let that = this
        wx.getUserProfile({
            desc: 'desc',
            success(res) {
                console.log('00000', res)
                // getApp().globalData.userInfo = res.userInfo
                that.setData({
                    userinfo: res.userInfo,
                    loginShow2: true
                })
                that.getOpenid()
                // wx.setStorage({
                //     key: "userinfo",
                //     data: res.userInfo
                // })
            }
        })
    },
    getOpenid() {
        wx.login({
            success: res => {
                // 调用接口获取openid
                api.post(getOpenid, {
                    code: res.code
                }).then(res => {
                    console.log(res)
                    wx.setStorage({
                        key: "user",
                        data: res.data
                    })

                }).catch(err => {

                })
            }
        })
    },
    //获取用户手机号
    getPhoneNumber(e) {
        console.log(e)
        if (e.detail.errMsg === 'getPhoneNumber:ok') {
            //表示用户已授权获取手机号
            console.log("手机号信息：", e);
            api.post(getPhone, {
                encryptedData: e.detail.encryptedData,
                iv: e.detail.iv,
                sessionKey: wx.getStorageSync('user').sessionKey
            }).then(res => {
                if (res.code == 1) {
                    console.log('登录成功', res)
                    wx.setStorage({
                        key: "phone",
                        data: res.data.phoneNumber
                    })
                    this.userLogin()
                   
                }

            })

        }

    },
    userLogin() {
        let that =this
        api.post(login, {
            username: this.data.userinfo.nickName,
            mobile: wx.getStorageSync('phone'),
            openid: wx.getStorageSync('user').openid,
            avatar: this.data.userinfo.avatarUrl
        }).then(res => {
            if (res.code == 1) {
                console.log('登录成功', res)
                wx.setStorage({
                    key: "token",
                    data: res.token
                })
                wx.showToast({
                    title: '登录成功',
                    icon: 'success',
                    duration: 2000,
                    success: function () {
                        that.getusers()
                    }
                })
                this.setData({
                    loginShow: true
                })
            }

        })
    },
    getusers() {
        let that =this
        api.get(getuseinfo, {}).then(res => {
            console.log('用户信息', res)
            if (res.code == 1) {
                wx.setStorage({
                    key: "userinfo",
                    data: res.data
                })
                that.setData({
                    useobj: res.data
                })
                that.getlikeList()
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let token = wx.getStorageSync('token')
        if(token){
            this.setData({ 
                loginShow:true,
                useobj:wx.getStorageSync('userinfo')
            })
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        if(this.data.num==1){
            this.getlikeList()
        }else if(this.data.num==2){
            this.getcollectList()
        }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})