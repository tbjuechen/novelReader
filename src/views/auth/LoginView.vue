<template>
  <div class='login-box container'>
    <h1 class="container-header">用户登录</h1>
    <div class="container-divder"></div>
    <t-form  ref="formRef" :data="formData" :colon="true" :label-width="0" @reset="onReset" @submit="onSubmit">
      <t-form-item name="account">
        <t-input v-model="formData.username" clearable placeholder="请输入账户名">
          <template #prefix-icon>
            <desktop-icon />
          </template>
        </t-input>
      </t-form-item>

      <t-form-item name="password">
        <t-input v-model="formData.password" type="password" clearable placeholder="请输入密码">
          <template #prefix-icon>
            <lock-on-icon />
          </template>
        </t-input>
      </t-form-item>

      <t-form-item>
        <t-button class='button' theme="default" style="margin-right: 30px;" @click="turnToRegister" block>注册</t-button>
        <t-button class='button' theme="primary" type="submit" block>登录</t-button>
      </t-form-item>
    </t-form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next';
import { DesktopIcon, LockOnIcon } from 'tdesign-icons-vue-next';
import axiosInstance from '@/services/axiosinstance';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

let formData = reactive({
  username: '',
  password: ''
})

const router = useRouter();

const formRef = ref(null);

const onSubmit = ({ validateResult, firstError }) => {
  if (validateResult === true) {
    axiosInstance.post('/api/user/login', 
      new URLSearchParams(formData), 
      { header:{
        'Content-Type': 'application/x-www-form-urlencoded'
      }}).then((res) => {
        console.log(res);
        MessagePlugin.success('登录成功');
        // console.log(res.data.access_token);
        localStorage.setItem('token', res.data.access_token);
        setTimeout(() => {
          router.push('/');
        }, 500);
      }).catch((err) => {
        console.log(err);
        console.log(formRef)
        if (err.response.status === 400) {
          MessagePlugin.error('登录失败：密码错误');
        } else if (err.response.status === 404) {
          MessagePlugin.error('登陆失败：用户不存在');
        } else {
          MessagePlugin.error('登录失败：未知错误');
        }
        setTimeout(() => {
          formRef.value.reset();
        }, 100);
      });
  } else {
    console.log('Validate Errors: ', firstError, validateResult);
    MessagePlugin.warning(firstError);
  }
};

function turnToRegister() {
  router.push('/register');
}

</script>

<style scoped>
.login-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.t-form{
  width: 40%;
}


@media screen and (max-width: 600px){
  .t-form{
    width: 80%;
  }
}
</style>