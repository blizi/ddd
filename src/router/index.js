import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Login.vue'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

  const routes = [
  {
    path: '/',
    name: 'Login',
    component: Home,
    meta:{title:'登录'}
  },
  {
    path: '/home',
    name: 'Home',
    redirect:'/home/other',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    children:[
      {
        path: 'other',
        name: 'other',
        component: () => import('../views/otherInfo')
      }
    ]
  },
    {
      path: '/rotation',
      name: 'Rotation',
      redirect:'/rotation/rot-list',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
      children: [
        {
          path: 'rot-list',
          component: () => import('@/components/rotationTable'),
          name: 'rot-list',
          meta: { title: '轮播图-列表', icon: 'list' }
        },
        {
          path: 'rot-edit',
          component: () => import('@/components/edit'),
          name: 'rot-edit',
          meta: { title: '修改/增加-轮播图', icon: 'edit' }
        }
      ]
    },
    {
      path: '/lately',
      name: 'lately',
      redirect:'/lately/lat-list',
      component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
      children:[
        {
          path: 'lat-list',
          component: () => import('@/views/latelyTable'),
          name: 'lat-list',
          meta: { title: '我们最近的工作-列表', icon: 'list' }
        },
        {
          path: 'lat-add',
          component: () => import('../views/addLately'),
          name: 'lat-add',
          meta: { title: '新增-我们最近的工作', icon: 'list' }
        },
        {
          path: 'lat-edit',
          component: () => import('../views/editLately'),
          name: 'lat-edit',
          meta: { title: '修改-我们最近的工作', icon: 'list' }
        },
        {
          path: 'lat-info',
          component: () => import('../views/infoLately'),
          name: 'lat-info',
          meta: { title: '二级页面-我们最近的工作', icon: 'list' }
        }
      ]
    },
    {
      path: '/friend',
      name: 'friend',
      redirect:'/friend/fri-list',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
      children: [
        {
          path: 'fri-list',
          component: () => import('@/components/friendTable'),
          name: 'fri-list',
          meta: { title: '友情链接', icon: 'list' }
        },
        {
          path: 'fri-edit',
          component: () => import('@/views/editFriend'),
          name: 'edit',
          meta: { title: '新增/修改-友情链接', icon: 'list' }
        },
      ]
    },
    {
      path: '/nav',
      name: 'nav',
      redirect:'/nav/nav-list',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
      children:[
        {
          path: 'nav-list',
          component: () => import('@/views/navTable'),
          name: 'nav-list',
          meta: { title: '导航-列表', icon: 'list' }
        },
        {
          path: 'nav-edit',
          component: () => import('@/views/editNav'),
          name: 'nav-edit',
          meta: { title: '新增/修改-导航', icon: 'edit' }
        }
      ]
    },
    {
      path: '/exp',
      name: 'experience',
      redirect:'/exp/exp-list',
      component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
      children:[
        {
          path: 'exp-list',
          component: () => import('@/views/ExperienceTable'),
          name: 'exp-list',
          meta: { title: '经验介绍-列表', icon: 'list' }
        },
        {
          path: 'exp-edit',
          component: () => import('@/views/editExperience'),
          name: 'exp-edit',
          meta: { title: '新增/修改-经验介绍', icon: 'edit' }
        },
        {
          path: 'exp-edit-menu',
          component: () => import('@/views/editExperienceMenu'),
          name: 'exp-edit-menu',
          meta: { title: '修改/增加-经验介绍-目录', icon: 'edit' }
        }
      ]
    },
    {
      path: '/menu',
      name: 'menu',
      redirect:'/menu/menu-list',
      component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
      children:[
        {
          path: 'menu-list',
          component: () => import('@/views/menuView'),
          name: 'menu-list',
          meta: { title: '目录列表', icon: 'list' }
        },
        {
          path: 'menu-edit',
          component: () => import('@/views/viewAllMenu'),
          name: 'menu-edit',
          meta: { title: '目录管理', icon: 'edit' }
        },
        // {
        //   path: 'exp-edit-menu',
        //   component: () => import('@/views/editExperienceMenu'),
        //   name: 'exp-edit-menu',
        //   meta: { title: '修改/增加-经验介绍-目录', icon: 'edit' }
        // }
      ]
    },
    {
      path: '/article',
      name: 'article',
      redirect:'/article/article-view',
      component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
      children:[
        {
          path: 'article-view',
          component: () => import('@/views/viewArticle'),
          name: 'article-view',
          meta: { title: '查看文章', icon: 'list' }
        },
        {
          path: 'article-resolve',
          component: () => import('@/views/resolveView'),
          name: 'article-resolve',
          meta: { title: '解决方案', icon: 'list' }
        },
      ]
    },
    {
      path: '/honor',
      name: 'honor',
      redirect:'/honor/honor-view',
      component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
      children:[
        {
          path: 'honor-view',
          component: () => import('@/views/viewHonor'),
          name: 'honor-view',
          meta: { title: '我们的荣耀', icon: 'list' }
        },
        {
          path: 'honor-edit',
          component: () => import('@/views/editHonor'),
          name: 'honor-edit',
          meta: { title: 'edit-我们的荣耀', icon: 'edit' }
        },
      ]
    },
    {
      path: '/comment',
      name: 'comment',
      redirect:'/comment/comment-view',
      component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
      children:[
        {
          path: 'comment-view',
          component: () => import('@/views/viewcomment'),
          name: 'comment-view',
          meta: { title: '评论-list', icon: 'list' }
        },
        // {
        //   path: 'honor-edit',
        //   component: () => import('@/views/editHonor'),
        //   name: 'honor-edit',
        //   meta: { title: 'edit-我们的荣耀', icon: 'edit' }
        // },
      ]
    }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
