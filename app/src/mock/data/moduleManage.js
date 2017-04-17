/**
 * Created by giantR on 2017/4/11.
 */
import Mock from 'mockjs';
const ModuleList = [];


for (let i = 0; i < 20; i++) {
  ModuleList.push(Mock.mock({
    id: Mock.Random.increment(),
    name: Mock.Random.cname(),
    icon: 'fa-dashboard',
    path: '/' + Mock.Random.last(),
    accessName: '所有人',
    accessUid: ['000'],
    accessDept: '',
    accessPid: [],
    delimitName: '',
    delimitUid: [],
    delimitDept: '',
    delimitPid: [],
    show: Mock.Random.integer(0, 1),
    sort: Mock.Random.integer(1, 100)
  }));
}

export default ModuleList;
