<template>
  <div class="main">
    <div class="head-box">
      <span class="title">首页</span>
      <a v-if="!isLogin" href="javascript:;" target="_blank" class="sign-in" id="loginBtn" @click="loginIn">登陆</a>
      <img v-else class="loginImg" src="../assets/img/login.png" alt="">
    </div>
    <article>
      <div class="con-box">
        <div class="con-inner">
          <img class="zs-map" src="../assets/img/map.png" alt="">
          <img class="zs-map-desc" src="../assets/img/map-pic.png" alt="">
          <div class="infoList">
            <div class="info-title info-title-summary" ></div>
            <div class="info-con">
              <p class="info-con-detail">
                产业招商地图是根据区域战略规划和产业发展需求定制化绘制的潜在招商目标图系。
                产业招商地图对招商引资具有直接的指导作用，可以实现快速精准招商，提高招商资源配置效率，节约大量时间和经费。
                根据不同城市的产业链，利用智招网海量的数据库和先进的数据模型，帮助政府建设“产业招商地图”，快速匹配“产业链”上的相关企业，锁定目标客商，实现“产业链网”招商。
              </p>
            </div>
          </div>
          <div class="infoList">
            <div class="info-title info-title-advantage" ></div>
            <div class="info-con">
              <div class="info-con">
                <img src="../assets/img/advantage-detail.png" alt="">
              </div>
            </div>
          </div>
          <div class="infoList">
            <div class="info-title info-title-info" ></div>
            <div class="info-con">
              <div class="info-con">
                <el-form :model="ruleForm"   ref="ruleForm"  class="demo-ruleForm">
                  <ul class="submit-info">
                    <li>
                      <div class="info-input">
                        <span class="name">姓名</span>
                        <input type="text" v-model="ruleForm.name">
                      </div>
                    </li>
                    <li>
                      <div class="info-input">
                        <span class="name">性别</span>
<!--                        <input type="text" v-model="ruleForm.sex">-->
                        <div class="sexSelect">
                          <el-radio v-model="ruleForm.sex" label="MAN" >男</el-radio>
                          <el-radio v-model="ruleForm.sex" label="WOMEN" >女</el-radio>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="info-input info-input-special">
                        <span class="name name-special">单位名称</span>
                        <input type="text" v-model="ruleForm.work_unit">
                      </div>
                    </li>
                    <li>
                      <div class="info-input">
                        <span class="name">职务</span>
                        <input type="text" v-model="ruleForm.work_office">
                      </div>
                    </li>
                    <li>
                      <div class="info-input">
                        <span class="name">手机</span>
                        <input type="text" v-model="ruleForm.phone">
                      </div>
                    </li>
                    <li>
                      <div class="info-input info-input-special" >
                        <span class="name name-special">产业集群</span>
                        <div class="industrySelect">
                          <el-select  v-model="ruleForm.indust_list" placeholder="请选择要购买的产业链">
                            <el-option
                              v-for="item in industryChains"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </div>

                      </div>
                    </li>
                  </ul>
