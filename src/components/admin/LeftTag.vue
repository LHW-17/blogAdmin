<template>
    <!-- 侧边菜单栏 -->
    <el-menu default-active="1-1" class="el-menu-vertical-demo">
        <el-sub-menu index="1">
            <template #title>
                <el-icon>
                    <document />
                </el-icon>
                <span>文章管理</span>
            </template>
            <el-menu-item index="1-1" @click="changeModule(0)">文章列表</el-menu-item>
            <el-menu-item index="1-2" @click="centerDialogVisible = true">
                分类管理
            </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="2">
            <el-icon>
                <document />
            </el-icon>
            <template #title>用户管理</template>
        </el-menu-item>
        <el-menu-item index="3">
            <el-icon>
                <setting />
            </el-icon>
            <template #title>评论管理</template>
        </el-menu-item>
    </el-menu>
    <el-dialog v-model="centerDialogVisible" title="分类管理" width="30%" center>
        <div class="edit">
            <el-input v-model="newCategory"></el-input>
            <el-button size="default" @click="addCategory">添加分类</el-button>
        </div>
        <el-table :data="categoryData">
            <el-table-column label="分类名称" prop="name">
            </el-table-column>
            <el-table-column label="操作">
                <template #default="{$index}">
                    <el-button type="danger" size="small" @click="deleteCategory($index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="centerDialogVisible = false">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>
  
<script lang="ts" setup>
import {
    Document,
    Menu as IconMenu,
    Setting,
} from '@element-plus/icons-vue'
import { ElMenu, ElSubMenu, ElIcon, ElMenuItem, ElMessage } from "element-plus";
import { ref, reactive } from "vue"


const isCollapse = ref(false)
const props = defineProps(["changeModule"])
//添加分类
type category = {
    name: string,
    id?: number
}
const centerDialogVisible = ref(false)
const newCategory = ref('')
const categoryData = reactive<Array<category>>([])
const deletedCategoryId = reactive<Array<number>>([])
const addCategory = () => {
    if (newCategory.value.trim() == "") {
        ElMessage.error("分类名称不能为空");
        return
    }
    categoryData.push({ name: newCategory.value });
    newCategory.value = ""
}
const deleteCategory = (index: number) => {
    categoryData.splice(index, 1);
}
//按键回调


// const handleOpen = (key: string, keyPath: string[]) => {
//     // console.log(key, keyPath)
// }
// const handleClose = (key: string, keyPath: string[]) => {
//     // console.log(key, keyPath)
// }

</script>
  
<style scoped lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 3.3rem;
    min-width: 3.3rem;
    min-height: 8rem;
}

.el-menu {
    height: 100%;

    .el-menu-item,
    span {
        font-size: .22rem;
    }
}

.el-dialog {
    .edit {
        .el-input {
            width: 4rem;
            margin-right: .2rem;
        }
    }
}
</style>
  