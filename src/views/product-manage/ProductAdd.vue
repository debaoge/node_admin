<template>
    <div>
        <el-page-header title="产品管理" icon="" content="添加产品" />

        <el-form ref="productFormRef" :model="productForm" :rules="productFormRules" label-width="120px">
            <el-form-item label="产品名称" prop="title">
                <el-input v-model="productForm.title" />
            </el-form-item>
            <el-form-item label="简要描述" prop="describe">
                <el-input type="textarea" v-model="productForm.describe" />
            </el-form-item>
            <el-form-item label="详细描述" prop="content">
                <el-input type="textarea" v-model="productForm.content" />
            </el-form-item>
                        <el-form-item label="产品图片" prop="cover">
                <Upload :avatar="productForm.cover" @update-avatar="handleUpdateAvatar" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSubmit">添加产品</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>

import { reactive, ref } from 'vue';
import Upload from '@/components/upload/Upload.vue';
import upload from '@/util/upload';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

const router = useRouter(); 
const productFormRef = ref()
const productForm = reactive({
    title:'',
    describe:'',
    content:'',
    cover:''
})

const productFormRules = {
    title: [
        { required: true, message: '请输入产品名称', trigger: 'blur' },
        { min: 1, max: 125, message: '长度应为 1 到 125 个字符', trigger: 'blur' },
    ],
    describe: [
        { required: true, message: '请输入产品描述', trigger: 'blur' },
        { min: 1, max: 125, message: '长度应为 1 到 125 个字符', trigger: 'blur' },
    ],
    content: [
        { required: true, message: '请输入产品详情', trigger: 'blur' },
        { min: 1, max: 125, message: '长度应为 1 到 1250 个字符', trigger: 'blur' },
    ],
};

const handleUpdateAvatar = (newAvatar) => {
  productForm.cover = newAvatar; 
};

const handleSubmit = async () => {
  productFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        console.log('提交的数据:', productForm); 
        const res = await upload('/adminapi/product/add', productForm);
        console.log('服务器返回的数据:', res); 

        if (res.ActionType === 'OK') {
          ElMessage.success('添加成功');
          router.push('/mainbox/product-manage/productlist');
        } else {
          console.log('ActionType is undefined:', res.data);
        }
      } catch (error) {
        console.error('请求失败:', error); 
      }
    } 
  });
};


</script>
<style lang="scss" scoped>
.el-form {
    margin-top: 40px;
}
</style>