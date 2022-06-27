// index.js
// 获取应用实例
import api from '../../utils/request.js'
import {
  getindexBanner,
  getlikeArts,
  getnewArts,
  recommendtag
} from '../../utils/api'
const app = getApp()

Page({
  data: {
    background: [],
    artLis:[],
    newartList:[],
    newartListeach:[],
  },
  navToalldata() {
    wx.navigateTo({
      url: '../alldata/alldata',
    })
  },
  navToalldata2(e) {
    wx.navigateTo({
      url: '../alldata/alldata?tagid='+e.currentTarget.dataset.tagid,
    })
  },
  navTodetail1(){
    wx.navigateTo({
      url: '../detail/detail?id=' +this.data.newartListeach[0].id,
    })
  },
  navTodetail2(){
    wx.navigateTo({
      url: '../detail/detail?id=' +this.data.newartListeach[1].id,
    })
  },
  navTodetail3(){
    wx.navigateTo({
      url: '../detail/detail?id=' +this.data.newartListeach[2].id,
    })
  },
  navTodetail(e){
    wx.navigateTo({
      url: '../detail/detail?id=' + e.currentTarget.dataset.id,
    })
  },
  getnewArts(){
    api.get(getnewArts,{}).then(res=>{
      if(res.code==1){
        this.setData({
          newartListeach:res.data.slice(0,3),
          newartList:res.data.slice(3)
        })
      }
      console.log('------图片list', res)
    }) 
  },
  getArts(){
    api.get(recommendtag,{}).then(res=>{
      if(res.code==1){
        this.setData({
          artLis:res.data
        })
      }
      console.log('------图片list', res)
    }) 
  },
  getbanner(){
    api.get(getindexBanner,{}).then(res=>{
      if(res.code==1){
        this.setData({
          background:res.data
        })
      }
      console.log('------图片list', res)
    }) 
  },
  onLoad() {
    this.getbanner()
    this.getArts()
    this.getnewArts()
  },

})