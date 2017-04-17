/**
 * Created by giantR on 2017/4/11.
 */
import Mock from 'mockjs';
const lists = [];


for (let i = 0; i < 15; i++) {
  lists.push(Mock.mock({
    id: Mock.Random.increment(),
    name: Mock.Random.cname(),
    path: '/' + Mock.Random.last(),
    method: 'get',
    errCode: Mock.Random.integer(1, 100),
    errMsg: '请求错误',
    reqContent: [
      {
        name: Mock.Random.last(),
        required: Mock.Random.integer(0, 1),
        type: 'String',
        maxLength: Mock.Random.integer(20, 50),
        info: Mock.Random.cname()
      },
      {
        name: Mock.Random.last(),
        required: Mock.Random.integer(0, 1),
        type: 'String',
        maxLength: Mock.Random.integer(20, 50),
        info: Mock.Random.cname()
      }
    ],
    resContent: [
      {
        name: Mock.Random.last(),
        required: Mock.Random.integer(0, 1),
        type: 'String',
        maxLength: Mock.Random.integer(20, 50),
        info: Mock.Random.cname()
      }
    ],
    show: Mock.Random.integer(0, 1)
  }));
}

export default lists;
