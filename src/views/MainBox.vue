<template>
  <el-container class="layout-container">
    <!-- 左侧边栏 -->
    <el-aside class="aside-menu">
      <SideMenu />
    </el-aside>

    <!-- 右侧主内容区 -->
    <el-container direction="vertical" class="content-container">
      <!-- 顶部导航栏 -->
      <el-header class="top-header">
        <TopHeader />
      </el-header>

      <!-- 主内容 -->
      <el-main class="main-content">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import SideMenu from './mainbox/SideMenu.vue';
import TopHeader from './mainbox/TopHeader.vue';
</script>

<style scoped>
/* 确保 el-container 作为 flex 容器 */
.layout-container {
  display: flex;
  height: 100vh;
  /* 让其占满整个视口高度 */
}

/* 侧边栏固定宽度，防止缩小 */
.aside-menu {
  width: v-bind($store.state.isCollapsed ? '64px' : '200px');
  transition: width 0.3s ease;
  flex-shrink: 0;
  /* 防止被挤压 */
}

/* 右侧内容区：占满剩余空间 */
.content-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  /* 防止内容溢出 */
}

/* 顶部导航栏 */
.top-header {
  background-color: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  height: 60px;
  display: flex;
  align-items: center;
}

/* 主内容区 */
.main-content {
  padding: 20px;
  background-color: #f5f7fa;
  flex-grow: 1;
}
</style>