<template>
  <div class="main">
    <div class='page-title'>客商数据
      <span class="back" @click="backUpPage"></span>
      <span class="functionBtn" @click="goToIntention">意向信息</span>
    </div>
    <div class="firm-box">
      <firmData v-if="firmChainData" v-on:collectStatus="setCollectStatus" :originalData="firmChainData"></firmData>
    </div>
  </div>
</template>

<script>
  import firmData from './common/firmDataList.vue'
    export default {
      name: "firmDataList",
      components:{firmData},
      data(){
          return{
            firmChainData:[],
            submitInfo:{
              indust_id:'',
              month:''
            }
          }
      },
      mounted(){
        let chainId=this.$route.query.chainId;
        let month=this.$route.query.month;
        if(chainId&&month){
          this.$set(this.submitInfo,'indust_id',chainId)
          this.$set(this.submitInfo,'month',month)
          this.getChainFirmList(this.submitInfo)
        }
      },
      methods:{
        backUpPage(){
          this.$router.go(-1)
        },
        goToIntention(){
          this.$router.push({path:'/intention'})
        },
        getChainFirmList(params){
          this.axios.get(this.apis.showChainFirm.path,{params:params}).then(response=>{
            this.firmChainData=response.data.cpn_list;
          })
        },
        setCollectStatus(obj){
          console.log(obj);
          this.axios.post(this.apis.ifCollect.path,{company_id:obj.id,action:obj.status}).then(response=> {
            this.getChainFirmList(this.submitInfo)
          })
        }
      }
    }
</script>

<style scoped>
  .main{
    background: #f8f8f8;
  }

  .page-title .back{
    display: inline-block;
    width:20px;
    height:40px;
    background: url("../assets/img/back.png") 0 0 no-repeat;
    background-size: 100%;
    position:absolute;
    top:50%;
    transform: translateY(-50%);
    left:15px;
    cursor: pointer;
  }
  .functionBtn{
     right:15px;
  }

  @media(max-width:768px){
    .firm-ul li{
      padding:15px 25px;
    }

  }
</style>
