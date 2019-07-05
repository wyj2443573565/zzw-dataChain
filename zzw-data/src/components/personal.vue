<template>
  <div class="main">
    <div class='page-title'>我的
      <span class="functionBtn" @click="backUpPage">首页</span>
    </div>
<!--    <div class='page-title'>我的</div>-->
    <div class="dataCenter-box">
      <ul class="chain-ul">
        <li v-for="(item,index) in chainList" :key="item.id">
          <div class="chain-box">
            <p class="chain-name">{{item.indust_name}}</p>
            <div v-if="item.is_sell" class="check-btn" @click="checkChain(item.indust_name,item.id)">点击查看</div>
            <button v-else class="check-btn" disabled style="background-color: #f8f8f8; color:#333; border:1px solid #ddd;">未开通</button>
          </div>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: "personal",
      data(){
          return{
            chainList:[]
          }
      },
      created(){
        this.getChain();
      },
      methods:{
        checkChain(name,id){
          this.$router.push({path:'/chainImg?chain='+name+'&id='+id})
        },
        backUpPage(){
          this.$router.push({path:'/'})
        },
        getChain(){
          this.axios.get(this.apis.showChain.path).then(response=>{
            let indust_list=response.data.indust_list;
            let order_list=response.data.order_list;
            let result=indust_list.map((item,index)=>{
              item.is_sell=false;
              order_list.map((_item,_index)=>{
                if(item.id===_item.indust_id){
                  item.is_sell=true;
                }
              })
              return item;
            })
            this.chainList=result;

          })
        }
      }
    }
</script>

<style scoped>
  body,html{
    min-height: 100%;
    background:#f6f7fb ;
  }
  .main{
    background: #f6f7fb;
  }
  .page-title{
    height:60px;
    line-height: 60px;
    color:#333;
    font-size:20px;
    text-align: center;
    background:#f8f8f8 ;
  }
  .page-title .functionBtn{
    left:15px;
  }
  .dataCenter-box{
    width:100%;
    padding:70px 40px;
    box-sizing: border-box;
    position:relative;
    background-color:rgb(246,247,251) ;
  }
  .chain-ul{
    width:100%;

  }
  .chain-ul::after{
    content: '';
    clear:both;
    display: block;
  }
  .chain-ul li{
    width:200px;
    float:left;
    margin-right:34px;
    margin-bottom:38px;
  }
  .chain-ul li:nth-child(3n+3){
    margin-right:0;
  }
  .chain-box{
    text-align: center;
    box-sizing: border-box;
    width:100%;
    background: #fff;
    box-shadow: -2px -2px  10px  rgba(0,0,0,0.1),2px 2px  10px  rgba(0,0,0,0.1),-2px 2px  10px  rgba(0,0,0,0.1),2px -2px  10px  rgba(0,0,0,0.1);
    padding:72px 10px 50px 10px;
    border-radius: 10px;
  }
  .chain-name{
    padding:0 15px;
    font-size: 23px;
    margin-bottom:40px;
    color:rgb(150,190,250);
  }
  .check-btn{
    display: inline-block;
    background: rgb(12,132,255);
    padding:8px 30px;
    font-size:16px;
    color:#fff;
    border-radius:20px;
    cursor: pointer;
  }
  @media(max-width:768px){
    .dataCenter-box{
      padding:35px 20px;
    }
    .chain-box{
      padding:36px 5px 25px 5px;
    }
    .chain-name{
      font-size:18px;
      margin-bottom: 20px;
    }
    .check-btn{
      font-size: 14px;
      padding:4px 15px;
    }
    .chain-ul li{
      width:46%;
      margin-right:8%;
    }
    .chain-ul li:nth-child(3n+3){
      margin-right:8%;
    }
    .chain-ul li:nth-child(2n+2){
      margin-right:0;
    }
  }
</style>
