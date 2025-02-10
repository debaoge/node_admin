<template>
  <el-header>
    <div class="left">
      <el-icon @click="toggelMenu">
        <Menu />
      </el-icon>
      <span style="margin-left: 10px;">企业门户网站管理系统</span>
    </div>
    <div class="right">
      <span>欢迎 ad 回来</span>
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon :size="28" color="white">
            <User />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleCenter">个人中心</el-dropdown-item>
            <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

  </el-header>
</template>

<script setup>

import { useStore } from 'vuex';
import { computed } from 'vue';

import { User, Menu } from "@element-plus/icons-vue";
import router from '@/router';


const store = useStore()
const isCollapse = computed(
  () => store.state.isCollapsed);


const toggelMenu = () => {
  store.commit("changeIsCollapsed", !isCollapse.value)
}
const handleCenter = ()=>{
  router.push("/center")
}
const handleLogout = ()=>{
  localStorage.removeItem("token");
  router.push("/index")
}
</script>
<style>
.el-header {
  background-color: gray;
  color: white;
  width: 100%;
  height: 60px;
  line-height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
}
.left, .right{
  display: flex;
  cursor: pointer;
}
.left{
  i{
    margin: auto;
  }
}
.right{
  .el-dropdown{
    margin: auto;
  }
}
</style>