<template>
<div id="dl">
  <el-form @submit.native.prevent="saveArticle" ref="form" :model="article" :rules="rules" label-width="80px" class="dl">
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item  prop="username">
        <el-input type="text" placeholder="请输入账号" v-model="article.username"/>
      </el-form-item>
      <el-form-item  prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="article.password"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" >注册</el-button>
        <el-button type="primary" native-type="submit">登录</el-button>
      </el-form-item>
       <el-dialog
      title="温馨提示"
      :visible.sync="dialogVisible"
      width="30%"
      >
      <span>请输入账号和密码</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="立即注册" :visible.sync="dialogTableVisible">
      <el-form @submit.native.prevent="zcuser" ref="form" :model="zcarticle" :rules="zcrules" >
          <el-form-item>
            <el-input type="text" placeholder="请输入账号" v-model="zcarticle.username"/>
          </el-form-item>
          <el-form-item >
            <el-input type="password" placeholder="请输入密码" v-model="zcarticle.password"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" native-type="submit">注册</el-button>
          </el-form-item>
          <el-dialog
          title="温馨提示"
          :visible.sync="dialogVisible1"
          width="30%"
          >
          <span>请输入账号和密码</span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
          </span>
        </el-dialog>
      </el-form>
    </el-dialog>
  </el-form>
</div>
</template>
<script>
export default {
  data() {
    
    return {
      article: {
        username: "",
        password: ""
      },
      zcarticle: {
        username: "",
        password: ""
      },
       // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        username: [
          {required: true, message: '账号不可为空', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不可为空', trigger: 'blur'}
        ]
      },
      zcrules: {
        username: [
          {required: true, message: '账号不可为空', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不可为空', trigger: 'blur'}
        ]
      },
      // 对话框显示和隐藏
      dialogVisible: false,
      dialogTableVisible:false,
      dialogVisible1 :false,

    };
  },
  methods: {
    saveArticle() {
      if(this.article.username==""||this.article.password==""){
         this.dialogVisible=true
      }   
      this.$http.post('login', this.article).then(res => {
        if(res){                  
          console.log(res.data[0].username); 
          sessionStorage.setItem('user',JSON.stringify(res.data[0].username));                 
           this.$router.push('/home'); 
           this.$message({
          message: '登录成功',
          type: 'success'
        });
         
        }  else{
             this.$message({
                message: '登录失败',
                type: 'error'
            });
        }    
        

      })
 
    },
    onSubmit(){
      this.dialogTableVisible=true;
    },
    zcuser() {
      console.log(this.zcarticle.username);
      if(this.zcarticle.username==""||this.zcarticle.password==""){
         this.dialogVisible1=true
      }
      this.$http.post('addadmin', this.zcarticle).then(res => {
        console.log(res);
        if(res.data=="disyhm"){
          this.$message({
            message: '用户名重复',
            type: 'success'
          });
        }else{
          this.$message({
            message: '创建成功',
            type: 'success'
          });
          this.dialogTableVisible=false;
        }
      })
    },
  }
};
</script>
<style scoped>
.dl{
  width: 350px;
  height: 250px;
  margin: auto;

}
.el-form-item__content{
margin-left: 0px;
}
.el-form-item__label{
  text-align: left;
}
</style>