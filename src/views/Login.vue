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
        <el-button type="primary" @click="handleSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from 'axios'

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
    const router = useRouter()
    const handleSubmit = () => {
      loginFormRef.value.validate((valid) => {
        if (valid) {
          console.log(loginForm);
          localStorage.setItem("token", "login-token");
          axios.get('/users')
            .then(response => console.log(response.data))
            .catch(error => console.error(error));
          router.push('/index')
        }
      });
    };

    return { loginForm, rules, loginFormRef, handleSubmit };
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