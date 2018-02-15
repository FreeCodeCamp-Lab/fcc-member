/**
 * Created by lanhao on 2017/9/21.
 */

'use strict';
const {Field, Table, Migrate} = require('xiaolan-db');

module.exports = new Table('fcc_member', {
  id:Field.name('id').bigint(true).primary().AI().comment('primary id'),
  name: Field.name('name').varchar(64).default('小伙伴').index().comment('真实姓名'),
  mobile: Field.name('mobile').varchar(32).uniq().comment('手机号'),
  gender: Field.name('gender').tinyint(true).default(0).comment('性别').index(),
  email: Field.name('email').varchar(64).allowNull().comment('邮箱地址'),
  status: Field.name('status').tinyint(true).default(1).index().comment('0.禁用 1.正常 '),
  createTime: Field.name('create_time').bigint(true).index(),
  updateTime: Field.name('update_time').bigint(true).index()
});
