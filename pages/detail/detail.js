import api from '../../utils/request.js'
import moment from '../../utils/moment'
import {
    artdetail,
    like,
    collect
} from '../../utils/api'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        id:Number,
        num:0,
        tap:1,
        form:{},
    },
    collect(){
        api.post(collect,{id:this.data.id}).then(res=>{
            if(res.code==1){
                this.getobj()

            }else{
                wx.showToast({
                    title: '请登录后操作',
                    icon: 'error',
                    duration: 2000,
                    success: function () {
                        wx.switchTab({
                          url: '../personal/personal',
                        })
                    }
                })
            }
        })
    },
    qxcollect(){
        api.remove(collect,{id:this.data.id}).then(res=>{
            if(res.code==1){
                this.getobj()
            }
        })
    },
    qxlike(){
        api.remove(like,{id:this.data.id}).then(res=>{
            if(res.code==1){
                this.getobj()
            }
        })
    },
    like(){
        api.post(like,{id:this.data.id}).then(res=>{
            if(res.code==1){
                this.getobj()
                // wx.showToast({
                //     title: '已添加喜欢',
                //     icon: 'success',
                //     duration: 2000,
                //     success: function () {
                //         that.getusers()
                //     }
                // })
            }else{
                wx.showToast({
                    title: '请登录后操作',
                    icon: 'error',
                    duration: 2000,
                    success: function () {
                        wx.switchTab({
                          url: '../personal/personal',
                        })
                    }
                })
            }
        })
    },
    clickthis(e){
        for(let i=0;i<this.data.form.pictureData.length;i++){
            if(e.currentTarget.dataset.id==this.data.form.pictureData[i].id){
                this.setData({
                    num:i
                })
            }
        }
    },
    navToimg(e){
        wx.navigateTo({
          url: '../bigimg/bigimg?id='+e.currentTarget.dataset.id,
        })
    },
    dowres(){
        wx.downloadFile({
            url: this.data.form.pictureData[this.data.num].picUrl, //仅为示例，并非真实的资源
            success: (res) => {
                console.log(res)
                // let image = res.tempFilePath;
                wx.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath,
                  success(res){
                      wx.showToast({
                        title: '保存成功',
                        icon:'success',
                        duration:2000
                      })
                  },
                  fail:function(err){
                      if(err.errMsg=="saveImageToPhotosAlbum:fail auth deny"){
                          wx.openSetting({
                            success(settingdata){
                                if (settingdata.authSetting['scope.writePhotosAlbum']) {
                                    console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                                  } else {
                                    console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                                  }
                            }
                          })
                      }
                  }
                })
            }
        
        })
    },
    tapchange(){
        if(this.data.tap==1){
            this.setData({
                tap: 2
              })
        }else{
            this.setData({
                tap: 1
              })
        }
        
    },
    getobj(){
        api.get(artdetail,{id:this.data.id}).then(res=>{
            if(res.code==1){
                res.data.createTime= moment(res.data.createTime).format('YYYY-MM-DD HH:mm')
                this.setData({
                    form:res.data,
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log('-------',options)
        this.setData({
            id: options.id,
        })
        this.getobj()
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