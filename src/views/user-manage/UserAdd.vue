<template>
    <div>
        <el-page-header title="用户管理" icon="" content="添加用户" />

        <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="120px">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="userForm.username" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="userForm.password" />
            </el-form-item>
            <el-form-item label="角色" prop="role">
                <el-select v-model="userForm.role" placeholder="请选择" style="width: 100%">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="个人简介" prop="introduction">
                <el-input type="textarea" v-model="userForm.introduction" />
            </el-form-item>
            <el-form-item label="头像" prop="avatar">
                <!-- 将 avatar 和更新逻辑传递给子组件 -->
                <Upload :avatar="userForm.avatar" @update-avatar="handleUpdateAvatar" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSubmit">创建用户</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';
import upload from '@/util/upload';
import Upload from '@/components/upload/Upload.vue';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();
const userFormRef = ref();

const userForm = reactive({
    username: "",
    password: "",
    gender: 0,
    role: 2,
    avatar: "",
    introduction: "",
    file: null,
});

const userFormRules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 1, max: 25, message: '用户名长度应为 1 到 25 个字符', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 1, max: 25, message: '用户名长度应为 1 到 25 个字符', trigger: 'blur' },
    ],
    introduction: [
        { required: true, message: '请输入个人介绍', trigger: 'blur' },
        { min: 1, max: 125, message: '个人介绍长度应为 1 到 125 个字符', trigger: 'blur' },
    ],
};

const options = [
    { value: 1, label: '管理员' },
    { value: 2, label: '编辑' },
];


// 处理子组件传递的新头像
const handleUpdateAvatar = (newAvatar) => {
    userForm.avatar = newAvatar; // 更新父组件的 avatar
};

const handleSubmit = async () => {
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        console.log('提交的数据:', userForm); // 打印提交的数据
        const res = await upload('/adminapi/user/add', userForm);
        console.log('服务器返回的数据:', res); // 打印服务器返回的数据

        if (res.ActionType === 'OK') {
          store.commit('changeUserInfo', res.data);
        
          ElMessage.success('创建成功');
          router.push('/mainbox/user-manage/userlist');
        } else {
          console.log('ActionType is undefined:', res.data);
          ElMessage.error('创建失败：返回数据格式不正确');
        }
      } catch (error) {
        console.error('请求失败:', error); // 打印错误信息
        ElMessage.error('请求失败，请检查网络或服务器状态');
      }
    } else {
      console.log('表单验证失败');
    }
  });
};
</script>

<style lang="scss" scoped>
.el-row {
    margin-top: 20px;

    .box-card {
        text-align: center;
        padding: 20px;
    }
}
</style>
