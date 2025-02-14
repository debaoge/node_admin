<template>
  <div>
    <el-page-header title="企业门户管理系统" icon="" content="个人中心" />
    <el-row :gutter="20" class="el-row">
      <el-col :span="8">
        <el-card class="box-card">
          <el-avatar :size="100" :src="avatarUrl" />
          <h3>{{ store.state.userInfo.username }}</h3>
          <h5>{{ store.state.userInfo.role === 1 ? '管理员' : '编辑' }}</h5>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>个人信息</span>
            </div>
          </template>
          <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="120px">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="userForm.username" />
            </el-form-item>
            <el-form-item label="性别" prop="gender">
              <el-select v-model="userForm.gender" placeholder="请选择" style="width: 100%">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="个人简介" prop="introduction">
              <el-input type="textarea" v-model="userForm.introduction" />
            </el-form-item>
            <el-form-item label="头像" prop="avatar">
              <el-upload
                class="avatar-uploader"
                :show-file-list="false"
                :on-change="handleChange"
                :auto-upload="false"
              >
                <img v-if="userForm.avatar" :src="avatarUrl" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon">
                  <Plus />
                </el-icon>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSubmit">更新</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { Plus } from '@element-plus/icons-vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';

const store = useStore();
const userFormRef = ref();

const { username, gender, introduction, avatar } = store.state.userInfo;
const userForm = reactive({
  username,
  gender,
  avatar,
  introduction,
  file:null
});

const userFormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 1, max: 25, message: '用户名长度应为 1 到 25 个字符', trigger: 'blur' },
  ],
  introduction: [
    { required: true, message: '请输入个人介绍', trigger: 'blur' },
    { min: 1, max: 125, message: '个人介绍长度应为 1 到 125 个字符', trigger: 'blur' },
  ],
};

const options = [
  { value: '0', label: '保密' },
  { value: '1', label: '男' },
  { value: '2', label: '女' },
];

const avatarUrl = computed(() => store.state.userInfo.avatar 
? 'http://localhost:3000'+store.state.userInfo.avatar
: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png');

const handleChange = (file) => {
  if (file.raw) {
    const reader = new FileReader();
    reader.onload = (e) => {
      userForm.avatar = e.target.result; 
    };
    reader.readAsDataURL(file.raw);
    userForm.file = file.raw
  }
};

const handleSubmit = () => {
  userFormRef.value.validate((valid) => {
    if (valid) {
      console.log('表单验证通过，提交数据:', userForm);
      const params = new FormData()
      for(let i in userForm){
        params.append(i,userForm[i])
      }
      console.log('发送到后端: ', params);
      
      axios.post("/adminapi/user/upload", params, {
        headers: {
            "Content-Type":"multipart/form-data"
        }
      }).then(res=>{
        console.log(res.data);
        if(res.data.ActionType === "OK"){
          store.commit("changeUserInfo", res.data.data)
          ElMessage.success("更新成功")
        }
      })
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

:deep(.avatar-uploader .avatar) {
  width: 178px;
  height: 178px;
  display: block;
}

:deep(.avatar-uploader .el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

:deep(.avatar-uploader .el-upload:hover) {
  border-color: var(--el-color-primary);
}

:deep(.el-icon.avatar-uploader-icon) {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>