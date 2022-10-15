<template>
    <div class="layout">
        <el-container>
            <el-header><span>admin</span></el-header>
            <el-main>
                <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px"
                    class="demo-ruleForm">
                    <el-form-item label="账户" prop="account">
                        <el-input v-model="ruleForm.account" type="text" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
                    </el-form-item>
                    <el-form-item class="button">
                        <el-button type="primary" @click="submitForm(ruleFormRef, ruleForm)">登录</el-button>
                        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-main>
        </el-container>
    </div>
</template>
  
<script lang="ts" setup>
import { ElContainer, ElForm, ElMain, ElFormItem, ElInput, ElHeader, ElButton, ElMessage } from "element-plus"
import type { FormInstance } from 'element-plus'
import { Ref, ref, reactive } from "vue"
import { useRouter } from "vue-router";
import { reqLogin } from "@/api"
const router = useRouter();

type loginRes = {
    code: number,
    message: string,
    token: string
}
type loginRule = {
    account: string,
    password: string
}
//表单数据
const ruleForm = reactive<loginRule>({
    account: '',
    password: '',
})
//校验账号
const checkAccount = (rule: any, value: any, callback: any) => {
    if (!value) {
        return callback(new Error('请输入账号'))
    }
    callback()
}
//校验密码
const validatePassword = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    } else {
        if (ruleForm.password !== '') {
            if (!ruleFormRef.value) return
            ruleFormRef.value.validateField('password', () => null)
        }
        callback()
    }
}
//表单校验
const rules = reactive({
    account: [{ validator: checkAccount, trigger: 'blur' }],
    password: [{ validator: validatePassword, trigger: 'blur' }],
})
const ruleFormRef = ref<FormInstance>()
//登录按键回调
const submitForm = (formEl: FormInstance | undefined, ruleForm: loginRule) => {
    if (!formEl) return;
    const reqData = {
        account: ruleForm.account,
        password: ruleForm.password,
    }
    formEl.validate(async (valid) => {
        if (valid) {
            const res = await reqLogin(reqData);
            const { code, token } = res as loginRes;
            if (code == 200) {
                window.localStorage.setItem("token", token);
                ElMessage.success("登录成功");
                router.push("/admin");
            } else {
                ElMessage.error("登录失败");
                return false;
            }
        } else {
            ElMessage.error("失败")
            return false
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
}
</script>
<style lang="scss">
* {
    margin: 0;
    padding: 0;
}

.layout {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    background: url(@/assets/images/loginBgImg5.jpg);

    .el-container {
        width: 8rem;
        height: 4rem;
        border-radius: .5rem;
        flex: 0 1 auto;
        background-color: #ccc;
        display: flex;
        align-items: center;
        justify-content: center;


        .el-header {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: .6rem;
        }

        .el-main {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-start;

            .el-form {
                width: 100%;
                display: flex;
                flex-direction: column;

                .el-form-item {
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    .el-input {
                        width: 70%;
                    }
                }

                .button {
                    .el-form-item__content {
                        margin-left: 0 !important;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                }
            }
        }
    }
}
</style>