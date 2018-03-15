"use strict";
const Connection = require('xiaolan-db').Connection('default').conn;
const TableName = "fcc_member";

class FccMember {

  constructor(data={}){
    this.id = (data.id||data.id)||0;
    this.name = (data.name||data.name)||'小伙伴';
    this.mobile = (data.mobile||data.mobile)||'';
    this.gender = (data.gender||data.gender)||0;
    this.email = (data.email||data.email)||'';
    this.github = (data.github||data.github)||'';
    this.status = (data.status||data.status)||1;
    this.createTime = (data.createTime||data.create_time)||0;
    this.updateTime = (data.updateTime||data.update_time)||0;
  }

  static fetchById(v){
    let sql = 'select * from `fcc_member` where `id`=:v limit 1';
    //@row
    return new Promise((resolved, rejected) => {
      Connection.query({sql:sql, params:{v:v}}, (e ,r)=>{
        if(e){
          rejected(e);
        }else{
          if(r[0]){
            resolved(new FccMember(r[0]));
          }else{
            resolved(null);
          }
        }
      });
    });
  }

  static fetchByName(name, page=1, pageSize=10){
    let sql = 'select * from `fcc_member` where `name`=:name order by `id` desc limit '+((page-1)*pageSize)+','+pageSize+'';
    //@list
    return new Promise((resolved, rejected) => {
      Connection.query({sql:sql, params:{name: name}}, (e ,r)=>{
        if(e){
          rejected(e);
        }else{
          let result = [];
          for(let k in r) {
            result.push(new FccMember(r[k]));
          }
          resolved(result);
        }
      });
    });
  }

  static fetchByGender(gender, page=1, pageSize=10){
    let sql = 'select * from `fcc_member` where `gender`=:gender order by `id` desc limit '+((page-1)*pageSize)+','+pageSize+'';
    //@list
    return new Promise((resolved, rejected) => {
      Connection.query({sql:sql, params:{gender: gender}}, (e ,r)=>{
        if(e){
          rejected(e);
        }else{
          let result = [];
          for(let k in r) {
            result.push(new FccMember(r[k]));
          }
          resolved(result);
        }
      });
    });
  }

  static fetchByStatus(status, page=1, pageSize=10){
    let sql = 'select * from `fcc_member` where `status`=:status order by `id` desc limit '+((page-1)*pageSize)+','+pageSize+'';
    //@list
    return new Promise((resolved, rejected) => {
      Connection.query({sql:sql, params:{status: status}}, (e ,r)=>{
        if(e){
          rejected(e);
        }else{
          let result = [];
          for(let k in r) {
            result.push(new FccMember(r[k]));
          }
          resolved(result);
        }
      });
    });
  }

  static fetchByCreateTime(createTime, page=1, pageSize=10){
    let sql = 'select * from `fcc_member` where `create_time`=:createTime order by `id` desc limit '+((page-1)*pageSize)+','+pageSize+'';
    //@list
    return new Promise((resolved, rejected) => {
      Connection.query({sql:sql, params:{createTime: createTime}}, (e ,r)=>{
        if(e){
          rejected(e);
        }else{
          let result = [];
          for(let k in r) {
            result.push(new FccMember(r[k]));
          }
          resolved(result);
        }
      });
    });
  }

  static fetchByUpdateTime(updateTime, page=1, pageSize=10){
    let sql = 'select * from `fcc_member` where `update_time`=:updateTime order by `id` desc limit '+((page-1)*pageSize)+','+pageSize+'';
    //@list
    return new Promise((resolved, rejected) => {
      Connection.query({sql:sql, params:{updateTime: updateTime}}, (e ,r)=>{
        if(e){
          rejected(e);
        }else{
          let result = [];
          for(let k in r) {
            result.push(new FccMember(r[k]));
          }
          resolved(result);
        }
      });
    });
  }

  static fetchByMobile(mobile, page=1, pageSize=10){
    let sql = 'select * from `fcc_member` where `mobile`=:mobile order by `id` desc limit '+((page-1)*pageSize)+','+pageSize+'';
    //@row
    return new Promise((resolved, rejected) => {
      Connection.query({sql:sql, params:{mobile: mobile}}, (e ,r)=>{
        if(e){
          rejected(e);
        }else{
          if(r[0]){
            resolved(new FccMember(r[0]));
          }else{
            resolved(null);
          }
        }
      });
    });
  }

  static fetchByAttr(data={}, page=1, pageSize=10){
    let allowKey = ['id','name','gender','status','create_time','update_time','mobile'];
    let sql = 'select * from `fcc_member` where 1 ';
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
      sql += ' and `'+field+'`=:'+k+'';
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
            result.push(new FccMember(r[k]));
          }
          resolved(result);
        }
      });
    });
  }

  static raw(sql='',params={}){
    if(!sql.includes('limit')){
      throw new Error('raw sql must with paging');
    }
    //@list
    return new Promise((resolved, rejected)=>{
      Connection.query({sql:sql,params:params}, (e, r)=>{
        if(e){
          rejected(e);
        }else{
          let result = [];
          for(let k in r) {
            result.push(new FccMember(r[k]));
          }
          resolved(result);
        }
      });
    });
  }
    
  static table(){
    return TableName;
  }
  
  static count(expression,where){
    let sql = 'select count('+expression+') from `fcc_member` ';
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
    if(this.name !== null && !(typeof this.name==='string' && this.name.length>=0 && this.name.length<=64)){
      throw new Error('attribute name(name) must be a string length in [0,64]');
    }
    if(this.mobile !== null && !(typeof this.mobile==='string' && this.mobile.length>=0 && this.mobile.length<=32)){
      throw new Error('attribute mobile(mobile) must be a string length in [0,32]');
    }
    if(this.gender !== null && !(typeof this.gender==='number' && this.gender>=0 && this.gender<=255)){
      throw new Error('attribute gender(gender) must be a number in [0,255]');
    }
    if(this.email !== null && !(typeof this.email==='string' && this.email.length>=0 && this.email.length<=64)){
      throw new Error('attribute email(email) must be a string length in [0,64]');
    }
    if(this.github !== null && !(typeof this.github==='string' && this.github.length>=0 && this.github.length<=255)){
      throw new Error('attribute github(github) must be a string length in [0,255]');
    }
    if(this.status !== null && !(typeof this.status==='number' && this.status>=0 && this.status<=255)){
      throw new Error('attribute status(status) must be a number in [0,255]');
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
    return new FccMember(data);
  }

}

const FieldMap = {
  id: 'id',
  name: 'name',
  mobile: 'mobile',
  gender: 'gender',
  email: 'email',
  github: 'github',
  status: 'status',
  create_time: 'createTime',
  update_time: 'updateTime',
};

const KeyMap = {
  id: 'id',
  name: 'name',
  mobile: 'mobile',
  gender: 'gender',
  email: 'email',
  github: 'github',
  status: 'status',
  createTime: 'create_time',
  updateTime: 'update_time',
};


module.exports = FccMember;
