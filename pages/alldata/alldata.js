// pages/alldata/alldata.js
import api from '../../utils/request.js'
import {
  artworklist,
  alltag
} from '../../utils/api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    formdata: {
      category: [],
      tags: [],
    },
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    // minDate:'2021,0,1',
    // maxDate:'2021,0,31',
    selectList: [],
    note: [],
    value: '',
    bqlist: [],
    bqlistindex: [],
    taglist: [], //
    cagindexList: [],
    caglist: [{
        id: 1,
        name: '图片'
      },
      {
        name: '视频',
        id: 2
      },
      {
        name: '文件',
        id: 3
      },
    ], //文件类型列表
    numlike: false,
    numdownload: false,
    createtime: false,
    numviews:false,
  },
  //时间转换
  timestampToTime(time){
    if(time===0||time==null){
      return ''
    }else{
      var date=new Date(time)
      var Y=date.getFullYear()+'-'
      var M=(date.getMonth()+1<10?'0'+(date.getMonth()+1):date.getMonth()+1)
      return Y+M
    }
  },
  //获取时间
  onInput(event) {
    // console.log(this.timestampToTime(event.detail))
    this.setData({
      currentDate: event.detail,
    });
  },
  //时间重置
  classtime(){
    let year = 'formdata.year'
    let month = 'formdata.month'
    this.setData({
      [year]:'',
      [month]:''
    })
    this.getartworkList(this.data.formdata)
    this.selectComponent('#ref4').toggle(false);
  },
  //时间筛选
  chosetime(){
    let y=this.timestampToTime(this.data.currentDate)
    let arr=[]
    arr=y.split('-')
    let year = 'formdata.year'
    let month = 'formdata.month'
    this.setData({
      [year]:arr[0],
      [month]:arr[1]
    })
    this.getartworkList(this.data.formdata)
    this.selectComponent('#ref4').toggle(false);
  },
  //获取标签
  getalltag2() {
    api.get(alltag, {
      status: 1
    }).then(res => {
      if (res.code == 1) {
        res.data.forEach(val => {
          val.selectList = []
        });
        this.setData({
          bqlist: res.data
        })
      }
    })
  },
  // 标签全部按钮
  classno2(e) {
    let value = "bqlist[" + e.currentTarget.dataset.bqlistindex + "].selectList";
    let list = []
    this.setData({
      [value]: list
    })
  },
  //标签按钮
  active2(e) {
    //大分类index
    // console.log('e====', e.currentTarget.dataset.taglistindex)
    //小的index
    // console.log('e====', e.currentTarget.dataset.index)
    if (this.data.bqlist[e.currentTarget.dataset.bqlistindex].selectList.indexOf(e.currentTarget.dataset.index) == -1) {
      let list = this.data.bqlist[e.currentTarget.dataset.bqlistindex].selectList
      list.push(e.currentTarget.dataset.index)
      let value = "bqlist[" + e.currentTarget.dataset.bqlistindex + "].selectList";
      this.setData({
        [value]: list
      })
    } else {
      let numdata = this.data.bqlist[e.currentTarget.dataset.bqlistindex].selectList.indexOf(e.currentTarget.dataset.index)
      //从选中数组清楚 remove
      console.log('清除')
      let dataTest = this.data.bqlist[e.currentTarget.dataset.bqlistindex].selectList
      dataTest.splice(numdata, 1)
      console.log('e====', dataTest)
      let valueTo = "bqlist[" + e.currentTarget.dataset.bqlistindex + "].selectList";
      this.setData({
        [valueTo]: dataTest
      })
    }
  },
  update2() {
    this.data.bqlist.forEach(item => {
      let value = []
      item.selectList = value
    });
    let list = this.data.bqlist
    let value = 'formdata.tags'
    let list1 = []
    this.setData({
      bqlist: list,
      [value]: list1
    })

  },
  //标签筛选
  chosetag2() {
    let list = []
    let num = 0
    this.data.bqlist.forEach((item, index) => {
      if (item.selectList.length == 0) {
        num += 1
      }
    });
    if (num < this.data.bqlist.length) {
      this.data.bqlist.forEach((item, index) => {
        if (item.selectList.length == 0) {
          // let list=[]
          item.tagData.forEach((item1) => {
            list.push(item1.id)
          });
        } else {
          item.selectList.forEach((item1, index1) => {
            list.push(item.tagData[item1].id)
          });
        }
      })

    }
    let value = 'formdata.tags'
    this.setData({
      [value]: list
    })
    this.getartworkList(this.data.formdata)
    this.selectComponent('#ref2').toggle(false);
  },




  //智能分类全部按钮
  classno(e) {
    let value = "taglist[" + e.currentTarget.dataset.taglistindex + "].selectList";
    let list = []
    this.setData({
      [value]: list
    })
  },
  //智能分类筛选
  chosetag() {
    let list = []
    let num = 0
    this.data.taglist.forEach((item, index) => {
      if (item.selectList.length == 0) {
        num += 1
      }
    });
    if (num < this.data.taglist.length) {
      this.data.taglist.forEach((item, index) => {
        if (item.selectList.length == 0) {
          // let list=[]
          item.tagData.forEach((item1) => {
            list.push(item1.id)
          });
        } else {
          item.selectList.forEach((item1, index1) => {
            list.push(item.tagData[item1].id)
          });
        }
      })

    }
    let value = 'formdata.category'
    this.setData({
      [value]: list
    })
    this.getartworkList(this.data.formdata)
    this.selectComponent('#ref').toggle(false);
  },
  //智能分类重置
  update() {
    this.data.taglist.forEach(item => {
      let value = []
      item.selectList = value
    });
    let list = this.data.taglist
    let value = 'formdata.category'
    let list1 = []
    this.setData({
      taglist: list,
      [value]: list1
    })

  },
  //智能分类按钮
  active(e) {
    //大分类index
    // console.log('e====', e.currentTarget.dataset.taglistindex)
    //小的index
    // console.log('e====', e.currentTarget.dataset.index)
    if (this.data.taglist[e.currentTarget.dataset.taglistindex].selectList.indexOf(e.currentTarget.dataset.index) == -1) {
      let list = this.data.taglist[e.currentTarget.dataset.taglistindex].selectList
      list.push(e.currentTarget.dataset.index)
      let value = "taglist[" + e.currentTarget.dataset.taglistindex + "].selectList";
      this.setData({
        [value]: list
      })
      // console.log('e====', this.data.taglist[e.currentTarget.dataset.taglistindex].selectList.indexOf(e.currentTarget.dataset.index))
    } else {
      let numdata = this.data.taglist[e.currentTarget.dataset.taglistindex].selectList.indexOf(e.currentTarget.dataset.index)
      console.log('e====', this.data.taglist[e.currentTarget.dataset.taglistindex].selectList)
      //从选中数组清楚 remove
      console.log('清除')
      let dataTest = this.data.taglist[e.currentTarget.dataset.taglistindex].selectList
      dataTest.splice(numdata, 1)
      console.log('e====', dataTest)
      let valueTo = "taglist[" + e.currentTarget.dataset.taglistindex + "].selectList";
      this.setData({
        [valueTo]: dataTest
      })
    }
    // let m=[]
    // this.data.taglist.forEach((item) => {
    //   if (item.selectList.length > 0) {
    //     item.selectList.forEach((item1, index1) => {
    //       if(m.indexOf(item.tagData[item1].id)!=-1){
    //         let y=m.indexOf(item.tagData[item1].id)
    //         m.splice(y, 1)
    //       }else{
    //         m.push(item.tagData[item1].id)
    //       }

    //     });
    //   }
    // });
    // this.setData({
    //   tagnot:m
    // })
  },
