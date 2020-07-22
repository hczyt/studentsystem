const express = require('express')
const app = express()
const mongoose = require('mongoose')
app.use(require('cors')())
app.use(express.json())
//数据库：
mongoose.connect("mongodb://127.0.0.1:27017/student",{ useNewUrlParser:true })
mongoose.connection.once("open",function(){

    console.log("数据库连接成功了")
    
    })
/* const Student = mongoose.model('stutab',new mongoose.Schema({
    snumber:{type:Number},   
    name:{type:String},
    class:{type:String},
    sex:{type:String},
    old:{type:String},
    address:{type:String},
}))    */
let Schema = mongoose.Schema;
let personSchema = new Schema({
    snumber:Number,   
    name:String,
    class:String,
    sex:String,
    old:String,
    address:String
});
let Student = mongoose.model("stutables",personSchema); 

let teacherSchema = new Schema({
    snumber:Number,   
    zhicheng:String,
    name:String,
    sex:String,
    old:String,
    address:String,
    phone:String

});
let Teacher = mongoose.model("teatables",teacherSchema); 

let CourseSchema = new Schema({
    snumber:Number,   
    name:String,
    credit:String,
    classhour:String,
});
let Course = mongoose.model("coutables",CourseSchema); 

let ChooseSchema = new Schema({
    stuid:String,   
    classid:String,
    teaid:String,
});
let Choose = mongoose.model("chotables",ChooseSchema); 
let loginSchema = new Schema({
    username:String,
    password:String,
});
let login = mongoose.model("logintables",loginSchema); 
/* Student.create([
    {snumber:2,name:"小红",class:"1",sex:"女",old:"19",address:"广东省深圳市龙岗区白鹤小区"},
    {snumber:3,name:"李发华",class:"1",sex:"男",old:"18",address:"广东省深圳市龙岗区新区小区"},
    {snumber:4,name:"李建华",class:"1",sex:"男",old:"18",address:"广东省深圳市龙岗区烟台小区"},
    {snumber:5,name:"李依依",class:"1",sex:"女",old:"18",address:"广东省深圳市龙岗区长青小区"},
], (err) => {
    if(!err) {
        console.log('插入成功')
    } else {
        throw err;
    }
}) */
/* //引入mongodb
const {MongoClient} = require('mongodb');
const { ready } = require('jquery');
//定义数据库连接地址
const url='mongodb://127.0.0.1:27017/';
//定义要操作的数据库
const dbName='student';
app.get("/",function(req,res){
    MongoClient.connect(url,{ useUnifiedTopology: true },(err,client)=>{
        if(err){
            console.log(err);
            return;
        }
        let db=client.db(dbName);
        //查询数据
        db.collection("stutable").find({}).toArray((err,data)=>{
            if(err){
                console.log(err);
                return;
            }
            console.log(data);
            res.send(data)
            client.close();        
        })
    })
}) */
//服务端端口首页：
 app.get('/',async(req,res) =>{
    const students = await Student.find()
    res.send(students)
}) 
//登录
app.post('/api/login/',async(req,res)=>{
    console.log(req.body.username);
    const user = await login.find({$and:[{"username":req.body.username},{"password":req.body.password}]});
    console.log(user)
    res.send(user)
})
//个人信息
app.post('/api/showadmin/:user',async(req,res)=>{
    const user = await login.find({"username":req.params.user});
    res.send(user)
})
//注册
app.post('/api/addadmin',async(req,res)=>{
    const addlogin = await login.create(req.body)
    //返回给前端： 
    res.send(addlogin)
})
//修改密码
app.put('/api/uppass',async(req,res)=>{
    console.log(req.body);
    await login.update({username: req.body.username}, {password: req.body.password}, {multi: true}, function(err, docs){
        if(err) console.log(err);
        console.log("成功");
        res.send(true);
    })

})
//显示学生列表：
app.get('/api/getStudentList',async(req,res)=>{
    const students = await Student.find()
    res.send(students)
})
//录入学生：
app.post('/api/students',async(req,res)=>{
    const student = await Student.create(req.body)
    //返回给前端： 
    res.send(student)
})
//删除学生：
app.delete('/api/students/:id',async(req,res)=>{
    await Student.findByIdAndDelete(req.params.id)
    //返回：
    res.send({
        status:true
    })
})
//回显学生详细信息用于修改：
app.get('/api/update/:id',async(req,res)=>{
    const student = await Student.findById(req.params.id)
    res.send(student)
})
//更新学生信息：
app.put('/api/confirmUpdate/:id',async(req,res)=>{
    const student = await Student.findByIdAndUpdate(req.params.id,req.body)
    res.send(student)
})
//根据学号精确查询：
app.get('/api/findBySnumber/:xuehao',async(req,res)=>{
    const students = await Student.find({"snumber":req.params.xuehao})
    res.send(students)
})
//根据姓名模糊查询：
app.get('/api/findByName/:names',async(req,res)=>{
    var query = new RegExp(req.params.names)
    const students = await Student.find({$or:[{"name": query}]})
    res.send(students)

})
//姓名模糊分页查询:
app.get('/api/findByName', (req,res)=>{

    result= {
        data:{},
        total:''
    };
    // var total;
    var confident = new RegExp(req.query.names)

    //总记录数：
    var query =  Student.find({$or:[{"name": confident}]});
    query.count({},function(err, count){
        if(err){
            res.json(err)
        }else{
            result.total = count;
            console.log("count的值是：",result.total);
        }
    });
    //第几页的数据：
    pageSize = parseInt(req.query.pageSize);
    currentPage = parseInt(req.query.currentPage);

    Student.find({},(error,data)=>{
            result.data = data;
            res.send(result);
    }).where({$or:[{"name": confident}]}).skip((currentPage-1)*pageSize).limit(pageSize);//对结果默认排序

})
//分页查询列表：
app.all('/api/studentList',(req,res,next)=>{

    result= {
        data:[],
        total:''
    };
    // var total;
    //总记录数：
    var query =  Student.find({});
    query.count({},function(err, count){
        if(err){
            res.json(err)
        }else{
            result.total = count;
            console.log("count的值是：",result);
        }
    });
    //第几页的数据：
    pageSize = parseInt(req.query.pageSize);
    currentPage = parseInt(req.query.currentPage);
    console.log("页码shishi：");
    console.log(pageSize+"   "+currentPage);
     Student.find({},(error,data)=>{
         result.data = data;
         res.send(result);
    }).skip((currentPage-1)*pageSize).limit(pageSize);//对结果默认排序

});

