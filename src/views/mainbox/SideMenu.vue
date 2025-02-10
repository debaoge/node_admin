<template>
    <el-aside :width="$store.state.isCollapsed ? '64px' : '200px'">
      <el-menu
        default-active="1"
        class="el-menu-vertical"
        :collapse="$store.state.isCollapsed"
        :router="true"
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
          <el-menu-item index="/mainbox/user-manage/adduser" >添加用户</el-menu-item>
          <el-menu-item index="/mainbox/user-manage/userlist">用户列表</el-menu-item>
        </el-sub-menu>
      
        <el-sub-menu index="product-manage">
          <template #title>
            <el-icon><Histogram /></el-icon>
            <span>产品管理</span>
          </template>
          <el-menu-item index="/mainbox/product-manage/addproduct">添加产品</el-menu-item>
          <el-menu-item index="/mainbox/product-manage/productlist">产品列表</el-menu-item>
        </el-sub-menu>
      
        <el-sub-menu index="news-manage">
          <template #title>
            <el-icon><Promotion /></el-icon>
            <span>新闻管理</span>
          </template>
          <el-menu-item index="/mainbox/news-manage/addnews">添加产品</el-menu-item>
          <el-menu-item index="/mainbox/news-manage/newslist">产品列表</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
  </template>
  
  <script setup>
  import { Histogram, UserFilled, HomeFilled, Avatar, Promotion } from "@element-plus/icons-vue";
  
  </script>
  
  <style scoped>
  .el-menu-vertical {
    width: 100%;
    height: 100vh;
    background-color: white;
    border-right: 1px solid #e6e6e6;
  }
  
  </style>
  