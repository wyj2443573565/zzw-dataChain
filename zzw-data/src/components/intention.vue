<template>
  <div class="main">
    <div class='page-title'>意向数据
      <span class="back" @click="backUpPage"></span>
    </div>
    <div class="firm-box">
      <firmData :originalData="firmChainData" v-on:collectStatus="setCollectStatus"></firmData>
    </div>
  </div>
</template>

<script>
  import firmData from './common/firmDataList'
    export default {
        name: "intention",
      components:{firmData},
      data(){
          return{
            firmChainData:[]
          }
      },
      mounted(){
        this.getCollectList();
      },
      methods:{
        backUpPage(){
          this.$router.go(-1)
        },
        getCollectList(){
          this.axios.get(this.apis.collectInfoList.path).then(response=>{
            this.firmChainData=response.data.coll_list;
            console.log(this.firmChainData);
          })
        },
        setCollectStatus(obj){
          this.axios.post(this.apis.ifCollect.path,{company_id:obj.id,action:obj.status}).then(response=> {
            this.getCollectList();
          })
        }
      }

    }
</script>

<style scoped>
  .main{
    background: #f8f8f8;
  }
  .page-title{
    height:60px;
    line-height: 60px;
    color:#333;
    font-size:20px;
    text-align: center;
    background:#fff;
    position:relative;
  }


  @media(max-width:768px){
    .firm-ul li{
      padding:15px 25px;
    }

  }
</style>