//教师
Teacher.find({},(err, docs) => {
    if(!err) {
        console.log(docs)
        console.log(typeof docs)
    } else {
         throw err
     }
})
//显示教师列表：
app.get('/api/getteahcerList',async(req,res)=>{
    const teachers = await Teacher.find()
    res.send(teachers)
})
//录入教师：
app.post('/api/teahcers',async(req,res)=>{
    console.log("a");
    const teachers = await Teacher.create(req.body)
    //返回给前端： 
    res.send(teachers)
})
//删除教师：
app.delete('/api/teachers/:id',async(req,res)=>{
    await Teacher.findByIdAndDelete(req.params.id)
    //返回：
    res.send({
        status:true
    })
})
//回显教师详细信息用于修改：
app.get('/api/teacherupdate/:id',async(req,res)=>{
    const teacher = await Teacher.findById(req.params.id)
    res.send(teacher)
})
//更新教师信息：
app.put('/api/teaconfirmUpdate/:id',async(req,res)=>{
    const teacher = await Teacher.findByIdAndUpdate(req.params.id,req.body)
    res.send(teacher)
})
//根据教师号精确查询：
app.get('/api/teafindBySnumber/:jshao',async(req,res)=>{
    const teacher = await Teacher.find({"snumber":req.params.jshao})
    res.send(teacher)
})
//根据姓名模糊查询：
app.get('/api/teafindByName/:names',async(req,res)=>{
    var query = new RegExp(req.params.names)
    const teahcers = await Teacher.find({$or:[{"name": query}]})
    res.send(teachers)

})
//姓名模糊分页查询:
app.get('/api/teafindByName', (req,res)=>{

    result= {
        data:{},
        total:''
    };
    // var total;
    var confident = new RegExp(req.query.names)

    //总记录数：
    var query =  Teacher.find({$or:[{"name": confident}]});
    query.count({},function(err, count){
        if(err){
            res.json(err)
        }else{
            result.total = count;
            console.log("count的值是：",result.total);
        }
    });
    //第几页的数据：
    pageSize = parseInt(req.query.pageSize);
    currentPage = parseInt(req.query.currentPage);

    Teacher.find({},(error,data)=>{
            result.data = data;
            res.send(result);
    }).where({$or:[{"name": confident}]}).skip((currentPage-1)*pageSize).limit(pageSize);//对结果默认排序

})
//分页查询列表：
app.all('/api/teacherList',(req,res,next)=>{

    result= {
        data:[],
        total:''
    };
    // var total;
    //总记录数：
    var query =  Teacher.find({});
    query.count({},function(err, count){
        if(err){
            res.json(err)
        }else{
            result.total = count;
            console.log("count的值是：",result);
        }
    });
    //第几页的数据：
    pageSize = parseInt(req.query.pageSize);
    currentPage = parseInt(req.query.currentPage);
    console.log("页码shishi：");
    console.log(pageSize+"   "+currentPage);
     Teacher.find({},(error,data)=>{
         result.data = data;
         res.send(result);
    }).skip((currentPage-1)*pageSize).limit(pageSize);//对结果默认排序

});

