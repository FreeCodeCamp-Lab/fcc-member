"use strict";



class Query {
  constructor(options={}){
    this.id = options.id || [];
    this.mobile = options.mobile || '';
    this.status = options.status || 1;
    this.firstEvent = options.firstEvent || 0;
    this.validate();
  }

  static fromRequest(req){
    let options={};
    options.id = this.pick(req, 'query.id', 'array', [], 'number');
    options.mobile = this.pick(req, 'query.mobile', 'string', '');
    options.status = this.pick(req, 'query.status', 'number', 1);
    options.firstEvent = this.pick(req, 'query.firstEvent', 'number', 0);
    return new Query(options);
  }

  validate(){
    if(!(Array.isArray(this.id) && (this.id.length >= 0 && this.id.length <= 100))){
      throw new Error('type validate failed: [id]: must be array of [number]');
    }
    for (let k in this.id) {
      if (!((typeof this.id[k] === 'number') && (this.id[k] >= 1) && (this.id[k] <= 999999))){
        throw new Error('type validate failed: [id]: must be array of [number] in [1,999999]');
      }
    }

    if(!((typeof this.mobile === 'string') && (this.mobile.length>=0) && (this.mobile.length<=11))){
      throw new Error('type validate failed: [mobile]: String length must between 0 to 11');
    }

    if(!(!Number.isNaN(this.status) && (this.status>=0) && (this.status<=1))){
      throw new Error('type validate failed: [status]: Number must in range 0 to 1');
    }

    if(!(!Number.isNaN(this.firstEvent) && (this.firstEvent>=0) && (this.firstEvent<=9007199254740991))){
      throw new Error('type validate failed: [firstEvent]: Number must in range 0 to 9007199254740991');
    }

  }

  static pick(source, path, type=null, defaultValue=null, memberType=null){
    let paths = path.split('.');
    let tmp = source;
    for(let k in paths){
      if(tmp[paths[k]]){
        tmp = tmp[paths[k]];
      }else{
        tmp = tmp[paths[k]];
        break;
      }
    }
    if(tmp===undefined){
      return defaultValue;
    }
    switch (type){
      case 'string':
        if(typeof tmp === 'object'){
          tmp = JSON.stringify(tmp);
        }else{
          tmp = decodeURIComponent(tmp.toString());
        }
        break;
      case 'number':
      case 'enum':
        tmp = 1*tmp;
        break;
      case 'array':
        if(typeof tmp === 'string'){
          tmp = tmp.split(',');
        }
        if (memberType === 'number') {
          let len = tmp.length;
          for (let i = 0; i < len; i++) {
            tmp[i] = 1 * tmp[i];
          }
        }
        break;
    }
    return (defaultValue && (undefined===tmp)) ? defaultValue: tmp;
  }
}

module.exports = Query;