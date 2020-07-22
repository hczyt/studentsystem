<template>
<div>
  <el-container v-if="$route.meta.keepalive">
    <el-header>
       <i class="el-icon-edit" >简易学生成绩管理系统1.0.0</i>
       <span class="glname" v-html="this.username"></span>
    </el-header>
    <el-container>
      <el-aside width="200px"  style="background-color: rgb(238, 241, 246)">
        <el-menu 
      :default-active="this.$router.path"           
      router>									
      <el-menu-item index="/Home">		      
          <span>学生管理</span>
      </el-menu-item>     
      <el-menu-item index="/teacher">
          <span slot="title">教师管理</span>
      </el-menu-item>
      <el-menu-item index="/course">
          <span slot="title">课程管理</span>
      </el-menu-item>
      <el-menu-item index="/choose">
          <span slot="title">选课管理</span>
      </el-menu-item>
      <el-submenu index="2">
          <template slot="title">
              <span>用户设置</span>
          </template>
          <el-menu-item index="/myDesign">
              <span class="item_title">个人信息</span>
          </el-menu-item>
          <el-menu-item @click="clearuser()">
              <span class="item_title">退出</span>
          </el-menu-item>
      </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
   
   </el-container>
   <router-view v-if="!$route.meta.keepalive"></router-view>
</div>
</template>
<script>
export default {
    data(){
      return{
        username:""
      }
    },
   methods:{
       clearuser(){
            sessionStorage.clear();
            this.$router.push('/login');
       },
       user(){
          this.username=JSON.parse(sessionStorage.getItem("user"));
       }
        
    },
    actions(){
      this.user();
    },
    mounted() {
      this.user();
    } 
}
</script>
<style>
  body{
    margin-top: 0px;
    margin-left: 0px;
    margin-right: 0px;
  }
  .el-header, .el-footer {
    background-color: #f0f9eb;
    color: #333;
    text-align: center;
    line-height: 60px;
    margin-bottom: 10px;
  }
  .el-form{
    text-align: center;
    justify-content: center;
  }
  .glname{
    float: right;
  }
</style>