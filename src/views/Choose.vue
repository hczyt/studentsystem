<template>
  <el-container>

  <transition name="el-zoom-in-top">
  <el-dialog :title="dialogTitle"  :visible.sync="dialogFormVisible" size="mini"   v-show="dialogFormVisible" class="transition-box">
    <el-form :inline="true" :model="addchoose" class="demo-form-inline" size="mini" >
       <el-divider content-position="left">基本信息：</el-divider>
      <el-form-item label="课程号:" prop="snumber">
        <el-input v-model="addchoose.snumber" placeholder="20200612xxx"     
          :rules="[
            { required: true, message: '请输入有效学号', trigger: 'blur' },
            { type: 'number', message: '请输入正确的字符', trigger: 'blur,change' } ]">
        </el-input>
      </el-form-item>
      <el-form-item label="课程名:">
        <el-input v-model="addchoose.name" placeholder="java程序设计"></el-input>
      </el-form-item>
      <el-form-item label="学分:" >
        <el-input v-model="addchoose.credit" placeholder="2"></el-input>
      </el-form-item>
      <el-form-item label="学时:" >
        <el-input v-model="addchoose.classhour" placeholder="50"></el-input>
      </el-form-item>    
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="close()" size="mini">取消</el-button>
      <el-button type="success"  @click="addAndUpdatechoose()" size="mini">确定</el-button>
    </div>
  </el-dialog>
  </transition>
      <el-form :inline="true" :model="xchoose" class="demo-form-inline" size="mini" ref="xchoose" style="width:100%">
        <el-form-item label="课程号" prop="snumber" 
            :rules="[
              {min:1,max:3,message:'请输入3位数字', trigger: 'blur'}
            ]"
        >
        <el-input v-model="xchoose.snumber" placeholder="精确查询" ></el-input>
        </el-form-item>
        <el-form-item label="课程名"  prop="name"
            :rules="[
            {min:0,max:4,message:'长度不在有效范围内', trigger: 'blur'},
          ]"
        >
          <el-input v-model="xchoose.name" placeholder="模糊查询" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('xchoose')">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="add()">录入</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="fetch()">更新</el-button>
        </el-form-item>
        <el-main>
      <!-- 这里不要把所有的列的width都设置，要不然会出现空白的列，是由组件自动填充的 -->
           <el-table
            :data="chooseList"
            border
            style="width: 100%;">
            <el-table-column
              fixed
              prop="stuid"
              label="学号 "
              width="170"
              style="text-align:center;justify-content: center;"
              >
            </el-table-column>
            <el-table-column
              prop="teaid"
              label="教师号"
             >
            </el-table-column>
            <el-table-column
              prop="classid"
              label="课程号"
             >
            </el-table-column>        
            <el-table-column
              fixed="right"
              label="操作"
              >
              <template slot-scope="scope">
                <el-button @click="edit(scope.row._id)" type="primary" size="mini">编辑</el-button>
                <el-button @click="remove(scope.row._id)" type="danger" size="mini">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 页码： -->
          <!-- <div float="left" style="font-size:12px;color:info">一共有{{page.total}}条记录</div> -->
          <div class="block" style='text-align:right;margin-top:10px'>
            <el-pagination
              @current-change="currentChange"
              layout="prev, pager, next"
              :page-size="page.size"
              :current-page="page.current"
              :total="page.total">
            </el-pagination>
          </div>
    </el-main>
    </el-form>
    </el-container>
</template>

