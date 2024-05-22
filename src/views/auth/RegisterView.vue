<template>
    <div class="register-box container">
        <h1 class="container-header">用户注册</h1>
        <div class="container-divder"></div>
        <t-form ref="form" :data="formData" :rules="rules" @reset="onReset" @submit="onSubmit" @validate="onValidate" :label-width="100">
            <t-form-item label="用户名" name="account" status-icon>
                <t-input class="input" v-model="formData.account"></t-input>
            </t-form-item>
        
            <t-form-item label="密码" name="password" status-icon>
                <t-input class="input" v-model="formData.password" type="password"></t-input>
            </t-form-item>
        
            <t-form-item label="确认密码" name="rePassword" status-icon>
                <t-input class="input" v-model="formData.rePassword" type="password"></t-input>
            </t-form-item>
        
            <t-form-item>
                <t-button 
                    theme="default" 
                    variant="base" 
                    block 
                    style="margin-right: 30px"
                    @click="() => router.push('/login')"
                >
                    返回登录
                </t-button>
                <t-button theme="primary" type="submit" style="margin-right: 48px" block>注册</t-button>
            </t-form-item>
        </t-form>
    </div>
    
</template>

<script setup>
import { ref, reactive } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { useRouter } from 'vue-router';
import axiosInstance from '@/services/axiosinstance';

const router = useRouter();

const form = ref(null);
const formData = reactive({
account: '',
password: '',
rePassword: '',
});

const onReset = () => {
MessagePlugin.success('重置成功');
};

const onSubmit = ({ validateResult, firstError, e }) => {
    e.preventDefault();
    if (validateResult === true) {
        const data = {
            username: formData.account,
            password: formData.password,
        };
        axiosInstance.post('/api/user/register', data).then((res) => {
            console.log(res);
            MessagePlugin.success('注册成功');
            setTimeout(() => {
                router.push('/login');
            }, 500);
        }).catch((err) => {
            console.log(err);
            MessagePlugin.error('注册失败');
        });
    } else {
        console.log('Validate Errors: ', firstError, validateResult);
        MessagePlugin.warning(firstError);
    }
};

const onValidate = ({ validateResult, firstError }) => {
if (validateResult === true) {
    console.log('Validate Success');
} else {
    console.log('Validate Errors: ', firstError, validateResult);
}
};

const rePassword = (val) =>
new Promise((resolve) => {
    const timer = setTimeout(() => {
    resolve(formData.password === val);
    clearTimeout(timer);
    });
});

const passwordValidator = (val) => {
if (val.length > 0 && val.length <= 6) {
    return { result: false, message: '太简单了！再开动一下你的小脑筋吧！', type: 'error' };
}
return { result: true,  type: 'success' };
};

const rules = {
account: [
    { required: true, message: '姓名必填', type: 'error' },
    {
    min: 2,
    message: '至少需要两个字',
    type: 'error',
    trigger: 'blur',
    },
],
password: [{ required: true, message: '密码必填', type: 'error' }, { validator: passwordValidator }],
rePassword: [
    // 自定义校验规则
    { required: true, message: '密码必填', type: 'error' },
    { validator: rePassword, message: '两次密码不一致' },
],
};

</script>

<style scoped>
.register-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.t-form{
  width: 60%;
}

.input {
  width: 358px;
}

@media screen and (max-width: 600px){
  .t-form{
    width: 80%;
  }
}
</style>

