<template>
    <div>
        <el-page-header title="新闻管理" icon="" content="创建新闻" />
        <el-form ref="newsFormRef" :model="newsForm" :rules="newsFormRules" label-width="120px">
            <el-form-item label="标题" prop="title">
                <el-input v-model="newsForm.title" />
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <editor @event="handleChange"></editor>
            </el-form-item>
            <el-form-item label="类别" prop="category">
                <el-select v-model="newsForm.category" style="width: 100%">
                    <el-option v-for="item in options" :key="item.value" 
                    :label="item.label" 
                    :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="封面" prop="cover">
                <Upload :avatar="newsForm.cover" @update-avatar="handleUpdateAvatar" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSubmit">添加新闻</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue';
import editor from '@/components/editor/Editor.vue';
import Upload from '@/components/upload/Upload.vue';
import upload from '@/util/upload';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

const router = useRouter(); 
const newsFormRef = ref()

const newsForm = reactive({
    title: "",
    content: "",
    category: 1, //1 动态 2案例 3通知公告
    cover: "",//图片
    isPublish: 0 //未发布 1 已经发布 
})
const newsFormRules = reactive({
    title: [{ required: true, message: "请输入标题", trigger: "blur" }],
    content: [{ required: true, message: "请输入内容", trigger: "blur" }],
    category: [{ required: true, message: "请输入类别", trigger: "blur" }],
})

const handleChange = (data) => {
    // console.log('NewsAdd 子传父 ', data);
    newsForm.content = data
}

const options = [
    { value: 1, label: '最新动态' },
    { value: 2, label: '案例' },
    { value: 3, label: '通知公告' },
];

const handleUpdateAvatar = (newAvatar) => {
  newsForm.cover = newAvatar; 
};


const handleSubmit = async () => {
  newsFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        console.log('提交的数据:', newsForm); 
        const res = await upload('/adminapi/news/add', newsForm);
        console.log('服务器返回的数据:', res); 

        if (res.ActionType === 'OK') {
          ElMessage.success('添加成功');
          router.push('/mainbox/news-manage/newslist');
        } else {
          console.log('ActionType is undefined:', res.data);
        }
      } catch (error) {
        console.error('请求失败:', error); 
      }
    } else {
      console.log('表单验证失败');
    }
  });
};

</script>
<style lang="scss" scoped>
.el-form {
    margin-top: 40px;
}
</style>