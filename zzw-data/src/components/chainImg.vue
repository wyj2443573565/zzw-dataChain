<template>
  <div class="main">
    <div class='page-title'>{{subInfo.chainName}}
      <span class="back" @click="backUpPage"></span>
    </div>
    <div class="chain-box">
      <div class="chain-img-box">
        <img :src="pic_url" alt="">
      </div>
      <div class="chain-month-box">
        <ul class="chain-ul">
          <li  v-for="(item,index) in chainMonthList" :key="index">
            <button v-if="item.hasOwn" class="chainInfoItem" @click="getFirmData(item.item)">客商数据{{item.item}}月</button>
            <button v-else class="chainInfoItem" disabled style="background-color: #f8f8f8; color:#333;">{{item.item}}月未购买</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "chainImg.vue",
      data(){
          return{
            subInfo:{
              chainName:'',
              chainId:'',
            },
            pic_url:'',
            chainMonthList:[],
            originArr:[1,2,3,4,5,6,7,8,9,10,11,12],
            indust_id:''
          }
      },
      mounted(){
        let chainName=this.$route.query.chain;
        let chainId=this.$route.query.id;
        if(chainName){
          this.$set(this.subInfo,'chainName',chainName);
        }
        if(chainId){
          this.$set(this.subInfo,'chainId',chainId);
          this.getChainImg();
          this.getMonthList();
        }
      },
      methods:{
        backUpPage(){
          this.$router.go(-1)
        },
        getChainImg(){
          this.axios.get(this.apis.getChainPic.path,{params:{indust_id:this.subInfo.chainId}}).then(response=>{
            this.pic_url=response.data.pic_url
          })
        },
        getMonthList(){
          this.axios.get(this.apis.getMonthList.path,{params:{
              indust_id: this.subInfo.chainId
          }}).then(response=>{
            let chainMonth=response.data.order_month;
            let result=this.originArr.map((item,index)=>{
              let temp={};
              temp.item=item;
              temp.hasOwn=false;
              chainMonth.map((_item,_index)=>{
                if(item===_item){
                  temp.hasOwn=true;
                }
              })
              return temp;
            })
            this.chainMonthList=result;
          })
        },
        getFirmData(monthId){
          this.$router.push({path:'/firmData?chainId='+this.subInfo.chainId+'&month='+monthId})
        }
      }
    }
</script>

<style scoped>
  .chain-ul{
    overflow-x: scroll;
    overflow-y: hidden;
  }
  .chain-ul li{

    display: inline-block;
  }
  .chainInfoItem{
    display: inline-block;
    padding:8px 20px;
    background-color:#3a84ff ;
    border: 1px solid #3a84ff;
    border-radius:50px;
    color:#fff;
    font-size: 16px;
    margin-top:10px;
    margin-left:20px;
  }
  .main{
    display: flex;
    flex-direction:column;
  }
  .chain-box{
    flex:1;
    display: flex;
    flex-direction:column;
  }
  .chain-month-box{
    width:100%;
    border-top:1px solid #f8f8f8;
    height:60px;
    white-space: nowrap;
    background: #f8f8f8;
    overflow: auto;
  }
  .chain-img-box{
    flex:1;
    width:100%;
    overflow:auto;
  }
  .chain-img-box img{
    max-width:600px;
  }
</style>
