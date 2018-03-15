'use strict';

const MemberModel = require('../definitions/models/FccMember.gen');

const Query = {
  //IDs []number:0,100 in:query
  id: [],
  //手机号 string:0,11 in:query
  mobile: '',
  //状态 number:0,1 in:query
  status: 1,
};

module.exports = async (Query) => {
  let filter = {};
  for(let k in Query){
    if(!Query[k]){
      continue;
    }
    filter[k] = Query[k];
  }
  let rows = await MemberModel.fetchByAttr(filter);
  
  return rows;
};