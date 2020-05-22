<template>
  <div class="home">
    <el-container style="height: 1000px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>友情链接</template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="$router.push('/friend/fri-list')">查看</el-menu-item>
              <el-menu-item index="1-2" @click="$router.push('/friend/fri-edit')">新增</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-message"></i>导航管理</template>
            <el-menu-item-group>
              <el-menu-item index="2-1" @click="viewNav">查看</el-menu-item>
              <el-menu-item index="2-2" @click="editNav">新增</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-message"></i>轮播图</template>
            <el-menu-item-group>
              <el-menu-item index="3-1" @click="viewRotation">查看</el-menu-item>
              <el-menu-item index="3-2" @click="addRotation">新增</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-message"></i>我们最近的工作</template>
            <el-menu-item-group>
              <el-menu-item index="4-1" @click="viewLately">查看</el-menu-item>
              <el-menu-item index="4-2" @click="addLately">新增</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title"><i class="el-icon-message"></i>经验介绍</template>
            <el-menu-item-group>
              <el-menu-item index="5-1" @click="viewExperience">查看</el-menu-item>
              <el-menu-item index="5-2" @click="editExperience">新增</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="6">
            <template slot="title"><i class="el-icon-message"></i>目录管理</template>
            <el-menu-item-group>
              <el-menu-item index="6-1" @click="vewMenu">查看</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="7">
            <template slot="title"><i class="el-icon-message"></i>解决方案管理</template>
            <el-menu-item-group>
              <el-menu-item index="7-1" @click="vewArticle">查看</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

        </el-menu>
      </el-aside>
      <el-container>
        <el-header style="text-align: right; font-size: 15px">
          <el-dropdown>
            <a href=""><i style="margin-right: 15px" @click="logout">注销</i></a>
          </el-dropdown>
          <span>{{$store.state.adminName}}</span>
        </el-header>
        <el-main>
          <router-view :viewData="viewData" :tableHead="tableHead"/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        viewData:[],
        tableHead:[]
      }
    },
    methods:{
      //轮播图
      viewRotation(){
        this.$router.push('/rotation');
      },
      addRotation(){
        this.$router.push('/rotation/rot-edit');
      },
      addLately(){
        this.$router.push('/lately/lat-add');
      },
      viewLately(){
        this.$router.push('/lately/lat-list')
      },
      viewNav(){
        this.$router.push('/nav/nav-list')
      },
      editNav(){
        this.$router.push('/nav/nav-edit')
      },
      viewExperience(){
        this.$router.push('/exp/exp-list')
      },
      editExperience(){
        this.$router.push('/exp/exp-edit')
      },
      vewMenu(){
        this.$router.push('/menu/menu-edit')
      },
      vewArticle(){
        this.$router.push('/article/article-resolve')
      },
      logout(){
        console.log(1)
        this.$store.commit('updateToken',null);
        this.$store.commit('updateName',null);
        this.$router.push('/')
      }
    }
  };
</script>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>
