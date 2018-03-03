'use strict';
const {Field, Table, Migrate} = require('xiaolan-db');

module.exports = new Table('fcc_member_score', {
  id: Field.name('id').bigint(true).primary().AI().comment('primary id'),
  userID: Field.name('user_id').bigint(true).uniq().comment('用户ID'),
  info: Field.name('info').int(true).default(0).index().comment('个人信息完善分'),
  worth: Field.name('worth').int(true).default(0).index().comment('信息价值分'),
  contribution: Field.name('contribution').int(true).default(0).index().comment('社区贡献度'),
  active: Field.name('active').int(true).default(0).index().comment('社区参与度'),
  snapshot: Field.name('snapshot').text().comment('快照'),
  createTime: Field.name('create_time').bigint(true).index(),
  updateTime: Field.name('update_time').bigint(true).index()
});