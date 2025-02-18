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
  avatar: [String, File], // 允许 avatar 既是 String 也可以是 File
});

const emit = defineEmits(['update-avatar']); // 定义事件，用于向父组件传递新头像

// 计算属性，动态返回头像 URL
const avatarUrl = computed(() => {
  if (!props.avatar) {
    return 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'; // 默认图片
  }

  if (typeof props.avatar === 'string') {
    if (props.avatar.startsWith('data:image')) {
      return props.avatar;
    }
    return 'http://localhost:3000' + props.avatar;
  }

  if (props.avatar instanceof File) {
    return URL.createObjectURL(props.avatar);
  }

  return 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'; // 保险起见，返回默认图片
});

// 处理文件变化
const handleChange = (file) => {
  if (file.raw) {
    emit('update-avatar', file.raw); // 直接传递 `File` 对象
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