
const fs = require('fs');
const { EOL } = require('os');
let file = '2017-11-19.csv';

let content = fs.readFileSync(`/Users/lanhao/Desktop/${file}`).toString().split(EOL);

let length = content.length;

let genderMap = {
  '美女': 2,
  '帅哥': 1,
}

let uniq = {};
let ts = Number.parseInt(Date.now() / 1000);
let SQL = 'insert into fcc_member (`name`,`mobile`,`gender`,`email`,`create_time`,`update_time`) values (';
let data = [];
for (let k = 2; k < length; k++) {

  let row = content[k].split(',');
  let user = {
    name: row[2],
    gender: genderMap[row[3]] || 0,
    mobile: row[4],
    email: row[5],
  };

  if (uniq[user.mobile]) {
    continue;
  }
  uniq[user.mobile] = true;
  data.push(`"${user.name}",${user.mobile},"${user.gender}","${user.email}",${ts},${ts}`);

}

SQL = SQL + EOL + data.join(EOL + '),(' + EOL) + EOL + ') ON DUPLICATE KEY UPDATE `name`=VALUES(name),`gender`=VALUES(gender),`email`=VALUES(email),update_time=VALUES(update_time)';

fs.writeFileSync(`./test/${file}.sql`, SQL);