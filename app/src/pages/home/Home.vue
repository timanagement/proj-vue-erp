<template>
  <div>
    <!-- 个人信息 -->
    <h3>{{this.$store.state.user.userinfo.u_truename}}
      <small>{{this.$store.state.user.userinfo.u_center}} - {{this.$store.state.user.userinfo.u_dept}}</small>
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
              <strong>{{page.todo}}</strong>
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
              <strong>{{page.untodo}}</strong>
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
              <strong>{{page.havedo}}</strong>
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
          <div class="panel-body no-padder scrollable" style="max-height: 200px;">
            <table class="table table-hover">
              <colgroup>
                <col width="80">
                <col>
                <col width="100">
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

    <!-- 工作提醒 生日提醒-->
    <div class="row">
      <div class="col-md-6">
        <section class="panel panel-danger">
          <header class="panel-heading font-bold">
            <h3 class="panel-title ">工作提醒</h3>
          </header>
          <div class="panel-body no-padder scrollable" style="max-height: 200px;">
            <table class="table table-hover">
              <colgroup>
                <col width="80">
                <col>
                <col width="100">
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
  </div>
</template>

<script>
  import {commonApi} from '@/config'
  export default{
    name: "workset",
    data () {
      return {
        page: {
          time: '',
          date: '',
          todo: 0,
          untodo: 0,
          havedo: 0,
        },
        attendanceData: [
          {
            cymd: '2017-04-17',
            weekday: '星期一',
            upwork: '08:20:34',
            downwork: '08:20:34',
            status: '未打卡',
          },
          {
            cymd: '2017-04-17',
            weekday: '星期一',
            upwork: '08:20:34',
            downwork: '08:20:34',
            status: '未打卡',
          },
          {
            cymd: '2017-04-17',
            weekday: '星期一',
            upwork: '08:20:34',
            downwork: '08:20:34',
            status: '未打卡',
          },
          {
            cymd: '2017-04-17',
            weekday: '星期一',
            upwork: '08:20:34',
            downwork: '08:20:34',
            status: '未打卡',
          },
          {
            cymd: '2017-04-17',
            weekday: '星期一',
            upwork: '08:20:34',
            downwork: '08:20:34',
            status: '未打卡',
          },
          {
            cymd: '2017-04-17',
            weekday: '星期一',
            upwork: '08:20:34',
            downwork: '08:20:34',
            status: '未打卡',
          },
          {
            cymd: '2017-04-17',
            weekday: '星期一',
            upwork: '08:20:34',
            downwork: '08:20:34',
            status: '未打卡',
          },
        ],
      }
    },
    computed: {},
    components: {},
    watch: {},
    methods: {
      getPage(){
        commonApi.getData.call(this, '/undotos', {}, res => {
          this.page.untodo = res.data.length;
        })
      },
      showTime: function () {
        let now = new Date(),
          H = now.getHours().toString().length > 1 ? now.getHours() : "0" + now.getHours(),
          m = now.getMinutes().toString().length > 1 ? now.getMinutes() : "0" + now.getMinutes(),
          Y = now.getFullYear(),
          M = now.getMonth() + 1,
          D = now.getDate(),
          s = now.getSeconds().toString().length > 1 ? now.getSeconds() : "0" + now.getSeconds(),
          W = now.getDay();
        this.page.time = H + ':' + m + ':' + s;
        this.page.date = Y + '-' + M + '-' + D + ' 星期' + this.$store.state.global.weekArr[W];
        setTimeout(this.showTime, 1000)
      }
    },
    mounted: function () {
      this.showTime();
      this.getPage();
    },
    beforeMount(){

    },
    created () {

    }
  }
</script>
