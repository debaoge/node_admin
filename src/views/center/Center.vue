<template>
    <div>
        <el-page-header title="企业门户管理系统" icon="" content="个人中心"></el-page-header>
        <el-row :gutter="20" class="el-row">
            <el-col :span="8">
                <el-card class="box-card">
                    <el-avatar :size="100" :src="avatarUrl"></el-avatar>
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

                        <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="120px">
                            <el-form-item label="用户名">
                                <el-input v-model="userForm.username" />
                            </el-form-item>
                            <el-form-item label="性别">
                                <el-select v-model="userForm.gender" placeholder="Select" style="width: 100%">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label"
                                        :value="item.value" />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="个人简介">
                                <el-input type="textarea" v-model="userForm.introduction" />
                            </el-form-item>
                            <el-form-item label="头像">
                                <el-upload class="avatar-uploader"
                                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                                    :show-file-list="false" 
                                    :onchange="handleChange">
                                    <img v-if="avatarUrl" :src="avatarUrl" class="avatar" />
                                    <el-icon v-else class="avatar-uploader-icon">
                                        <Plus />
                                    </el-icon>
                                </el-upload>
                            </el-form-item>

                        </el-form>
                    </template>

                </el-card>

            </el-col>

        </el-row>
    </div>
</template>
<script setup>


import { computed } from 'vue';
import { useStore } from 'vuex';
import { reactive } from 'vue';
import { ref } from 'vue';

const store = useStore()
const avatarUrl = computed(() => store.state.userInfo.avatar ? store.state.userInfo.avatar
    : `https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png`)

const { username, gender, introduction, avatar } = store.state.userInfo

const userForm = reactive({
    username: '',
    gender: 0,
    avatar: "",
    introduction: ""
})
const userFormRef = ref()

const userFormRules = {
    username: [{ required: true, message: '输入名字', trigger: 'blur' },
    { min: 1, max: 25, message: 'Length shoule be 1 to 25', trigger: 'blur' }],
    introduction: [{ required: true, message: '输入个人介绍' },
    { min: 1, max: 125, message: 'Length shoule be 1 to 25', trigger: 'blur' }],
}

const options = [
    {
        value: '0',
        label: '保密',
    },
    {
        value: '1',
        label: '男',
    },
    {
        value: '2',
        label: '女',
    }
]
</script>

<style lang="scss" scoped>
.card_box {
    margin-top: 50px;
}

.el-row {
    margin-top: 20px;

    .box-card {
        text-align: center;
    }
}

::v-deep .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
::v-deep .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

::v-deep .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

::v-deep .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>