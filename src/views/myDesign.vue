<template>
<el-tabs type="border-card">
  <el-tab-pane>
    <span slot="label"><i class="el-icon-user"></i> 个人信息</span>
    <el-row>
        <el-col :span="3"><span>用户名:</span></el-col>
        <el-col :span="6"> <span v-html="this.user.username"></span></el-col>     
    </el-row>
    <el-row>
        <el-col :span="3"><span>密码:</span></el-col>
        <el-col :span="6"><span v-html="this.user.password"></span></el-col>         
    </el-row>
  </el-tab-pane>
  <el-tab-pane>
    <span slot="label"><i class="el-icon-setting"></i> 修改密码</span>
    <div>
        <el-form @submit.native.prevent="uppass" ref="form" :model="xjpass" :rules="zcrules" >
            <el-form-item >
                <el-input type="password" placeholder="请输入密码" v-model="xjpass.password"/>
            </el-form-item>
            <el-form-item >
                <el-input type="password" placeholder="请再输入密码" v-model="xjpass.zcpassword"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">修改</el-button>
            </el-form-item>
        </el-form>
    </div>
  </el-tab-pane>
</el-tabs>
</template>
<style scoped>
*{
    color: black;
    text-align: left;
}
</style>
<script>
export default {
    
    data(){
        return{
            user:[],
            xjpass: {
                password: "",
                zcpassword: ""
            },
            zcrules: {
                password: [
                {required: true, message: '密码不可为空', trigger: 'blur'}
                ]
            },
        }
    },
    methods:{
        showuse(){
            const user=JSON.parse(sessionStorage.getItem("user"));
            this.$http.post(`showadmin/${user}`).then(res=>{
                console.log(res.data[0]);
                this.user=res.data[0];  
                console.log(this.user.username);      
            })
        },
        uppass(){
            this.xjpass.username=this.user.username
             this.$http.put('uppass',this.xjpass).then(res=>{
                 console.log(res);
                 if(res){
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                 }
                 else{
                    this.message('修改失败','error');
                 }
               

            })
        }
    },
    mounted(){
        this.showuse();
    },
    actions(){
        this.showuse();
    }
}
</script>