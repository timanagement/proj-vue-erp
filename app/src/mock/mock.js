import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

/* 引入数据 */
import {LoginUsers, Users} from './data/user';
import ModuleList from './data/moduleManage';
import API from './data/api';
let _LoginUsers = LoginUsers;
let _Users = Users;
let _ModuleList = ModuleList;
let _API = API;


export default {
  /**
   * mockAdapter初始化
   */
  init() {
    /* 在默认axios请求上加上拦截器 */
    let mock = new MockAdapter(axios);
    
    // 任何使用GET请求/success 都将被拦截
    // reply()的参数 (status, data, headers)
    mock.onGet('/success').reply(200, {
      msg: 'success',
    });
    
    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure'
    });
    
    //登录 post的数据需要用解析
    mock.onPost('/login').reply(config => {
      let {username, password, token} = JSON.parse(config.data);
      return new Promise((resolve, reject) => {
        let user = null;
        let hasUser = _LoginUsers.some(u => {
          if (u.username === username && (u.password === password || u.token === token)) {
            user = u;
            user.password = undefined;
            return true;
          }
        });
        
        if (hasUser) {
          resolve([200, {status: 200, message: '请求成功', data: {userinfo: user}}]);
        } else {
          resolve([200, {status: 500, message: '账号或密码错误'}]);
        }
      });
    });
    
    //修改密码
    mock.onPost('/common/upPwd').reply(config => {
      let {oldPwd, newPwd, token} = JSON.parse(config.data);
      return new Promise((resolve, reject) => {
        
        let user = _LoginUsers.filter(u => {
          if (u.token == token) {
            return u
          }
        })[0];
        if (user.password == oldPwd) {
          user.password = newPwd;
          console.log(user);
          resolve([200, {status: 200, message: '修改成功,请重新登陆'}]);
        } else {
          resolve([200, {status: 500, message: '原密码错误!'}]);
        }
      });
    });
    
    /* API */
    //获取模块列表
    mock.onGet('/common/apiList').reply(config => {
      let {page, name, pageSize} = config.params;
      let apiList = _API.filter(item => {
        return !(name && item.name.indexOf(name) == -1);
      });
      let total = apiList.length;
      apiList = apiList.filter((item, index) => index < pageSize * page && index >= pageSize * (page - 1));
      return new Promise((resolve, reject) => {
        resolve([200, {
          status: 200,
          data: {
            lists: apiList,
            total: total
          }
        }]);
      })
    });
    
    //删除模块
    mock.onGet('/common/removeApi').reply(config => {
      let {id} = config.params;
      _API = typeof id === 'object' ? _API.filter(item => !id.includes(item.id)) : _API.filter(item => item.id !== id);
      return new Promise((resolve, reject) => {
        resolve([200, {
          status: 200
        }]);
      });
    });
    
    //添加/编辑模块
    mock.onPost('/common/editApi').reply(config => {
      let data = JSON.parse(config.data);
      delete data.token;
      if (data.id) {
        /* 编辑 */
        _API.some(item => {
          if (item.id === data.id) {
            Object.assign(item, data);
            return true;
          }
        });
      } else {
        /* 添加 */
        data.id = _API[_API.length - 1]['id'] + 1;
        _API.push(data)
      }
      return new Promise((resolve, reject) => {
        resolve([200, {
          status: 200,
        }]);
      });
    });
    
    /* 模块管理 */
    //获取模块列表
    mock.onGet('/system/sysSetting/moduleManage').reply(config => {
      let {page, name, pageSize} = config.params;
      let mockModuleList = _ModuleList.filter(module => {
        return !(name && module.name.indexOf(name) == -1);
      });
      let total = mockModuleList.length;
      mockModuleList = mockModuleList.filter((item, index) => index < pageSize * page && index >= pageSize * (page - 1));
      return new Promise((resolve, reject) => {
        resolve([200, {
          status: 200,
          data: {
            moduleList: mockModuleList,
            total: total
          }
        }]);
      })
    });
    
    //删除模块
    mock.onGet('/system/sysSetting/removeModule').reply(config => {
      let {id} = config.params;
      _ModuleList = typeof id === 'object' ? _ModuleList.filter(item => !id.includes(item.id)) : _ModuleList.filter(item => item.id !== id);
      return new Promise((resolve, reject) => {
        resolve([200, {
          status: 200
        }]);
      });
    });
    
    //添加/编辑模块
    mock.onPost('/system/sysSetting/editModule').reply(config => {
      let data = config.params;
      delete data.token;
      if (data.id) {
        /* 编辑 */
        _ModuleList.some(item => {
          if (item.id === data.id) {
            item.name = data.name;
            item.belong = data.belong;
            item.path = data.path;
            item.show = data.show;
            item.sort = data.sort;
            item.icon = data.icon;
            item.accessName = data.accessName;
            item.accessUid = data.accessUid;
            item.accessDept = data.accessDept;
            item.accessPid = data.accessPid;
            item.delimitName = data.delimitName;
            item.delimitUid = data.delimitUid;
            item.delimitDept = data.delimitDept;
            item.delimitPid = data.delimitPid;
            return true;
          }
        });
      } else {
        /* 添加 */
        data.id = _ModuleList[_ModuleList.length - 1]['id'] + 1;
        _ModuleList.push(data)
      }
      return new Promise((resolve, reject) => {
        resolve([200, {
          status: 200,
        }]);
      });
    });
    
    /* 获取数据 */
    //获取用户
    mock.onGet('/getter/getAllUser').reply(config => {
      return new Promise((resolve, reject) => {
        resolve([200, {
          status: 200,
          data: {
            message: '获取成功',
            userList: _Users
          }
        }]);
      });
    });
    
  }
};
