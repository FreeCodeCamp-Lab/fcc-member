"use strict";
const Connection = require('xiaolan-db').Connection('default').conn;
const TableName = "fcc_member_score";

class FccMemberScore {

  constructor(data={}){
    this.id = (data.id||data.id)||0;
    this.userID = (data.userID||data.user_id)||0;
    this.info = (data.info||data.info)||0;
    this.worth = (data.worth||data.worth)||0;
    this.contribution = (data.contribution||data.contribution)||0;
    this.active = (data.active||data.active)||0;
    this.snapshot = (data.snapshot||data.snapshot)||'';
    this.createTime = (data.createTime||data.create_time)||0;
    this.updateTime = (data.updateTime||data.update_time)||0;
  }

  static fetchById(v){
    let sql = 'select * from `fcc_member_score` where `id`=:v limit 1';
    //@row
    return new Promise((resolved, rejected) => {
      Connection.query({sql:sql, params:{v:v}}, (e ,r)=>{
        if(e){
          rejected(e);
        }else{
          if(r[0]){
            resolved(new FccMemberScore(r[0]));
          }else{
            resolved(null);
          }
        }
      });
    });
  }

  static fetchByInfo(info, page=1, pageSize=10){
    let sql = 'select * from `fcc_member_score` where `info`=:info order by `id` desc limit '+((page-1)*pageSize)+','+pageSize+'';
    //@list
    return new Promise((resolved, rejected) => {
      Connection.query({sql:sql, params:{info: info}}, (e ,r)=>{
        if(e){
          rejected(e);
        }else{
          let result = [];
          for(let k in r) {
            result.push(new FccMemberScore(r[k]));
          }
          resolved(result);
        }
      });
    });
  }

  static fetchByWorth(worth, page=1, pageSize=10){
    let sql = 'select * from `fcc_member_score` where `worth`=:worth order by `id` desc limit '+((page-1)*pageSize)+','+pageSize+'';
    //@list
    return new Promise((resolved, rejected) => {
      Connection.query({sql:sql, params:{worth: worth}}, (e ,r)=>{
        if(e){
          rejected(e);
        }else{
          let result = [];
          for(let k in r) {
            result.push(new FccMemberScore(r[k]));
          }
          resolved(result);
        }
      });
    });
  }

  static fetchByContribution(contribution, page=1, pageSize=10){
    let sql = 'select * from `fcc_member_score` where `contribution`=:contribution order by `id` desc limit '+((page-1)*pageSize)+','+pageSize+'';
    //@list
    return new Promise((resolved, rejected) => {
      Connection.query({sql:sql, params:{contribution: contribution}}, (e ,r)=>{
        if(e){
          rejected(e);
        }else{
          let result = [];
          for(let k in r) {
            result.push(new FccMemberScore(r[k]));
          }
          resolved(result);
        }
      });
    });
  }

  static fetchByActive(active, page=1, pageSize=10){
    let sql = 'select * from `fcc_member_score` where `active`=:active order by `id` desc limit '+((page-1)*pageSize)+','+pageSize+'';
    //@list
    return new Promise((resolved, rejected) => {
      Connection.query({sql:sql, params:{active: active}}, (e ,r)=>{
        if(e){
          rejected(e);
        }else{
          let result = [];
          for(let k in r) {
            result.push(new FccMemberScore(r[k]));
          }
          resolved(result);
        }
      });
    });
  }

  static fetchByCreateTime(createTime, page=1, pageSize=10){
    let sql = 'select * from `fcc_member_score` where `create_time`=:createTime order by `id` desc limit '+((page-1)*pageSize)+','+pageSize+'';
    //@list
    return new Promise((resolved, rejected) => {
      Connection.query({sql:sql, params:{createTime: createTime}}, (e ,r)=>{
        if(e){
          rejected(e);
        }else{
          let result = [];
          for(let k in r) {
            result.push(new FccMemberScore(r[k]));
          }
          resolved(result);
        }
      });
    });
  }

