import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 79,
    pid: 78,
    username: "王文军",
    center: "总裁办公室",
    dept: "总裁办公室",
    email: "rerersls@1.com",
    password: "123456",
    avatar: "/static/images/avatar.jpg",
    sex: 1,
    status: 1,
    create_time: "2017-02-02 02:35:04",
    birthday: "1994-12-16",
    address: "浙江省金华市义乌市苏溪镇苏福路185号",
    token: "86dcfa9c21aa92f697fe13438624bc86"
  }
];

const Users = [];

for (let i = 0; i < 80; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.increment(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }));
}

export {LoginUsers, Users};
