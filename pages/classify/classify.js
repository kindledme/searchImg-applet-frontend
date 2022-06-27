import api from '../../utils/request.js'
import {
  fileNum,
  arttimeSearch,
  category,
  catname
} from '../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ztList:[],
    fgList:[],
    filenum: {},
    timeartList:[],
    colorList:[],
    formdata: {
      begin: '',
      end: ''
    }
  },
  formatTen(num) {
    return num > 9 ? (num + "") : ("0" + num);
  },
  // 标准时间转换
  formDate(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return year + "-" + this.formatTen(month) + "-" + this.formatTen(day);
  },
  //时间减一天
  timeapp(time) {
    // console.log('时间====',time)
    var dateTime = time
    dateTime = dateTime.setDate(dateTime.getDate() + 1)
    dateTime = new Date(dateTime)
    dateTime = this.formDate(dateTime)
    console.log('时间====', dateTime)
    return dateTime
  },
  //时间减一天
  timereduce(time) {
    // console.log('时间====',time)
    var dateTime = time
    dateTime = dateTime.setDate(dateTime.getDate() - 1)
    dateTime = new Date(dateTime)
    dateTime = this.formDate(dateTime)
    console.log('时间====', dateTime)
    return dateTime
  },
  // 获取文件数量
  getfileNum() {
    api.get(fileNum, {}).then(res => {
      console.log('文件数量', res)
      if (res.code == 1) {
        this.setData({
          filenum: res.data
        })
      }
    })
  },
  // 按时间显示作品集
  getarttimeSearch(formdata) {
    console.log('类型', formdata)
    // console.log('类型',typeof(formdata.begin))
    api.get(arttimeSearch, {
      begin: formdata.begin,
      end: formdata.end
    }).then(res => {
      let obj={
        time: formdata.begin,
        list:res.data
      }
      let a=this.data.timeartList
      a.push(obj)
      console.log(a)
      this.setData({
        timeartList:a
      })
    })
  },
    // 获取风格分类
    getfgList(){
      api.get(catname,{
        name:'风格'
      }).then(res=>{
        if(res.code==1){
          this.setData({
            fgList:res.data
          })
        }
        // console.log('智能分类',res)
      })
    },
  // 获取主体分类
  getztList(){
    api.get(catname,{
      name:'主体'
    }).then(res=>{
      if(res.code==1){
        this.setData({
          ztList:res.data
        })
      }
      // console.log('智能分类',res)
    })
  },
  //获取颜色分类
  getcolorList(){
    api.get(catname,{
      name:'颜色'
    }).then(res=>{
      if(res.code==1){
        res.data.forEach((item) => {
          if(item.name=='黑色'){
            item.color='#000000'
          }else if(item.name=='白色'){
            item.color='#FFFFFF'
          }else if(item.name=='灰色'){
            item.color='#BEBEBE'
          }else if(item.name=='红色'){
            item.color='#FF0000'
          }else if(item.name=='橙色'){
            item.color='#FFA500'
          }
          else if(item.name=='黄色'){
            item.color='#FFFF00'
          }
          else if(item.name=='绿色'){
            item.color='#00FF00'
          }
          else if(item.name=='青色'){
            item.color='#00FFFF'
          }
          else if(item.name=='蓝色'){
            item.color='#0000FF'
          }
          else if(item.name=='紫色'){
            item.color='#A020F0'
          }
          else if(item.name=='紫红色'){
            item.color='#FF00FF'
          }
        });
        this.setData({
          colorList:res.data
        })
      }
      // console.log('智能分类',res)
    })
  },
  navToalldata() {
    wx.navigateTo({
      url: '../alldata/alldata',
    })
  },
  navToalldata2(e){
    wx.navigateTo({
      url: '../alldata/alldata?id=' + e.currentTarget.dataset.id,
    })
  },
  navToalldatas(e){
    wx.navigateTo({
      url: '../alldata/alldata?typeid='+e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getfileNum()
    this.getztList()
    this.getfgList()
    this.getcolorList()
    // // 获取当天时间
    // let begin = 'formdata.begin'
    // let end = 'formdata.end'
    // this.setData({
    //   [begin]: this.formDate(new Date()),
    //   [end]: this.timeapp(new Date())
    // })
    // this.getarttimeSearch(this.data.formdata)
    // this.setData({
    //   [begin]: this.timereduce(new Date()),
    //   [end]: this.formDate(new Date()),
    // })
    // this.getarttimeSearch(this.data.formdata)
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