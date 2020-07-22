import Vue from 'vue'
import VueRouter from 'vue-router'
import Student from '../views/Student.vue'
import Course from '../views/Course.vue'
import Teacher from '../views/Teacher.vue'
import Choose from '../views/Choose.vue'
import login from '../views/login.vue'
import mydesign from '../views/myDesign.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: login,
    meta:{
      keepalive:false
    }
  },
  {
    path: '/',
    component: Student,
    meta:{
      keepalive:true
    }
  },
  {
    path: '/home',
    component: Student,
    meta:{
      keepalive:true
    }
  },
  {
    path: '/teacher',
    component: Teacher,
    meta:{
      keepalive:true
    }
  },
  {
    path: '/course',
    component: Course,
    meta:{
      keepalive:true
    }
  },
  {
    path: '/choose',
    component: Choose,
    meta:{
      keepalive:true
    }
  },
  {
    path: '/myDesign',
    component: mydesign,
    meta:{
      keepalive:true
    }
  }

]

const router = new VueRouter({
  routes
})
router.beforeEach((to,form,next)=>{
  if(to.path=='/login'){
    sessionStorage.removeItem("user");
  }
  //console.log(JSON.parse(sessionStorage.getItem("user")));
  let user = JSON.parse(sessionStorage.getItem("user"));
  if(!user&&to.path!='/login'){
    next({path:'/login'})
  }
  
  else{
    next();
  }
})
export default router