<!--                  <el-form-item>-->
<!--                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>-->
<!--                    <el-button @click="resetForm('ruleForm')">重置</el-button>-->
<!--                  </el-form-item>-->
                </el-form>

                <p class="submit-btn" @click="submitInfo">
                  确认提交
                </p>
              </div>
            </div>
          </div>
          <div class="contact-us">
            <ul>
              <li>
                赖先生<a href="tel:13910855752">13910855752</a>
              </li>
              <li>
                王先生<a href="tel:18601133711">18601133711</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </article>
    <div class="submit-tip" v-if="successTip">
      <div class="feedback-box">
        <span class="tip-close" @click="successTip=false"></span>
        <img src="../assets/img/feedback.png" class="feedback-icon"/>
        <p class="feedback-title">
          您的申请信息已提交成功
        </p>
        <p class="feedback-info">
          我们的工作人员将会在<span>1-3个工作日内</span>联系您，请保持电话畅通，谢谢!
        </p>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "index",
      data(){
          return{
            isLogin:false,
            ruleForm:{
              name:'',
              sex:'MAN',
              work_unit:'',
              work_office:'',
              phone:'',
              indust_list:'',
            },
            successTip:false,
            industryChains:[
              {value:1,label:'智能手机'},
              {value:2,label:'智能制造'},
              {value:3,label:'电子电路'},
              {value:4,label:'智能装备制造'},
              {value:5,label:'谷物加工'},
              {value:6,label:'农业生产'},
              {value:7,label:'新能源汽车'},
              ]
          }
      },
      created(){
        this.getLoginStatus();
      },
      methods:{
          getLoginStatus(){
            if(this.store.state.isLogin){
              this.isLogin=true;
            }
            console.log(this.isLogin)
          },
          loginIn(){
            this.$router.push({path: '/login'});
          },
        submitInfo(){
          let temp=[];
          if(!this.ruleForm.name){
            this.$message.warning('请填写姓名');
            return;
          }else if(!(this.ruleForm.name.length>=2&&this.ruleForm.name.length<=8)){
            this.$message.warning('姓名填写在2到8个字符之间');
            return;
          }
          if(!this.ruleForm.work_unit){
            this.$message.warning('请填写单位名称');
            return;
          }else if(!(this.ruleForm.work_unit.length>=2&&this.ruleForm.work_unit.length<=50)){
            this.$message.warning('单位名称填写在2到50个字符之间');
            return;
          }
          if(!this.ruleForm.work_office){
            this.$message.warning('请填写职务');
            return;
          }else if(!(this.ruleForm.work_office.length>=2&&this.ruleForm.work_office.length<=50)){
            this.$message.warning('职务填写在2到50个字符之间');
            return;
          }
          if(!this.ruleForm.phone){
            this.$message.warning('请填写手机号码');
            return;
          }else if(!((/1[3|5|7|8|]\d{9}/g).test(this.ruleForm.phone))){
            this.$message.warning('请填写正确的手机号码');
            return;
          }
          if(!this.ruleForm.indust_list){
            this.$message.warning('请选择要购买的产业链');
            return;
          }
          let subData=JSON.parse(JSON.stringify(this.ruleForm));
          temp.push(subData.indust_list);
          subData.indust_list=temp;
          this.axios.post(this.apis.infoSubmit.path,subData).then(
              ()=>{
                this.successTip=true;
                this.resetForm();
            },(err)=>{

            }).catch(err=>this.$message.error(err))
        },
        resetForm(){
            this.ruleForm={
              ruleForm:{
                name:'',
                sex:'MAN',
                work_unit:'',
                work_office:'',
                phone:'',
                indust_list:'',
              },
            }
        }
      }
    }
</script>
<style>
  .sexSelect{
    padding-top:12px;
  }
  .sexSelect .el-radio__label{
    font-size: 20px;
  }
  .sexSelect .el-radio__inner{
    width:20px;
    height:20px;
  }
  .industrySelect{
    padding-left: 58px;
  }
  .industrySelect .el-input__inner{
    margin-top: 5px;
    border: none;
  }
  .submit-info .info-input input{
    font-size: 14px;
  }
