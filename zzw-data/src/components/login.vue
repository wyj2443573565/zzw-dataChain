<template>
  <div class="main">
    <div class="con-box">
      <img src="../assets/img/zzw-logo.png" class="zzw-logo" alt="智招网Logo" @click="goToHome">
      <div class="login-form">
        <div class="form-list">
          <label for="phone"  class="input-icon input-icon-phone"></label>
          <input id="phone" type="text" v-model="loginInfo.phone" placeholder="请输入手机号">
        </div>
        <div class="form-list">
          <label for="code"  class="input-icon input-icon-code"></label>
          <input id="code" type="text"  v-model="loginInfo.sms_code"  placeholder="请输入验证码">
          <button class="code-btn" :disabled="codeDisabled" @click.prevent ="getCode">{{codeTime}}</button>
        </div>
        <div class="login-btn" @click="loginIn">
          登陆
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "login",
      data(){
          return{
            loginInfo:{
              sms_code:'',
              phone:''
            },
            codeTime:'验证码',
            codeDisabled:false
          }
      },
      methods:{
        getCode(){
          if(this.loginInfo.phone){
            if(!((/1[3|5|7|8|]\d{9}/g).test(this.loginInfo.phone))){
              this.$message.warning('请输入正确的手机号');
              return;
            }
          }else{
            this.$message.warning('请输入手机号');
            return;
          }
          this.axios.post(this.apis.getCode.path,{
              phone: this.loginInfo.phone
            }).then((response)=>{
              if(response.errno==='200'){
                this.codeDisabled=true;
                this.codeTime=60;
                let codeTimeId=setInterval(()=>{
                  this.codeTime--;
                  if(this.codeTime===0){
                    clearInterval(codeTimeId);
                    this.codeDisabled=true;
                    this.codeTime='验证码'
                  }
                },1000)
              }
          })
        },
        goToHome(){
          this.$router.push({path: '/'})
        },
        loginIn(){
          if(this.loginInfo.sms_code){
            this.axios.post(this.apis.login.path,this.loginInfo).then(response=>{
              // store.login();
                this.$router.push({path:'/person'})
            })
          }else{
            this.$message.warning('请输入验证码')
          }

        }

      }
    }
</script>

<style scoped>
  body,html{
    height:100%;
    min-height: 700px;
  }

  .zzw-logo{
    display: inline-block;
    width:290px;
    height:110px;
    margin:200px auto 0 auto;
  }
  .main{
    height:100%;
    background: url('../assets/img/loginBg.png') 0 0 no-repeat;
    background-size: cover;
  }
  .input-icon{
    display: inline-block;
    width:30px;
    height:36px;
  }
  .con-box{
    width:70%;
    margin:0 auto;
    text-align: center;
  }

  .login-form{
    margin-top: 100px;
  }
  .form-list{
    border-bottom:1px solid #f8f8f8;
    margin-top:50px;
    position:relative;
    padding-bottom:3px;
  }
  .form-list input{
    font-size: 16px;
    box-sizing: border-box;
    width:100%;
    padding-left:56px;
    height:50px;
    background: transparent;
    color:#fff;
    border:none;
  }
  .form-list input::-webkit-input-placeholder{
    color:#fff;
  }
  .input-icon{
    display: inline-block;
    width:50px;
    height:50px;
    position:absolute;
    top:0;
    left:0;
  }
  .input-icon-phone{
    background: url('../assets/img/phone.png') center center no-repeat;
    background-size: 30px 36px;
  }
  .input-icon-code{
    background: url('../assets/img/code.png') center center no-repeat;
    background-size: 30px 36px;
  }
  .code-btn{
    position:absolute;
    right:0;
    bottom:10px;
    padding:4px 10px;
    font-size:14px;
    color:#fff;
    background:rgba(255,255,255,0.3) ;
    border:1px solid #fff;
    border-radius: 4px;
    cursor: pointer;
  }
  .login-btn{
    width:80%;
    height:70px;
    margin:80px auto 0 auto;
    line-height: 70px;
    text-align: center;
    font-size: 20px;
    color:#02a1ff;
    background: #fff;
    border-radius: 50px;
    letter-spacing: 5px;
    cursor: pointer;
  }


  @media (max-width: 768px) {
    body,html{
      height:100%;
      min-height: 600px;
    }
    .con-box{
      width:70%;
      margin:0 auto;
      text-align: center;
    }
    .zzw-logo{
      width:145px;
      height:55px;
      margin-top:140px;
    }
    .login-form{
      margin-top: 50px;
    }
    .form-list{
      margin-top:30px;
    }
    .input-icon-phone{
      background-size: 15px 18px;
    }
    .input-icon-code{
      background-size: 15px 18px;
    }
    .input-icon{
      width:30px;
      height:30px;

    }
    .form-list input{
      padding-left:36px;
      height:30px;
      font-size:14px;
    }
    .code-btn{
      bottom:3px;
      padding:2px 8px;
    }
    .login-btn{
      height:35px;
      margin:50px auto 0 auto;
      line-height: 35px;
      font-size: 16px;
      color:#02a1ff;
      border-radius: 20px;
    }


  }
</style>
