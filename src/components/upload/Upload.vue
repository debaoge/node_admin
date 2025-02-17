<template>
    <el-upload
      class="avatar-uploader"
      :show-file-list="false"
      action=""
      :on-change="handleChange"
      :auto-upload="false"
    >
      <img v-if="avatarUrl" :src="avatarUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon">
        <Plus />
      </el-icon>
    </el-upload>
  </template>
  
  <script setup>
  import { defineProps, defineEmits, computed } from 'vue';
  import { Plus } from '@element-plus/icons-vue';
  
  const props = defineProps({
    avatar: String, // 接收父组件传递的 avatar
  });
  
  const emit = defineEmits(['update-avatar']); // 定义事件，用于向父组件传递新头像
  
  // 计算属性，动态返回头像 URL
  const avatarUrl = computed(() => {
    if (props.avatar) {
      // 如果 avatar 是 base64 数据（新上传的图片），直接返回
      if (props.avatar.startsWith('data:image')) {
        return props.avatar;
      }
      // 否则返回服务器上的图片路径
      return 'http://localhost:3000' + props.avatar;
    }
    // 默认图片
    return 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png';
  });
  
  // 处理文件上传
  const handleChange = (file) => {
    if (file.raw) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newAvatar = e.target.result; // 获取 base64 图片数据
        emit('update-avatar', newAvatar); // 触发事件，将新头像传递给父组件
      };
      reader.readAsDataURL(file.raw);
    }
  };
  </script>
  
  <style scoped>
  .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  
  .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }
  
  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }
  
  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
  </style>