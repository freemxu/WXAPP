const app = getApp()
var template = require("../../compoments/tBar/tBar.js");

Page({

  data: {

  },
  
  onLoad: function () {
    template.tabbar("tabBar", 2, this)//0表示第一个tabbar
  },

  getInformation: function (){
    wx.checkSession({
      success() {
        //session_key 未过期，并且在本生命周期一直有效
      },
      fail() {
        // session_key 已经失效，需要重新执行登录流程
        wx.login({  //重新登录
          success(res) {
            if (res.code) {
              //发起网络请求
              wx.request({
                url: 'https://test.com/onLogin',  /////发送登录凭证
                data: {
                  code: res.code
                }
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
      }
    })
  },

  passwordInput:function(event){
    this.data.pwd = event.detail.value;
  },

  usernameInput:function(event){
    this.data.name = event.detail.value;
  },

  loginClick:function(event){
    self = this;
    // if(true){
      // wx.request({
      //   url: 'http://localhost:8080/user/selectUserById/',
      //   data:{
      //     'id':'2',
      //   },
      //   method: 'GET',
      //   header: {
      //     "content-type": "application/x-www-form-urlencoded"
      //   },
      //   success: function(res){
      //     if (res.statusCode == 200){
      //       console.log(res);
      //     }else{
      //       console.log("fail");
      //       console.log(res);
      //     }
      //   },
      //   fail: function(res){
      //     console.log('failed GET');
      //   }
      // })
      wx.login({
        success: function(res){
          if(res.code){
            wx.request({
              url: 'xx',
              data: {
                code:  res.code
              },
              method: 'POST',
              header: {
                'content-type': 'application/json',
              },
              success: function (res){
                console.log("access_token:", res.data.access_token);
                var token = res.data.access_token;
                wx.getUserInfo({
                  ///////
                  success: res => {
                    // 保存用户信息到服务端
                    wx.request({
                      url: "xxxx",
                      data: res.userInfo,
                      method: "POST",
                      header: {
                        'Authorization': 'Bearer ' + token,
                        'content-type': 'application/json',
                      },
                      success: function (res) {
                        console.log("success");
                      },
                      fail: function (error) {
                        console.log(error);
                      }
                    })
                  }
                })
              },
              fail: function (error){
                console.log(error);
              }
            })
          } else {
            console.log("error code:" + res.errMsg);
          }
        }
      })
    // }
  }
})