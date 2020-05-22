<template>
  <div id="login">
    <div class="loginConbox">
      <div class="header">
        <!--<div class="logo">-->
        <!--<img src="../../assets/logo.png">-->
        <!--</div>-->
      </div>
      <div class="loginBox">
        <div class="loginCon">
          <p class="title">科技网站管理后台系统</p>
<!--          <p class="title"></p>-->
          <el-card shadow="always" class="login-module" v-if="smdl">
            <div slot="header" class="clearfix formTitlt">
              <span>登录</span>
              <span class="titIconbox">
              <i class="iconfont xu-saomadenglu2 fa-lg iconcolor"></i>
              <i class="iconfont xu-saomadenglu01 el-icon--right fa-lg pointer" @click="smdl = !smdl"></i>
            </span>
            </div>
            <el-form :model="loginForm" status-icon label-width="100px" class="demo-ruleForm">
              <el-form-item>
                <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="请输入登录账号"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input type="password" v-model="loginForm.password" auto-complete="off"
                          placeholder="请输入登录密码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="subBtn" type="primary" @click="submitForm">登录</el-button>
              </el-form-item>
            </el-form>
          </el-card>


        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Login',
  components: {

  },
  data() {
    return {
      smdl: true,
      loginForm: {
        username: "",
        password: ""
      }
    }
  },
  methods: {
    submitForm () {
      let that = this
      if (this.loginForm.username === "" || this.loginForm.password === "") {
        this.$message({
          showClose: true,
          message: "账号或密码不能为空",
          type: "error"
        })
        return false
      } else {
        let data = {
          username:this.loginForm.username,
          password:this.loginForm.password
        };
        this.axios.post('http://localhost:8071/admin/sys-user/login',this.qs.stringify(data)).then(res=>{
          if(res.data.errorCode=='0000'){
            this.$message({
              showClose: true,
              message: '登陆成功',
              type: 'success'
            });
            console.log(res.data)
            this.$store.commit('updateToken',res.data.result.token);
            this.$store.commit('updateName',res.data.result.user.username);
            this.$router.push('/home')
          }else{
            this.$message({
              showClose: true,
              message: res.data.errorMessage,
              type: 'error'
            });
          }
          return
        });

       // this.axios.post('http://localhost:8071/sys-user/insert',this.qs.stringify(data))
        //todo login  token
        //this.$router.push('/home')
        console.log(this.loginForm.username)
        console.log(this.loginForm.password)
      }
    },
  },
  mounted () {

  }
}
</script>
<style>
  #login {
    width: 100%;
    height: 100%;
    background-color: #2d3a4b;
  }
  #login .loginConbox {
    background: #2d3a4b;
  }
  #login .header {
    height: 60px;
    position: relative;
    background: #2d3a4b;
    /*border-bottom: 1px solid rgba(255, 255, 255, 0.3);*/
  }
  #login .header .logo {
    margin-left: 30px;
    width: 500px;
    float: left;
    height: 40px;
    padding-top: 10px;
  }
  #login .header .logo img {
    height: 100%;
  }
  #login .loginBox {
    padding: 74px 0 118px;
  }
  #login .loginBox .iconcolor {
    color: #409EFF;
  }
  #login .loginBox .loginCon {
    width: 990px;
    margin: auto;
    position: relative;
    height: 388px;
  }
  #login .loginBox .loginCon .el-card__header {
    border-bottom: 0px;
  }
  #login .loginBox .loginCon .title {
    font-size: 36px;
    font-weight: 600;
    color: #ffffff;
    width: 500px;
    float: left;
    margin-top: 0px;
  }
  #login .loginBox .loginCon .title:first-child {
    font-size: 34px;
    margin-top: 50px;
    margin-bottom: 30px;
  }
  #login .loginBox .loginCon .login-module {
    width: 380px;
    height: 325px;
    margin-top: 60px;
    border: none;
    position: absolute;
    right: 0;
  }
  #login .loginBox .loginCon .login-module .formTitlt {
    font-size: 18px;
    font-weight: 400;
  }
  #login .loginBox .loginCon .login-module .formTitlt .titIconbox {
    float: right;
  }
  #login .loginBox .loginCon .login-module .formTitlt .titIconbox .pointer {
    cursor: pointer;
  }
  #login .loginBox .loginCon .login-module .smalltxt {
    text-align: right;
  }
  #login .loginBox .loginCon .login-module .smalltxt .a {
    text-decoration: none;
    color: #999999;
    font-size: 12px;
    margin-left: 8px;
  }
  #login .loginBox .loginCon .el-form-item__content {
    margin-left: 0px !important;
  }
  #login .loginBox .loginCon .el-form-item__content .subBtn {
    width: 100%;
  }
  #login .loginBox .el-input__inner, #login .loginBox .el-button, #login .loginBox .el-card, #login .loginBox .el-message {
    border-radius: 0px !important;
  }
  #login .loginBox .el-form-item__content .ico {
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 999;
    width: 40px;
    height: 39px;
    text-align: center;
    border-right: 1px solid #ccc;
  }
  #login .loginBox .ewmbox {
    width: 100%;
    height: 240px;
    margin-top: -25px;
  }
  #login .loginBox .ewmbox .ewm {
    width: 140px;
    height: 140px;
    margin: 20px auto;
  }
  #login .loginBox .ewmbox .ewm p {
    font-size: 12px;
    padding-left: 40px;
    margin: 0;
  }
  #login .loginBox .ewmbox .ewmicon {
    width: 140px;
    margin: 20px auto 0;
  }
  #login .loginBox .ewmbox .ewmicon .iconfont {
    float: left;
  }
  #login .loginBox .ewmbox .ewmicon p {
    font-size: 12px;
    padding-left: 40px;
    margin: 0;
  }
