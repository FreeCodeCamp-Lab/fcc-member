'use strict';

const memberModel = require('../definitions/models/FccMember.gen');

const User = {
  //名字 string:0,32 in:body
  name: '',
  //手机 string:0,32 in:body require
  mobile: '',
  //邮箱 string:0,64 in:body
  email: '',
  //性别 enum:帅哥,美女 in:body
  gender: '1',
  //github string:0,255 in:body
  github: '',
  //活动ID number:1 in:body
  firstEvent: 0,
};

module.exports = async (User) => {
  let model = await memberModel.fetchByMobile(User.mobile);
  if (model === null) {
    // new user
    let newUser = memberModel.create(User);
    let saved = await newUser.save(true);
    if (saved === true) {
      return newUser;
    } else {
      return saved;
    }
  } else {
    // update
    User.firstEvent = 0;
    for (let k in User) {
      if (!!User[k]) {
        model[k] = User[k];
      }
    }
    model.updateTime = Number.parseInt(Date.now()/1000);
    let saved = await model.update(true);
    if (saved === true) {
      return model;
    } else {
      return saved;
    }
  }
};