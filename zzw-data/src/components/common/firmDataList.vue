<template>
  <div>
    <ul class="firm-ul">
      <li v-if="originalData" v-for="(item,index) in originalData" :key="item.id">
        <div class="firm-con">
          <p class="firm-name">{{item.cpn_name}}</p>
          <p class="product-name">公司产品: <span>{{item.main_product}}</span></p>
          <p class="product-address">公司地址: <span>{{item.address}}</span></p>
          <p  class="product-phone">联系方式: <span>{{item.phone}}</span></p>
        </div>
        <span v-if="item.is_collect==='cancel_collect'" class="collectBtn" @click="emitStatus(item.is_collect,item.id)"></span>
        <span v-if="item.is_collect==='collect'" class="hasCollectedBtn" @click="emitStatus(item.is_collect,item.id)"></span>
      </li>
    </ul>
  </div>

</template>

<script>
    export default {
        name: "dataList",
      props:['originalData'],
      data(){
          return{
            submitInfo:{
              company_id:'',
              action:''
            },
            action:'cancel_collect'
          }
      },
      mounted(){
          // console.log(this.originalData)
      },
      methods:{
        emitStatus(status,id){
          if(status==='collect'){
            status='cancel_collect'
          }else{
            status='collect'
          }
            this.$emit('collectStatus',{'status':status,'id':id})
          },

      }
    }
</script>

<style scoped>
  .firm-ul{
    box-sizing: border-box;
    width:100%;
    overflow: hidden;
    background-color: #f8f8f8;
  }
  .firm-ul li{
    box-sizing: border-box;
    width:100%;
    float:left;
    padding:30px 50px;
    background: #fff;
    margin-top:18px;
    position:relative;
  }
  .firm-con{
    padding-right:20%;
  }
  .firm-con span{
    margin-left:10px;
  }
  .firm-name{
    font-size:24px;
    text-align: left;
  }
  .product-name,.product-address,.product-phone{
    text-align: left;
    font-size:16px;
    color:#333;
  }
  .product-name span,.product-address span,.product-phone span{
    color:rgb(146,146,146);
  }
  .product-name{
    margin-top:25px;
  }
  .product-address,.product-phone{
    margin-top:10px;
  }
  .collectBtn,.hasCollectedBtn{
    position:absolute;
    top:50%;
    right:64px;
    transform: translateY(-50%);
    display: block;
    width:38px;
    height:38px;

  }
  .collectBtn{
    background:url('../../assets/img/star.png') center center no-repeat ;
    background-size: 100%;
  }

  .hasCollectedBtn{
    background:url('../../assets/img/colStar.png') center center no-repeat ;
    background-size: 100%;
  }

  @media(max-width:768px){
    .firm-ul li{
      padding:15px 25px;
    }
    .product-name{
      margin-top:12px;
    }
    .product-address,.product-phone{
      margin-top:5px;
    }
    .firm-name{
      font-size:18px;
    }
    .collectBtn,.hasCollectedBtn{
      right:32px;
    }

  }
</style>
