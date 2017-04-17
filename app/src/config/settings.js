// 全局设置
const gbs = {
    // 接口基本地址
    host: 'http://192.168.17.50:808/',

    // 本地存储的key前缀
    db_prefix: 'sx_admin_',
  },
  // 回调设置
  cbs = {
    /**
     * ajax请求成功，返回的状态码不是200时调用
     * @param  {object} err 返回的对象，包含错误码和错误信息
     */
    statusError(err) {
      if (err.status) {
        switch (err.status) {
          case 401:
            this.$alert('用户验证失败:无权限或秘钥过期,请重新登录', '提示', {
              confirmButtonText: '确定',
              type: 'warning',
              callback: action => {
                this.$store.dispatch('remove_userinfo').then(() => {
                  this.$router.push('/signin');
                });
              }
            });
            break;
          default:
            this.$message.error(`出现未配置错误码${err.status},请检查Console或Network`);
            console.log(`错误内容:\n ${err} \n结束`);
        }
      } else {
        this.$message.error('返回错误,请检查Console或Network!');
        console.log(`返回错误:\n ${err} \n结束`);
      }
    },

    /**
     * ajax请求网络出错时调用
     */
    requestError(err, url) {
      this.$message({
        showClose: true,
        message: `请求${url}时出错,请检查Console或Network!`,
        type: 'error'
      });
      console.log(`请求错误:\n ${err} \n结束`)
    }
  };

export {gbs, cbs}