</style>
<!--<style lang="scss">-->
<!--  #login {-->
<!--    width: 100%;-->
<!--    height: 100%;-->
<!--    background-color: #2d3a4b;-->
<!--    .loginConbox{-->
<!--      background: #2d3a4b;-->
<!--    }-->
<!--    .header {-->
<!--      height: 60px;-->
<!--      position: relative;-->
<!--      background: #2d3a4b;-->
<!--      /*border-bottom: 1px solid rgba(255, 255, 255, 0.3);*/-->
<!--      .logo{-->
<!--        margin-left: 30px;-->
<!--        width: 500px;-->
<!--        float: left;-->
<!--        height: 40px;-->
<!--        padding-top: 10px;-->
<!--        img{-->
<!--          height: 100%;-->
<!--        }-->
<!--      }-->
<!--    }-->

<!--    .loginBox {-->
<!--      .iconcolor {-->
<!--        color: #409EFF;-->
<!--      }-->

<!--      padding: 74px 0 118px;-->

<!--      .loginCon {-->
<!--        width: 990px;-->
<!--        margin: auto;-->
<!--        position: relative;-->
<!--        height: 388px;-->

<!--        .el-card__header {-->
<!--          border-bottom: 0px;-->
<!--        }-->
<!--        .title{-->
<!--          font-size: 36px;-->
<!--          font-weight: 600;-->
<!--          color: #ffffff;-->
<!--          width: 500px;-->
<!--          float: left;-->
<!--          margin-top: 0px;-->
<!--          &:first-child{-->
<!--            font-size: 34px;-->
<!--            margin-top: 50px;-->
<!--            margin-bottom: 30px;-->
<!--          }-->
<!--        }-->
<!--        .login-module {-->
<!--          width: 380px;-->
<!--          height: 325px;-->
<!--          margin-top: 60px;-->
<!--          border: none;-->
<!--          position: absolute;-->
<!--          right: 0;-->

<!--          .formTitlt {-->
<!--            font-size: 18px;-->
<!--            font-weight: 400;-->

<!--            .titIconbox {-->
<!--              float: right;-->

<!--              .pointer {-->
<!--                cursor: pointer;-->
<!--              }-->
<!--            }-->
<!--          }-->

<!--          .smalltxt {-->
<!--            text-align: right;-->

<!--            .a {-->
<!--              text-decoration: none;-->
<!--              color: #999999;-->
<!--              font-size: 12px;-->
<!--              margin-left: 8px;-->
<!--            }-->
<!--          }-->
<!--        }-->

<!--        .el-form-item__content {-->
<!--          margin-left: 0px !important;-->

<!--          .subBtn {-->
<!--            width: 100%;-->
<!--          }-->
<!--        }-->
<!--      }-->

<!--      .el-input__inner, .el-button, .el-card, .el-message {-->
<!--        border-radius: 0px !important;-->
<!--      }-->

<!--      .el-form-item__content .ico {-->
<!--        position: absolute;-->
<!--        top: 0px;-->
<!--        left: 0px;-->
<!--        z-index: 999;-->
<!--        width: 40px;-->
<!--        height: 39px;-->
<!--        text-align: center;-->
<!--        border-right: 1px solid #ccc;-->
<!--      }-->

<!--      .ewmbox {-->
<!--        width: 100%;-->
<!--        height: 240px;-->
<!--        margin-top: -25px;-->

<!--        .ewm {-->
<!--          width: 140px;-->
<!--          height: 140px;-->
<!--          margin: 20px auto;-->

<!--          p {-->
<!--            font-size: 12px;-->
<!--            padding-left: 40px;-->
<!--            margin: 0;-->
<!--          }-->
<!--        }-->

<!--        .ewmicon {-->
<!--          width: 140px;-->
<!--          margin: 20px auto 0;-->

<!--          .iconfont {-->
<!--            float: left;-->
<!--          }-->

<!--          p {-->
<!--            font-size: 12px;-->
<!--            padding-left: 40px;-->
<!--            margin: 0;-->
<!--          }-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--</style>-->
