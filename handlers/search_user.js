'use strict';

const MemberModel = require('../definitions/models/FccMember.gen');

const Query = {
  //IDs []number:0,100:1,999999 in:query
  id: [],
  //手机号 string:0,11 in:query
  mobile: '',
  //状态 number:0,1 in:query
  status: 1,
  //首次活动ID number:0 in:query
  firstEvent: 0,
};

module.exports = async (Query) => {
  let filter = {};
  for (let k in Query) {
    if (!Query[k] || Query[k].length === 0) {
      continue;
    }
    filter[k] = Query[k];
  }

  let rows = await MemberModel.fetchByAttr(filter);

  return rows;
};