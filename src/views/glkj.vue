<template>
  <el-container>
    <el-header>
       <i class="el-icon-edit" >简易学生成绩管理系统1.0.0</i>
       <span class="glname">王小虎</span>
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
<!-- </el-menu>  
      <el-menu :default-openeds="['1', '3']">
        <el-menu-item index="/home">学生管理</el-menu-item>
        <el-menu-item index="/teacher">教师管理</el-menu-item>
        <el-menu-item index="/course">课程管理</el-menu-item>
        <el-menu-item index="2-1">选课管理</el-menu-item>
        <el-menu-item index="2-1">成绩管理</el-menu-item>
      </el-menu> -->
      </el-aside>
      <!--信息展示 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
   
   </el-container>
</template>

<script>
export default {
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