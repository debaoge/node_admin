<template>
    <div>
        <el-card class="box-card">
            <el-page-header title="用户管理" icon="" content="用户列表" />

            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="username" label="用户名" />
                <el-table-column label="头像">
                    <template #default="scope">
                        <div v-if="scope.row.avatar">
                            <el-avatar :size="50" :src="'http://localhost:3000' + scope.row.avatar"></el-avatar>
                        </div>
                        <div v-else>
                            <el-avatar :size="50"
                                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="角色">
                    <template #default="scope">
                        <el-tag v-if="scope.row.role === 1" class="m1-2" type="primary">
                            管理员
                        </el-tag>
                        <el-tag v-if="scope.row.role === 2" class="m1-2" type="success">
                            编辑
                        </el-tag>

                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button size="small" @click="handleEdit(scope.row)">
                            更改
                        </el-button>
                        <el-popconfirm title="确定要删除吗?" @confirm="handleDelete(scope.row)">
                            <template #reference>
                                <el-button size="small" type="danger">
                                    删除
                                </el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <el-dialog v-model="dialogVisible" title="编辑用户" width="50%">

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
            </el-form>

            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleEditConfirm">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>

    </div>
</template>
<script setup>
import { reactive, ref, onMounted } from 'vue';
import axios from 'axios';

onMounted(() => {
    getTableData()
})
const tableData = ref([])
const dialogVisible = ref(false)
const userFormRef = ref();

const userForm = ref({
    username: "",
    password: "",
    introduction: "",
    role: 2,    
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


const getTableData = async () => {
    const res = await axios.get('/adminapi/user/list')
    // console.log('Userlist: res: ', res);
    if (res.data.ActionType === 'OK') {
        tableData.value = res.data.data
    } else {
        ElMessage.error('读取失败：返回数据格式不正确');
    }
}

const handleEdit = async (data) => {
    console.log('handleEdit 选一个 编辑', data)
    dialogVisible.value = true
    const res = await axios.get(`adminapi/user/list/${data._id}`);
    userForm.value = res.data.data[0]
}

const handleEditConfirm = async () => {
    dialogVisible.value = false
    userFormRef.value.validate(async (valid)=>{
        if(valid){
            // console.log('popup fenster userform data: ', userForm.value);
            const res = await axios.put(`adminapi/user/list/${userForm.value._id}`, userForm.value);
        }
    })
    getTableData()
}

const handleDelete = async (data) => {
    // console.log('userlist 删除 id:', data._id)
    const res = await axios.delete(`/adminapi/user/list/${data._id}`)
    getTableData()

}
</script>