let baseUrl='http://120.27.21.230:8123'
export const API_URLS={
  infoSubmit:{
    path:baseUrl+'/passport/register',
  },
  getCode:{
    path:baseUrl+'/passport/sms_code',
  },
  login:{
    path:baseUrl+'/passport/login'
  },
  showChain:{
    path:baseUrl+'/passport/my_show'
  },
  showChainFirm:{
    path:baseUrl+'/passport/cpn_data'
  },
  ifCollect:{
    path:baseUrl+'/passport/cpn_collect'
  },
  collectInfoList:{
    path:baseUrl+'/passport/my_collect'
  },
  getMonthList:{
    path:baseUrl+'/passport/sell_month'
  },
  getChainPic:{
    path:baseUrl+'/passport/get_pic'
  }

}
