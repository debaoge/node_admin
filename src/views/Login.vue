<template>
  <div class="form-container">
    <h3>企业门户网站管理系统</h3>
    <el-form :model="loginForm" :rules="rules" ref="loginFormRef" class="loginform">
      <el-form-item label="用户名" prop="username" class="custom-form-item">
        <el-input v-model="loginForm.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password" class="custom-form-item">
        <el-input v-model="loginForm.password" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="handleSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from 'axios';
import { ElMessage } from "element-plus";
import { useStore } from "vuex";

export default {
  setup() {
    const loginForm = reactive({
      username: "",
      password: "",
    });

    const rules = reactive({
      username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
      password: [{ required: true, message: "请输入密码", trigger: "blur" }],
    });

    const loginFormRef = ref();
    const router = useRouter();
    const loading = ref(false); // 加载状态
    const store = useStore();

    const handleSubmit = async () => {
      try {
        // 验证表单
        await loginFormRef.value.validate();
        loading.value = true; // 开始加载

        // 发送登录请求
        const res = await axios.post('/adminapi/user/login', loginForm);

        console.log('res.data.ActionType: ', res.data.ActionType);

        if (res.data.ActionType === "OK") {
          console.log('[Login] 从数据库得到的信息: username: ',res.data.data.username);
          store.commit("changeUserInfo", res.data.data)
          router.push("/index"); 
        } 
      } catch (error) {
        // 处理错误
        if (error.response) {
          // 服务器返回的错误
          ElMessage.error(error.response.data.error || '登录失败');
        } else {
          ElMessage.error('网络错误，请稍后重试');
        }
      } finally {
        loading.value = false; // 结束加载
      }
    };

    return { loginForm, rules, loginFormRef, handleSubmit, loading };
  },
};
</script>


<style lang="scss" scoped>
.form-container {
  width: 500px;
  height: 300px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: gray;
  text-align: center;
  padding: 20px;

  h3 {
    font-size: 30px;
    color: white;
  }

  .loginform {
    margin-top: 20px;
  }
}



.custom-form-item {
  display: flex;
  align-items: center;

  :deep(.el-form-item__label) {
    flex: 0 0 80px;
    /* 固定 label 宽度 */
    margin-right: 5px;
    /* 调整 label 和 input 之间的距离 */
    color: white;
  }

  :deep(.el-form-item__content) {
    margin-left: 5px !important;
    /* 调整 label 和 input 之间的距离 */
  }
}
</style>