  static fetchByUpdateTime(updateTime, page=1, pageSize=10){
    let sql = 'select * from `fcc_member_score` where `update_time`=:updateTime order by `id` desc limit '+((page-1)*pageSize)+','+pageSize+'';
    //@list
    return new Promise((resolved, rejected) => {
      Connection.query({sql:sql, params:{updateTime: updateTime}}, (e ,r)=>{
        if(e){
          rejected(e);
        }else{
          let result = [];
          for(let k in r) {
            result.push(new FccMemberScore(r[k]));
          }
          resolved(result);
        }
      });
    });
  }

  static fetchByUserID(userID, page=1, pageSize=10){
    let sql = 'select * from `fcc_member_score` where `user_id`=:userID order by `id` desc limit '+((page-1)*pageSize)+','+pageSize+'';
    //@row
    return new Promise((resolved, rejected) => {
      Connection.query({sql:sql, params:{userID: userID}}, (e ,r)=>{
        if(e){
          rejected(e);
        }else{
          if(r[0]){
            resolved(new FccMemberScore(r[0]));
          }else{
            resolved(null);
          }
        }
      });
    });
  }

  static fetchByAttr(data={}, page=1, pageSize=10){
    let allowKey = ['id','info','worth','contribution','active','create_time','update_time','user_id'];
    let sql = 'select * from `fcc_member_score` where 1 ';
    if(Object.keys(data).length===0){
      throw new Error('data param required');
    }
    for(let k in data){
      let field = '';
      if(allowKey.includes(k)){
        field = k;
      }else if(allowKey.includes(KeyMap[k])){
        field = KeyMap[k];
      }else{
        throw new Error('Not Allow Fetching By [ "'+k+'" ]');
      }
      if (Array.isArray(data[k]) && data[k].length) {
        sql += ' and `'+field+'` in ("'+data[k].join('","')+'")';
      } else {
        sql += ' and `'+field+'`=:'+k+'';
      }
      
    }
    sql += ' order by `id` desc limit '+((page-1)*pageSize)+','+pageSize;
    //@list
    return new Promise((resolved, rejected)=>{
      Connection.query({sql:sql,params:data}, (e, r)=>{
        if(e){
          rejected(e);
        }else{
          let result = [];
          for(let k in r) {
            result.push(new FccMemberScore(r[k]));
          }
          resolved(result);
        }
      });
    });
  }

  static raw(sql='',params={}, obj=true){
    if(!sql.includes('limit')){
      throw new Error('raw sql must with paging');
    }
    //@list
    return new Promise((resolved, rejected)=>{
      Connection.query({sql:sql,params:params}, (e, r)=>{
        if(e){
          rejected(e);
        }else{
          if (obj) {
            let result = [];
            for(let k in r) {
              result.push(new FccMemberScore(r[k]));
            }
            resolved(result);
          }else{
            resolved(r);
          }
        }
      });
    });
  }
    
  static table(){
    return TableName;
  }
  
  static count(expression,where){
    let sql = 'select count('+expression+') from `fcc_member_score` ';
    let conditions = [];
    let params = {};
    for(let k in where){
      conditions.push(' `'+k+'`=:'+k);
      params[k] = where[k];
    }
    if(conditions.length){
      sql += 'where '+conditions.join(' and ');
    }
    //@number
    return new Promise((resolved,rejected)=>{
      Connection.query({sql:sql,params:params}, (e,r)=>{
        if(e){
          rejected(e);
        }else{
          if(r[0]){
            resolved(r[0]['count('+expression+')']);
          }else{
            resolved(null);
          }
        }
      });
    });
  }
  
  data(){
    let obj = {};
    for(let k in FieldMap){
      obj[FieldMap[k]] = this[FieldMap[k]];
    }
    return obj;
  }

  row(){
    let row = {};
    for(let k in FieldMap){
      row[k] = this[FieldMap[k]];
    }
    return row;
  }

