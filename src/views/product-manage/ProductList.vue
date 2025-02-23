<template>
  <div>
    <el-card>
      <el-page-header title="产品管理" icon="" content="产品列表" />
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="产品名称" />
        <el-table-column prop="describe" label="简要概述" />
        <el-table-column label="产品图标">
                    <template #default="scope">
                        <div v-if="scope.row.cover">
                            <el-avatar :size="50" :src="'http://localhost:3001' + scope.row.cover"></el-avatar>
                        </div>
                        <div v-else>
                            <el-avatar :size="50"
                                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                        </div>
                    </template>
                </el-table-column>
        <el-table-column prop="editTime" label="更新时间">
          <template #default="scope">
            {{ formatTime.getTime(scope.row.editTime) }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" circle :icon="Edit" type="primary" @click="handleEdit(scope.row)"></el-button>
            <el-popconfirm title="确定要删除吗?" @confirm="handleDelete(scope.row)">
              <template #reference>
                <el-button size="small" circle :icon="Delete" type="danger"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="editDialogVisible" title="编辑产品" width="50%">
      <el-form ref="editFormRef" label-width="120px" :model="editForm">
        <el-form-item label="标题" prop="title">
          <el-input v-model="editForm.title" />
        </el-form-item>
        <el-form-item label="概要" prop="describe">
          <el-input type="textarea" v-model="editForm.describe" />
        </el-form-item>
        <el-form-item label="详细内容" prop="content">
          <el-input type="textarea" v-model="editForm.content" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleEditConfirm">确认</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import formatTime from '@/util/formatTime';
import axios from 'axios';
import { Edit, Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';


onMounted(() => {
    getTableData()
})

const tableData = ref([])
const editFormRef = ref(null)
const editForm = ref({
    title: '',
    describe: '',
    content: '',
    cover:'',
    editTime: ''
});

const editDialogVisible = ref(false)

const getTableData = async () => {
    const res = await axios.get('/adminapi/product/list')
    if (res.data.ActionType === 'OK') {
        // console.log('retrieve from DB: ', res.data.data);
        tableData.value = res.data.data.map(item => ({
            ...item,
            editTime: item.editTime || new Date().toISOString()  // 确保 editTime 不是 undefined
        }));
    } else {
        console.log('读取失败：返回数据格式不正确');
    }
}

const handleEdit = async (data) => {
    editDialogVisible.value = true
    const res = await axios.get(`/adminapi/product/list/${data._id}`);
    if (res.data.ActionType === 'OK') {
        Object.assign(editForm.value, res.data.data[0]); // 确保 Vue 响应式更新
    }
}

const handleDelete = async (data) => {
    await axios.delete(`/adminapi/product/list/${data._id}`)
    getTableData()
}

const handleEditConfirm = async () => {
    editFormRef.value.validate(async (valid) => {
        if (valid) {
            console.log('before update db, editForm value: ', editForm.value);
            
            const res = await axios.put(`/adminapi/product/list/${editForm.value._id}`, editForm.value);
            if (res.data.ActionType === 'OK') {
                ElMessage.success('更新成功')

                // 手动更新 tableData，让 Vue 监听到变化
                const index = tableData.value.findIndex(item => item._id === editForm.value._id);
                if (index !== -1) {
                    tableData.value[index] = { ...editForm.value, editTime: new Date().toISOString() };
                }
            }
        }
    });

    editDialogVisible.value = false;
}

</script>