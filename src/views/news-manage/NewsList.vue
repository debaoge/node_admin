<template>
    <div>
        <el-card>
            <el-page-header title="新闻管理" icon="" content="新闻列表" />
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="title" label="标题" />
                <el-table-column prop="category" label="分类" >
                    <template #default="scope">
                        {{ categoryFormat(scope.row.category) }}
                    </template>
                </el-table-column>
                <el-table-column prop="editTime" label="更新时间" >
                    <template #default="scope">
                        {{ formatTime.getTime(scope.row.editTime) }}
                    </template>
                </el-table-column>
                <el-table-column prop="isPublish" label="是否发布" >
                    <template #default="scope">
                        <el-switch size="small" 
                        @change="handleSwitchChange(scope.row)"
                        v-model="scope.row.isPublish" 
                        :active-value="1" 
                        :inactive-value="0"/>
                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button size="small" circle :icon="Star" type="success" @click="handlePreview(scope.row)"></el-button>
                        <el-button size="small" circle :icon="Edit" type="primary"  @click="handleEdit(scope.row)"></el-button>
                        <el-button size="small" circle :icon="Delete" type="danger"  @click="handleDelete(scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <el-dialog v-model="dialogVisible" title="预览新闻" width="70%">
            <div>
                <h2>{{ previewData.title }}</h2>
                <div style="color: gray; size: 12px;">{{ formatTime.getTime(previewData.editTime) }}</div>
                <el-divider>
      <el-icon><star-filled /></el-icon>
    </el-divider>
                <div class="htmlcontent" v-html="previewData.content"</div>
            </div>
        </el-dialog>
    </div>
</template>

<script setup>

import { reactive, ref, onMounted } from 'vue';
import { defineProps } from 'vue';
import axios from 'axios';
import formatTime from '@/util/formatTime';
import {Star, Edit, Delete, StarFilled} from '@element-plus/icons-vue'


onMounted(() => {
    getTableData()
})
const tableData = ref([])
const previewData = ref({})
const dialogVisible = ref(false)

const getTableData = async () => {
    const res = await axios.get('/adminapi/news/list')
    console.log('newslist: res: ', res);
    if (res.data.ActionType === 'OK') {
        tableData.value = res.data.data
    } else {
        console.log('读取失败：返回数据格式不正确');
    }
}

const categoryFormat = (data) => {
    switch (data) {
        case 1:
            return '最新动态';
        case 2:
            return '典型案例';
        case 3:
            return '通知公告';
        default:
            return '未知'; 
    }
};

const handleSwitchChange = async (row)=>{
    console.log(row._id, row.isPublish);
    const res = await axios.put(`adminapi/news/publish`,{_id:row._id, isPublish: row.isPublish});
    getTableData()
}

const handlePreview = (data)=>{
    previewData.value = data
    dialogVisible.value = true
}

const handleEdit = async (data) => {
    console.log('handleEdit 选一个 编辑', data)
    // const res = await axios.get(`adminapi/news/list/${data._id}`);
    // userForm.value = res.data.data[0]
}

const handleDelete = async (data) => {
    //  console.log('newslist 删除 id:', data._id)
    const res = await axios.delete(`/adminapi/news/list/${data._id}`)
    getTableData()

}
</script>
<style lang="scss" scoped>
::v-deep .htmlcontent{
    img{
        max-width: 100%;
    }
}
</style>