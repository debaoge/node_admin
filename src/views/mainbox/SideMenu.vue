<template>
    <el-aside width="200px">
      <el-menu
        default-active="1"
        class="el-menu-vertical"
        :collapse="isCollapsed"
      >
        <!-- 直接的菜单项 -->
        <el-menu-item index="/home">
            <el-icon><HomeFilled /></el-icon>
            <span>首页</span>
        </el-menu-item>
        
        <el-menu-item index="/center">
            <el-icon><UserFilled /></el-icon>
            <span>个人中心</span>
        </el-menu-item>
       
        <el-sub-menu index="/user-manage">
          <template #title>
            <el-icon><Avatar /></el-icon>
            <span>用户管理</span>
          </template>
          <el-menu-item index="/user-manage/adduser">添加用户</el-menu-item>
          <el-menu-item index="/user-manage/userlist">用户列表</el-menu-item>
        </el-sub-menu>
      
        <el-sub-menu index="/product-manage">
          <template #title>
            <el-icon><Histogram /></el-icon>
            <span>产品管理</span>
          </template>
          <el-menu-item index="/product-manage/addproduct">添加产品</el-menu-item>
          <el-menu-item index="/product-manage/productlist">产品列表</el-menu-item>
        </el-sub-menu>
      
        <el-sub-menu index="/news-manage">
          <template #title>
            <el-icon><Promotion /></el-icon>
            <span>新闻管理</span>
          </template>
          <el-menu-item index="/news-manage/addnews">添加产品</el-menu-item>
          <el-menu-item index="/news-manage/newslist">产品列表</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { Menu as IconMenu,Histogram, UserFilled, HomeFilled, Avatar, Promotion } from "@element-plus/icons-vue";
  
  const isCollapsed = ref(false);
  </script>
  
  <style scoped>
  .el-menu-vertical {
    width: 100%;
    height: 100vh;
    background-color: white;
    border-right: 1px solid #e6e6e6;
  }
  
  </style>
  