//课程
//显示课程列表：
app.get('/api/getcourseList',async(req,res)=>{
    const courses = await Course.find()
    res.send(courses)
})
//录入课程：
app.post('/api/courses',async(req,res)=>{
    const courses = await Course.create(req.body)
    //返回给前端： 
    res.send(courses)
})
//删除课程：
app.delete('/api/courses/:id',async(req,res)=>{
    await Course.findByIdAndDelete(req.params.id)
    //返回：
    res.send({
        status:true
    })
})
//回显课程详细信息用于修改：
app.get('/api/courseupdate/:id',async(req,res)=>{
    const course = await Course.findById(req.params.id)
    res.send(course)
})
//更新课程信息：
app.put('/api/couconfirmUpdate/:id',async(req,res)=>{
    const course = await Course.findByIdAndUpdate(req.params.id,req.body)
    res.send(course)
})
//根据课程号精确查询：
app.get('/api/coufindBySnumber/:jshao',async(req,res)=>{
    const course = await Course.find({"snumber":req.params.jshao})
    res.send(course)
})
//根据姓名模糊查询：
app.get('/api/coufindByName/:names',async(req,res)=>{
    var query = new RegExp(req.params.names)
    const courses = await Course.find({$or:[{"name": query}]})
    res.send(courses)

})
//姓名模糊分页查询:
app.get('/api/coufindByName', (req,res)=>{

    result= {
        data:{},
        total:''
    };
    // var total;
    var confident = new RegExp(req.query.names)

    //总记录数：
    var query =  Course.find({$or:[{"name": confident}]});
    query.count({},function(err, count){
        if(err){
            res.json(err)
        }else{
            result.total = count;
            console.log("count的值是：",result.total);
        }
    });
    //第几页的数据：
    pageSize = parseInt(req.query.pageSize);
    currentPage = parseInt(req.query.currentPage);

    Course.find({},(error,data)=>{
            result.data = data;
            res.send(result);
    }).where({$or:[{"name": confident}]}).skip((currentPage-1)*pageSize).limit(pageSize);//对结果默认排序

})
//分页查询列表：
app.all('/api/courseList',(req,res,next)=>{

    result= {
        data:[],
        total:''
    };
    // var total;
    //总记录数：
    var query =  Course.find({});
    query.count({},function(err, count){
        if(err){
            res.json(err)
        }else{
            result.total = count;
            console.log("count的值是：",result);
        }
    });
    //第几页的数据：
    pageSize = parseInt(req.query.pageSize);
    currentPage = parseInt(req.query.currentPage);
    console.log("页码shishi：");
    console.log(pageSize+"   "+currentPage);
     Course.find({},(error,data)=>{
         result.data = data;
         res.send(result);
    }).skip((currentPage-1)*pageSize).limit(pageSize);//对结果默认排序

});
/* const chooseli=Choose.aggregate([
    {
        $lookup:{
            from:"teatables",
            localField:"teaid",
            foreignField:"sNumber",
            as:"teaid"
        },
        $lookup:{
            from:"stutables",
            localField:"stuid",
            foreignField:"sNumber",
            as:"stuid"
        }
    }
    ],function(err,docs){
        return JSON.stringify(docs);
    }) */