//时间关闭弹框
onClose() {
  this.selectComponent('#ref4').toggle(false);
},

  //文件类型筛选按钮
  chosecag() {
    let list = this.data.cagindexList

    let value = 'formdata.type'
    this.setData({
      [value]: list
    })
    this.getartworkList(this.data.formdata)
    this.selectComponent('#ref3').toggle(false);
  },
  //文件类型全部按钮
  classcag() {
    let list = []
    this.setData({
      cagindexList: list
    })
  },
  //文件类型按钮
  activecag(e) {
    console.log('e====', e.currentTarget.dataset.index)
    console.log('e====', this.data.cagindexList)
    console.log('e====', this.data.cagindexList.indexOf(e.currentTarget.dataset.index))
    if (this.data.cagindexList.indexOf(e.currentTarget.dataset.id) == -1) {
      let list = this.data.cagindexList
      list.push(e.currentTarget.dataset.id)
      this.setData({
        cagindexList: list
      })
    } else {
      let numdata = this.data.cagindexList.indexOf(e.currentTarget.dataset.id)
      console.log('e====', numdata)
      let dataTest = this.data.cagindexList
      dataTest.splice(numdata, 1)
      this.setData({
        cagindexList: dataTest
      })
    }
  },
  // 喜欢排序
  sortllan() {
    if (this.data.numlike == false) {
      let value = 'formdata.sort'
      this.setData({
        [value]: '-num_like'
      })
    }else{
      let value = 'formdata.sort'
      this.setData({
        [value]: 'num_like'
      })
    }
    let key=!this.data.numlike
    this.setData({
      numlike:key,
      numdownload: false,
      createtime: false,
      numviews:false,
    })
    this.getartworkList(this.data.formdata)
  },
  //下载排序
    sortllan2() {
      if (this.data.numdownload == false) {
        let value = 'formdata.sort'
        this.setData({
          [value]: '-num_download'
        })
      }else{
        let value = 'formdata.sort'
        this.setData({
          [value]: 'num_download'
        })
      }
      let key=!this.data.numdownload
      this.setData({
        numdownload:key,
        numlike: false,
        createtime: false,
        numviews:false,

      })
      this.getartworkList(this.data.formdata)
    },
      // 浏览排序
  sortllan1() {
    if (this.data.numviews == false) {
      let value = 'formdata.sort'
      this.setData({
        [value]: '-num_views'
      })
    }else{
      let value = 'formdata.sort'
      this.setData({
        [value]: 'num_views'
      })
    }
    let key=!this.data.numviews
    this.setData({
      numviews:key,
      numlike:false,
      numdownload: false,
      createtime: false,
    })
    this.getartworkList(this.data.formdata)
  },
    // 时间排序
    sortllan3() {
      if (this.data.createtime == false) {
        let value = 'formdata.sort'
        this.setData({
          [value]: '-create_time'
        })
      }else{
        let value = 'formdata.sort'
        this.setData({
          [value]: 'create_time'
        })
      }
      let key=!this.data.createtime
      this.setData({
        createtime:key,
        numlike: false,
        numdownload: false,
        numviews:false,

      })
      this.getartworkList(this.data.formdata)
    },

  //获取智能分类
  getalltag() {
    api.get(alltag, {
      status: 2
    }).then(res => {
      if (res.code == 1) {
        res.data.forEach(val => {
          val.selectList = []
        });
        this.setData({
          taglist: res.data
        })
      }
    })
  },

  //搜索
  onSearch(e) {
    let obj = {
      description: e.detail
    }
    this.getartworkList(obj)
  },
  // 获取列表
  getartworkList(obj) {

    console.log('form===', obj)
    api.get(artworklist, obj).then(res => {
      if (res.code == 1) {
        this.setData({
          note: res.data
        })
      }
      console.log('作品集列表', res)
    })
  },
  navTodetail(e) {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getalltag()
    this.getalltag2()
    console.log(options)
    if (options.id) {
      let list2 = []
      list2.push(Number(options.id))
      let category='formdata.category'
      // let tags = 'formdata.tags'
      this.setData({
        [category]:list2,
        // [tags]: list2
      })
      this.getartworkList(this.data.formdata)
    } 
    if (options.typeid) {
      let list3 = []
      list3.push(Number(options.typeid))
      // let category='formdata.category'
      let tags = 'formdata.type'
      this.setData({
        cagindexList:list3,
        [tags]: list3
      })
      this.getartworkList(this.data.formdata)
    } 
    if(options.tagid){
      let list4 = []
      list4.push(Number(options.tagid))
      // let category='formdata.category'
      let tags = 'formdata.tags'
      this.setData({
        // [category]:list1,
        [tags]: list4
      })
      this.getartworkList(this.data.formdata)
    }
    if(!options.id&&!options.typeid&&!options.tagid){
      this.getartworkList()
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