<script>
export default {
    data() {
      return {
          chooseList:[],
          xchoose:{
            snumber:'',
            name:""
          },
        dialogTitle:'',
        dialogFormVisible: false,
        addchoose:{},
          formLabelWidth: '120px',
        //分页：
        page:{
          current:1,
          size:5,
          total:0

        },
        rules: {     
          name: [
              {required: true, message: '姓名不可为空', trigger: 'blur'}
            ]
          
        },  

      }
    },
    created(){
        this.pageInation();
        
    },
    methods: {
      //无分页显示课程列表：
      fetch(){
          this.xchoose.name = '';
          this.page.current = 1;
          this.pageInation();
      },
      //录入课程：
      add(){
        this.dialogTitle = "录入课程信息";
        this.dialogFormVisible = true;
      },
      addChoose(){       
        console.log(this.addchoose);
        this.$http.post('chooses',this.addchoose).then(()=>{
          //清空录入框信息：
          this.addchoose = {};
          //隐藏录入框：
          this.dialogFormVisible = false;
          this.$message({
              message: '录入成功',
              type: 'success'
            });
            this.page.current = 1;
            this.pageInation();
        })
      },
      //删除教师：
      remove(id){
      
          this.$http.delete(`chooses/${id}`).then(()=>{
             this.$message({
              message: '删除课程信息成功',
              type: 'success'
            });
            // this.page.current = 1;
              this.pageInation();
          })
      },
      //修改课程：
      edit(id){              
          this.id = id;
          this.dialogTitle = "修改课程信息";
          this.$http.get(`chooseupdate/${id}`).then(res=>{
              this.addchoose = res.data
              this.dialogFormVisible = true;
          });
      },
      //更新
      ConfirmUpdatechoose(id){
        this.$http.put(`choconfirmUpdate/${id}`,this.addchoose).then(()=>{
           this.dialogFormVisible = false;
            this.$message({
              message: '更新成功',
              type: 'success'
            });
            this.addteacher= {};
            // this.page.current = 1;
              this.pageInation();
        })
      },
      //录入和修改：
      addAndUpdatechoose(){
        this.dialogFormVisible = false;
          if (this.dialogTitle == "录入选课信息") {
            console.log("录入");
              this.addChoose();
          } else {
              this.ConfirmUpdatechoose(this.id);
          }
      },
      //关闭模态框：
      close(){
        if(this.dialogTitle == "修改选课信息"){
          this.addchoose = {};
        }
        this.dialogFormVisible = false;
      },
      onSubmit(ruleForm){
        if(this.xchoose.snumber!='' && this.xchoose.name ==''){
          this.$refs[ruleForm].validate((valid) => {
              if(valid) {
                //根据学号精确查询：
                this.$http.get(`chofindBySnumber/${this.xchoose.snumber}`).then(res=>{
                  console.log('课程号查询')  
                 
                  this.chooseList = res.data;
                  this.xchoose.snumber = '';
                  this.page.total = 0;
                })
              } else {
                  this.message('请输入8位数字号','error');
                  return false;
              }
         });
        }else if(this.xchoose.snumber == '' && this.xchoose.name !=''){
          this.$refs[ruleForm].validate((valid) => {
              if(valid) {
                 console.log('姓名查询') 
                  //根据姓名模糊查询：
                    this.$http.get('chofindByName?currentPage='+this.page.current+'&pageSize='+this.page.size+'&names='+this.xchoose.name).then(res=>{            
                      console.log('姓名模糊分页查询结果：')
                      this.chooseList = res.data.data;
                      this.page.total = res.data.total;
                    
                  })
              } else {
                  this.message('不要输入太奇葩的字符','warning');
                  return false;
              }
          });
        }else{
          if(this.xchoose.snumber == '' && this.xchoose.name ==''){
              this.message('请输入有效字符','error')
              return;
          }
        }
      },
      //消息通知框：
      message(messages,mtype){
        this.$message({
              message: messages,
              type: mtype
        });  
      },

      pageInation() {
        let that = this;
        //每次点击更改页码值
        this.$http.get('chooseList?currentPage='+that.page.current+'&pageSize='+that.page.size).then(res=>{
        
            if(res.data.data == null || res.data.data.length == 0){
               //除第一页的其他某页全都删除了的情况：
               that.page.current =  that.page.current - 1;
               that.pageInation();
            }else{
                that.chooseList = res.data.data;
                that.page.total = res.data.total;
            }
            
        });
      },
      currentChange(current){
        console.log(current)
        this.page.current = current;
        //姓名模糊查询的分页：
        if(this.xchoose.name  != ''){
          this.$http.get('chofindByName?currentPage='+this.page.current+'&pageSize='+this.page.size+'&names='+this.xchoose.name).then(res=>{                    
                      console.log('姓名模糊分页查询结果：')
                      this.chooseList = res.data.data;
                      this.page.total = res.data.total;        
          })
          return;
        }
        this.pageInation();
      }
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

</style>