//选课
//显示课程列表：
app.get('/api/getchooseList',async(req,res)=>{
    const chooses = await Choose.find()
    res.send(chooses)
})
//录入课程：
app.post('/api/chooses',async(req,res)=>{
    const chooses = await Choose.create(req.body)
    //返回给前端： 
    res.send(choose)
})
//删除课程：
app.delete('/api/chooses/:id',async(req,res)=>{
    await Choose.findByIdAndDelete(req.params.id)
    //返回：
    res.send({
        status:true
    })
})
//回显课程详细信息用于修改：
app.get('/api/chorseupdate/:id',async(req,res)=>{
    const choose = await Choose.findById(req.params.id)
    res.send(choose)
})
//更新课程信息：
app.put('/api/choconfirmUpdate/:id',async(req,res)=>{
    const choose = await Choose.findByIdAndUpdate(req.params.id,req.body)
    res.send(choose)
})
//根据课程号精确查询：
app.get('/api/chofindBySnumber/:jshao',async(req,res)=>{
    const choose = await Choose.find({"teaid":req.params.jshao})
    res.send(choose)
})
//根据姓名模糊查询：
/* app.get('/api/chofindByName/:names',async(req,res)=>{
    var query = new RegExp(req.params.names)
    const chooses = await Choose.find({$or:[{"name": query}]})
    res.send(chooses)

}) */
//姓名模糊分页查询:
/* app.get('/api/chofindByName', (req,res)=>{

    result= {
        data:{},
        total:''
    };
    // var total;
    var confident = new RegExp(req.query.names)

    //总记录数：
    var query =  Choose.find({$or:[{"name": confident}]});
    query.count({},function(err, count){
        if(err){
            res.json(err)
        }else{
            result.total = count;
            console.log("count的值是：",result.total);
        }
    });
    //第几页的数据：
    pageSize = parseInt(req.query.pageSize);
    currentPage = parseInt(req.query.currentPage);

    Choose.find({},(error,data)=>{
            result.data = data;
            res.send(result);
    }).where({$or:[{"name": confident}]}).skip((currentPage-1)*pageSize).limit(pageSize);//对结果默认排序

}) */
//分页查询列表：
app.all('/api/chooseList',(req,res,next)=>{

    result= {
        data:[],
        total:''
    };
    // var total;
    //总记录数：
    var query =  Choose.find({});
    query.count({},function(err, count){
        if(err){
            res.json(err)
        }else{
            result.total = count;
            console.log("count的值是：",result);
        }
    });
    //第几页的数据：
    pageSize = parseInt(req.query.pageSize);
    currentPage = parseInt(req.query.currentPage);
    console.log("页码shishi：");
    console.log(pageSize+"   "+currentPage);
     Choose.find({},(error,data)=>{
         result.data = data;
         res.send(result);
    }).skip((currentPage-1)*pageSize).limit(pageSize);//对结果默认排序

});
app.listen(3001,()=>{
    console.log('http://localhost:3001/')
})
