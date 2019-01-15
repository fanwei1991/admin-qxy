<template>
  <div class="home">
    <el-header class="header">
      <el-row>
        <el-col :span="6">
          <h2 class="logo">趣学园管理后台</h2>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" ref="aside" :width="asideWidth">
        <el-menu
          :default-active="defaultActive"
          :default-openeds="defaultOpen"
          :unique-opened="true"
          :collapse="isCollapse"
          class="el-menu"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu v-for="(item, index) in navList" :key="index" :index="item.index.slice(1)">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.navName}}</span>
            </template>
            <el-menu-item v-for="(itm, ind) in item.child" :key="ind" :index="itm.path">{{itm.name}}</el-menu-item>
          </el-submenu>
        </el-menu>
        <el-button class="btn-toggle" size="small" type="info" :icon="btnIcon" @click="menuToggle"></el-button>
      </el-aside>
      <el-main style="padding: 10px">
        <div class="main-content">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'home',
  data () {
    return {
      defaultActive: this.$route.path, // 默认激活菜单
      defaultOpen: ['/' + this.$route.path.split('/')[0]],
      navList: [],
      btnIcon: 'el-icon-d-arrow-left',
      isCollapse: false,
      asideWidth: '200px'
    }
  },
  created () {
    this.defaultActive = '/' + this.$route.path.split('/').slice(1, 3).join('/')
    // 获取路由配置信息
    let routes = this.$router.options.routes
    // 遍历导航列表
    routes.forEach((item, index) => {
      if (item.children) {
        let itemData = {
          navName: item.meta.navName,
          index: item.path,
          child: []
        }
        routes[index].children.forEach((itm, ind) => {
          if (itm.meta && itm.meta.isNav) {
            itemData.child.push({
              path: item.path + '/' + itm.path,
              name: itm.meta.title
            })
          }
        })
        this.navList.push(itemData)
      }
    })
  },
  methods: {
    handleSelect (index) {
      console.log(index)
      this.$router.push(index)
    },

    menuToggle () {
      this.isCollapse = !this.isCollapse
      if (this.isCollapse) {
        this.btnIcon = 'el-icon-d-arrow-right'
        this.asideWidth = '64px'
      } else {
        this.btnIcon = 'el-icon-d-arrow-left'
        this.asideWidth = '200px'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .home {
    .header {
      background-color: #3e4750;
      line-height: 60px;
      color: #fff;
    }

    .aside {
      background: #4d555d;
      min-height: calc(100vh - 60px);
      box-sizing: border-box;
      border-right: 1px solid #e6e6e6;
      max-width: 200px !important;
      transition: width ease .4s;
      position: relative;
      .el-menu {
        border-right: 0;
      }
      .btn-toggle {
        position: absolute;
        left: 50%;
        bottom: 20px;
        transform: translateX(-50%);
      }
    }

    .main-content {
      box-sizing: border-box;
      border: 1px solid #e6e6e6;
      min-height: 100%;
      border-radius: 4px;
      padding: 10px;
      box-shadow: 0 0 8px rgba(193, 176, 178, 0.6);
      &:hover {
        box-shadow: 0 0 12px rgba(193, 176, 178, 1);
      }
    }
  }
</style>
