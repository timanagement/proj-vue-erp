<template>
  <div>
    <!-- 个人信息 -->
    <h3>{{this.$store.state.user.userInfo.u_truename}}
      <small>{{this.$store.state.user.userInfo.u_center}} - {{this.$store.state.user.userInfo.u_dept}}</small>
    </h3>

    <!-- 概览 -->
    <div class="panel panel-default">
      <el-row>
        <el-col :sm="12" :md="6" class="wrapper b-r">
          <span class="fa-stack fa-2x pull-left m-r-sm">
            <i class="fa fa-circle fa-stack-2x text-info"></i>
            <i class="fa fa-external-link fa-stack-1x text-white"></i>
          </span>
          <router-link class="clear" to="/todo">
            <span class="h3 block m-t-xs">
              <strong v-animateInteger="page.todo"></strong>
            </span>
            <small class="text-muted text-uc">发起审批</small>
          </router-link>
        </el-col>
        <el-col :sm="12" :md="6" class="wrapper b-r">
          <span class="fa-stack fa-2x pull-left m-r-sm">
            <i class="fa fa-circle fa-stack-2x text-warning"></i>
            <i class="fa fa-square-o fa-stack-1x text-white"></i>
          </span>
          <router-link class="clear" to="/untodo">
            <span class="h3 block m-t-xs">
              <strong v-animateInteger="page.untodo"></strong>
            </span>
            <small class="text-muted text-uc">待我审批</small>
          </router-link>
        </el-col>
        <el-col :sm="12" :md="6" class="wrapper b-r">
          <span class="fa-stack fa-2x pull-left m-r-sm">
            <i class="fa fa-circle fa-stack-2x text-danger"></i>
            <i class="fa fa-check-square-o fa-stack-1x text-white"></i>
          </span>
          <router-link class="clear" to="/havedo">
            <span class="h3 block m-t-xs">
              <strong v-animateInteger="page.havedo"></strong>
            </span>
            <small class="text-muted text-uc">已办审批</small>
          </router-link>
        </el-col>
        <el-col :sm="12" :md="6" class="wrapper b-r">
          <span class="fa-stack fa-2x pull-left m-r-sm">
            <i class="fa fa-circle fa-stack-2x icon-muted"></i>
            <i class="fa fa-clock-o fa-stack-1x text-white"></i>
          </span>
          <a class="clear" href="javascript:">
            <span class="h3 block m-t-xs">
              <strong>{{page.time}}</strong>
            </span>
            <small class="text-muted text-uc">{{page.date}}</small>
          </a>
        </el-col>
      </el-row>
    </div>

    <!-- 互动讨论 集团公告 -->
    <div class="row">
      <div class="col-md-6">
        <section class="panel panel-info">
          <header class="panel-heading font-bold">
            <router-link to="/discussion" class="pull-right">更多</router-link>
            <h3 class="panel-title">互动讨论</h3>
          </header>
          <div class="panel-body no-padder scrollable" style="max-height: 200px">
            <table class="table table-hover">
              <colgroup>
                <col width="80">
                <col>
                <col width="110">
              </colgroup>
              <tbody>
              <tr>
                <td class="text-center v-middle">王文军</td>
                <td class="v-middle">啊是的空间发挥困了就睡大黄蜂离开家</td>
                <td class="text-center">2017-03-28 <br>12:00:00</td>
              </tr>
              <tr>
                <td class="text-center v-middle">王文军</td>
                <td class="v-middle">啊是的空间发挥困了就睡大黄蜂离开家</td>
                <td class="text-center">2017-03-28 <br>12:00:00</td>
              </tr>
              </tbody>
            </table>
          </div>

          <footer class="panel-footer bg-white">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="说点什么吧..."/>
              <span class="input-group-btn">
                <button class="btn btn-success" type="button">发送</button>
              </span>
            </div>

          </footer>
        </section>
      </div>
      <div class="col-md-6">
        <section class="panel panel-success">
          <header class="panel-heading font-bold">
            <router-link to="/announcement" class="pull-right">更多</router-link>
            <h3 class="panel-title">集团公告</h3>
          </header>
          <el-table
              :data="announcementData"
              max-height="240"
              @row-click="handleAnnouncementClick">
            <el-table-column
                prop="readtype"
                width="50">
              <template scope="data">
                <i class="fa" :class="data.row.readperson | readType($store.state.user.userInfo.u_id)"></i>
              </template>
            </el-table-column>
            <el-table-column
                prop="noticetitle"
                label="标题"
                min-width="180">
            </el-table-column>
            <el-table-column
                prop="senddate"
                label="日期"
                width="110">
            </el-table-column>
          </el-table>
        </section>
      </div>
    </div>

    <!-- 工作提醒 生日提醒-->
    <div class="row">
      <div class="col-md-6">
        <section class="panel panel-danger">
          <header class="panel-heading font-bold">
            <h3 class="panel-title ">工作提醒</h3>
          </header>
          <div class="panel-body no-padder scrollable" style="max-height: 200px">
            <table class="table table-hover">
              <colgroup>
                <col width="80">
                <col>
                <col width="110">
              </colgroup>
              <tbody>
              <tr>
                <td class="text-center v-middle">王文军</td>
                <td class="v-middle">啊是的空间发挥困了就睡大黄蜂离开家</td>
                <td class="text-center">2017-03-28 <br>12:00:00</td>
              </tr>
              <tr>
                <td class="text-center v-middle">王文军</td>
                <td class="v-middle">啊是的空间发挥困了就睡大黄蜂离开家</td>
                <td class="text-center">2017-03-28 <br>12:00:00</td>
              </tr>
              </tbody>
            </table>
          </div>

        </section>
      </div>
      <div class="col-md-6">
        <section class="panel panel-warning">
          <header class="panel-heading font-bold">
            <h3 class="panel-title">生日提醒</h3>
          </header>
          <div class="bg-light dk wrapper"><span class="pull-right">Friday</span> <span
              class="h4">$540<br>
                    <small class="text-muted">+1.05(2.15%)</small> </span>
            <div class="text-center m-b-n m-t-sm">
              <div class="sparkline" data-type="line" data-height="65" data-width="100%"
                   data-line-width="2" data-line-color="#dddddd" data-spot-color="#bbbbbb"
                   data-fill-color="" data-highlight-line-color="#fff"
                   data-spot-radius="3" data-resize="true"
                   values="280,320,220,385,450,320,345,250,250,250,400,380"></div>
              <div class="sparkline inline" data-type="bar" data-height="45"
                   data-bar-width="6" data-bar-spacing="6" data-bar-color="#65bd77">
                10,9,11,10,11,10,12,10,9,10,11,9,8
              </div>
            </div>
          </div>
          <div class="panel-body">
            <div><span class="text-muted">Total:</span> <span
                class="h3 block">$2500.00</span></div>
            <div class="line pull-in"></div>
            <div class="row m-t-sm">
              <div class="col-xs-4">
                <small class="text-muted block">Market</small>
                <span>$1500.00</span></div>
              <div class="col-xs-4">
                <small class="text-muted block">Referal</small>
                <span>$600.00</span></div>
              <div class="col-xs-4">
                <small class="text-muted block">Affiliate</small>
                <span>$400.00</span></div>
            </div>
          </div>
        </section>
      </div>
    </div>

    <!-- 考勤统计 -->
    <el-table
        :data="attendanceData">
      <el-table-column
          prop="cymd"
          label="考勤日期"
          min-width="110">
      </el-table-column>
      <el-table-column
          prop="weekday"
          label="星期"
          min-width="80">
      </el-table-column>
      <el-table-column
          prop="upwork"
          label="上班刷卡"
          min-width="110">
      </el-table-column>
      <el-table-column
          prop="downwork"
          label="下班刷卡"
          min-width="110">
      </el-table-column>
      <el-table-column
          prop="status"
          label="考勤状态"
          min-width="100">
      </el-table-column>
    </el-table>

    <!-- 公告详情 -->
    <el-dialog :title="`No. ${announcementDetail.noticeid}`" v-model="dialogVisible" size="large">
      <h2 class="text-center m-t-n">{{announcementDetail.noticetitle}}</h2>
      <p class="text-center">
        发布者: <strong>{{announcementDetail.sendperson}}</strong>
        发布时间: <strong>{{announcementDetail.senddate}}</strong>
      </p>
      <p class="line"></p>
      <div v-html="announcementDetail.noticecontent" class="scroll-y" style="max-height: 200px;"></div>
      <div slot="footer" class="text-left">
        <el-card v-for="(pic,index) in announcementDetail.picarr" :key="pic" :body-style="{ padding: '0px' }"
                 class="picCard">
          <span class="fi fi-add pull-left" :class="pic | fileIcon"></span>
          <div class="pull-left p-t-sm p-l-sm">
            <el-tooltip effect="dark" :content="announcementDetail.fileNames[index]" placement="top">
              <p class="picName">{{announcementDetail.fileNames[index]}}</p>
            </el-tooltip>
            <a class="btn btn-link" v-previewImage="pic">预览</a>
            <a :href="pic" download class="btn btn-link">下载</a>
          </div>
        </el-card>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>
  .picCard {
    display: inline-block;
  }

  .picName {
    width: 105px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>

<script type="text/ecmascript-6">
  import Api from 'api'
  export default{
    name: 'home',
    data() {
      return {
        // 主页数据展示
        page: {
          time: '',
          date: '',
          todo: 0,
          untodo: 0,
          havedo: 0
        },
        // 考勤数据
        attendanceData: [],
        // 公告列表
        announcementData: [],
        // 公告详情
        announcementDetail: {
          noticetitle: '',
          noticecontent: '',
          senddate: '',
          sendperson: '',
          fileNames: [],
          picarr: []
        },
        // 公告详情弹窗状态
        dialogVisible: false
      }
    },
    filters: {
      readType(readperson, uid) {
        return readperson.indexOf(`|${uid}|`) !== -1 ? 'fa-envelope-open-o' : 'fa-envelope'
      }
    },
    methods: {
      /* 查看公告 */
      handleAnnouncementClick(row) {
        Api.detail('/indexnotices', row.noticeid, res => {
          Object.assign(this.announcementDetail, res.data, {fileNames: res.data.fileNames && res.data.fileNames.split('|')})
          this.dialogVisible = true
          // 未读置为已读
          if (res.data.readperson.indexOf(`|${this.$store.state.user.userInfo.u_id}|`) === -1) {
            Api.put('/indexnotices', {id: row.noticeid}, res => {
              res.data === 'success' && this.getPage()
            })
          }
        })
      },
      /* 获取页面数据 */
      getPage() {
        /* 获取待办 */
        Api.get('/undotos', {}, res => {
          this.page.untodo = res.data.length
        })
        /* 获取已办 */
        Api.get('/undotoeds', {}, res => {
          let nums = res.data.map(item => {
            return Number(item.num)
          })
          nums.forEach(num => (this.page.havedo += num))
        })
        /* 获取公告 0->未读 1->已读 2->全部 */
        Api.get('/indexnotices', {
          pageSize: 10000,
          readtype: 2
        }, res => {
          this.announcementData = res.data
        })
        /* 获取考勤信息 */
        Api.get('/attendances', {}, res => {
          this.attendanceData = res.data
        })
      },
      showTime() {
        let now = new Date()
        let H = now.getHours().toString().length > 1 ? now.getHours() : '0' + now.getHours()
        let m = now.getMinutes().toString().length > 1 ? now.getMinutes() : '0' + now.getMinutes()
        let Y = now.getFullYear()
        let M = now.getMonth() + 1
        let D = now.getDate()
        let s = now.getSeconds().toString().length > 1 ? now.getSeconds() : '0' + now.getSeconds()
        let W = now.getDay()
        this.page.time = H + ':' + m + ':' + s
        this.page.date = Y + '-' + M + '-' + D + ' 星期' + this.$store.state.global.weekArr[W]
        setTimeout(this.showTime, 1000)
      }
    },
    mounted() {
      this.showTime()
      this.getPage()
    }
  }
</script>