</style>
<style scoped>

  .head-box{
    background: #f8f8f8;
  }
  .head-box{
    overflow: hidden;
    color:#333;
    height:40px;
    font-size:20px;
    padding:10px 15px;
    position:relative;
  }
  .head-box .title{
    display: inline-block;
    width:100%;
    line-height: 40px;
    text-align: center;
    font-weight: 600;
  }
  .sign-in{
    position:absolute;
    right:15px;
    top:10px;
    display: block;
    padding:6px 18px;
    font-size:16px;
    background: rgba(61,98,241,1);
    border-radius: 5px;
    color:#fff;
    cursor: pointer;
  }
  .loginImg{
    position:absolute;
    width:40px;
    height:40px;
    right:15px;
    top:10px;
    display: block;
    background: rgba(61,98,241,1);
    border-radius: 50%;
    cursor: pointer;
  }
  .con-box{
    width:100%;
    /*padding-bottom: 500%;*/
    background: url('../assets/img/bg.png') 0 0 no-repeat;
    background-size: 100% 100%;
    text-align: center;
    position:relative;
  }
  .con-inner{
    overflow: hidden;
  }
  .zs-map{
    width:80%;
    display: inline-block;
    margin: 60px auto 0 auto;
  }
  .zs-map-desc{
    width:70%;
    display: inline-block;
    margin: 22px auto 0 auto;
  }
  .info-title{
    width:240px;
    height:66px;
    margin:50px auto 0 auto;
  }
  .info-con{
    margin-top:40px;
    width:100%;
  }
  .info-title-summary{
    background: url('../assets/img/summary.png') 0 0 no-repeat;
    background-size: 100%;
  }
  .info-con-detail{
    width:80%;
    display: inline-block;
    margin:0 auto;
    font-size:18px;
    color:#fff;
    text-indent: 2em;
    text-align: justify;
  }
  .info-title-advantage{
    background: url('../assets/img/advantage.png') 0 0 no-repeat;
    background-size: 100%;
  }
  .info-con img{
    width:80%;
    margin:0 auto;
  }
  .info-title-info{
    background: url('../assets/img/infoSubmit.png') 0 0 no-repeat;
    background-size: 100%;
  }
  .submit-info{
    width:80%;
    margin:0 auto;
    overflow: hidden;
  }
  .submit-info li{
    width:100%;
    float:left;
    margin-bottom:13px;
  }
  .info-input{
    width:100%;
    height:50px;
    border-radius: 50px;
    background: #fff;
    position:relative;
  }
  .info-input input{
    box-sizing: border-box;
    width:100%;
    height:100%;
    border: none;
    border-radius: 50px;
    padding-left:60px;
  }
  .info-input .name{
    position:absolute;
    width:50px;
    height:50px;
    line-height: 50px;
    left:8px;
    font-size:16px;
    color:rgba(181,182,182,1)
  }
  .info-input-special .name-special{
    width:80px;
  }
  .info-input-special input{
    padding-left: 87px;
  }
  .submit-btn{
    width:80%;
    margin:15px auto 0 auto;
    border-radius: 5px;
    background:rgba(18,138,251,1) ;
    padding:10px;
    text-align: center;
    color:#fff;
    font-size:18px;
    box-sizing: border-box;
    cursor: pointer;
  }
  .contact-us{
    width:80%;
    padding-bottom: 32.6%;
    background: url('../assets/img/contactUs.png') 0 0 no-repeat;
    background-size: 100% 100%;
    margin:50px auto 50px auto;
    position:relative;
  }
  .contact-us ul{
    width:100%;
    height:30%;
    position:absolute;
    left:0;
    top:0;
    bottom:0;
    right:0;
    margin:auto;
    padding-top:36px;
  }
  .contact-us ul li{
    width:100%;
    float:left;
    color:#fff;
    font-size:18px;
  }
  .contact-us ul li:last-child{
    margin-top: 10px;
  }
  .contact-us ul li a{
    color:#fff;
    margin-left:15px;
  }
  .submit-tip{
    width:100%;
    height:100%;
    background-color:rgba(0,0,0,0.3);
    position:absolute;
    box-sizing: border-box;
    top:0;
    left:0;
  }
  .feedback-box{
    position:fixed;
    min-height: 200px;
    width:500px;
    background: #fff;
    border-radius: 10px;
    box-sizing: border-box;
    padding:50px 30px 30px 56px;
    font-size: 16px;
    text-align: center;
    top:224px;
    left:50%;
    transform: translateX(-50%);
    margin:0 auto;
  }
  .feedback-icon{
    width:160px;
    height:160px;
  }
  .feedback-title{
    margin-top:22px;
    margin-bottom:46px;
    font-size: 28px;
    color:rgb(77,79,80);

  }
  .feedback-info span{
    color:rgb(130,180,232);
  }
  .feedback-info{
    font-size: 22px;
    color:rgb(182,182,182);
  }
  .tip-close{
    position:absolute;
    width:38px;
    height:38px;
    top:12px;
    right:16px;
    background:url('../assets/img/tip-close.png') center center no-repeat;
    background-size:100% 100%;
    cursor: pointer;
  }
  @media (max-width: 768px){
    body .main{
      width:100%;
    }
    .contact-us ul li{
      font-size:16px;
    }
    .contact-us ul{
      padding-top:0;
    }
    .info-title{
      width:120px;
      height:33px;
      margin:50px auto 0 auto;
    }
    .info-con-detail{
      font-size:16px;
    }
    .feedback-box{
      width:70%;
      border-radius: 10px;
      padding:25px 15px 15px 23px;
      font-size: 14px;
      text-align: center;
      top:112px;
      left:50%;
      transform: translateX(-50%);
      margin:0 auto;
    }
    .feedback-icon{
      width:80px;
      height:80px;
    }
    .feedback-title{
      margin-top:11px;
      margin-bottom:23px;
      font-size: 14px;
    }
    .tip-close{
      position:absolute;
      width:20px;
      height:20px;
      top:6px;
      right:8px;
    }
    .feedback-info{
      font-size: 16px;
    }
  }
</style>
