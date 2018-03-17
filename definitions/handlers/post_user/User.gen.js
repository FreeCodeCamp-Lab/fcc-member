"use strict";



class User {
  constructor(options={}){
    this.name = options.name || '';
    this.mobile = options.mobile;
    this.email = options.email || '';
    this.gender = options.gender || 1;
    this.github = options.github || '';
    this.firstEvent = options.firstEvent || 0;
    this.validate();
  }

  static fromRequest(req){
    let options={};
    options.name = this.pick(req, 'body.name', 'string', '');
    if(!this.pick(req, 'body.mobile')){
      throw new Error("Requirement : [mobile]");
    }
    options.mobile = this.pick(req, 'body.mobile', 'string', '');
    options.email = this.pick(req, 'body.email', 'string', '');
    options.gender = this.pick(req, 'body.gender', 'enum', 1);
    options.github = this.pick(req, 'body.github', 'string', '');
    options.firstEvent = this.pick(req, 'body.firstEvent', 'number', 0);
    return new User(options);
  }

  getGender(){
    return ({"0":"unknown","1":"帅哥","2":"美女"})[this.gender];
  }

  validate(){
    if(!((typeof this.name === 'string') && (this.name.length>=0) && (this.name.length<=32))){
      throw new Error('type validate failed: [name]: String length must between 0 to 32');
    }

    if(!((typeof this.mobile === 'string') && (this.mobile.length>=0) && (this.mobile.length<=32))){
      throw new Error('type validate failed: [mobile]: String length must between 0 to 32');
    }

    if(!((typeof this.email === 'string') && (this.email.length>=0) && (this.email.length<=64))){
      throw new Error('type validate failed: [email]: String length must between 0 to 64');
    }

    if(({"0":"unknown","1":"帅哥","2":"美女"})[this.gender] === undefined){
      throw new Error('type validate failed: [gender]: gender can only choosing from [" 0 -> unknown  , 1 -> 帅哥  , 2 -> 美女  ,"]');
    }

    if(!((typeof this.github === 'string') && (this.github.length>=0) && (this.github.length<=255))){
      throw new Error('type validate failed: [github]: String length must between 0 to 255');
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
          tmp = tmp.toString();
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

module.exports = User;