  validate(){
    if(this.userID !== null && !(typeof this.userID==='number' && this.userID>=0 && this.userID<=18014398509481982)){
      throw new Error('attribute userID(user_id) must be a number in [0,18014398509481982]');
    }
    if(this.info !== null && !(typeof this.info==='number' && this.info>=0 && this.info<=4294967295)){
      throw new Error('attribute info(info) must be a number in [0,4294967295]');
    }
    if(this.worth !== null && !(typeof this.worth==='number' && this.worth>=0 && this.worth<=4294967295)){
      throw new Error('attribute worth(worth) must be a number in [0,4294967295]');
    }
    if(this.contribution !== null && !(typeof this.contribution==='number' && this.contribution>=0 && this.contribution<=4294967295)){
      throw new Error('attribute contribution(contribution) must be a number in [0,4294967295]');
    }
    if(this.active !== null && !(typeof this.active==='number' && this.active>=0 && this.active<=4294967295)){
      throw new Error('attribute active(active) must be a number in [0,4294967295]');
    }
    if(this.createTime !== null && !(typeof this.createTime==='number' && this.createTime>=0 && this.createTime<=18014398509481982)){
      throw new Error('attribute createTime(create_time) must be a number in [0,18014398509481982]');
    }
    if(this.updateTime !== null && !(typeof this.updateTime==='number' && this.updateTime>=0 && this.updateTime<=18014398509481982)){
      throw new Error('attribute updateTime(update_time) must be a number in [0,18014398509481982]');
    }
  }

  save(force=false){
    if(force){
      try{
        this.validate();
      }catch(e){
        return Promise.resolve(Object.assign(error.BAD_REQUEST, {message: error.BAD_REQUEST.message+':'+e.message}));
      }
    }
    //@true
    return new Promise((resolved, rejected) => {
      let data = this.data();
      data.createTime = data.createTime||Number.parseInt(Date.now()/1000);
      data.updateTime = data.updateTime||Number.parseInt(Date.now()/1000);
      let sql = `insert into \`${TableName}\` set `;
      let fields = [];
      for(let k in data){
        if(k==='id' || data[k]===null){
          continue;
        }
        fields.push(`\`${KeyMap[k]}\`=:${k}`);
      }
      sql += fields.join(',');
      Connection.query({sql: sql,params:data},(e, r) => {
        if(e) {
          rejected(e);
        }else{
          this.id = r.insertId;
          this.createTime = data.createTime;
          this.updateTime = data.updateTime;
          resolved(true);
        }
      });
    });
  }

  update(force=false){
    if(force){
      this.validate();
    }
    //@true
    return new Promise((resolved, rejected) => {
      let sql = `update \`${TableName}\` set `;
      let data = this.data();
      data.updateTime = data.updateTime||Number.parseInt(Date.now()/1000);
      let fields = [];
      for(let k in data){
        if(k==='id' || data[k]===null){
          continue;
        }
        fields.push(`\`${KeyMap[k]}\`=:${k}`);
      }
      sql += fields.join(',');
      sql += ` where \`id\`=:id`;
      Connection.query({sql: sql,params:data},(e, r) => {
        if(e) {
          rejected(e);
        }else{
          resolved(true);
        }
      });
    });
  }

  static create(data){
    //@this
    return new FccMemberScore(data);
  }

}

const FieldMap = {
  id: 'id',
  user_id: 'userID',
  info: 'info',
  worth: 'worth',
  contribution: 'contribution',
  active: 'active',
  snapshot: 'snapshot',
  create_time: 'createTime',
  update_time: 'updateTime',
};

const KeyMap = {
  id: 'id',
  userID: 'user_id',
  info: 'info',
  worth: 'worth',
  contribution: 'contribution',
  active: 'active',
  snapshot: 'snapshot',
  createTime: 'create_time',
  updateTime: 'update_time',
};


module.exports = FccMemberScore;
