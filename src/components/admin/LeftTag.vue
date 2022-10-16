<template>
    <!-- 侧边菜单栏 -->
    <el-menu :default-active="activeMenu" class="el-menu-vertical-demo">
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
    <el-dialog v-model="centerDialogVisible" title="分类管理" width="30%" center @open="dialogOpenCallback"
        @close="closeEffect">
        <div class="edit">
            <el-input v-model="newCategory"></el-input>
            <el-button size="default" @click="addCategory">添加分类</el-button>
        </div>
        <el-table :data="categoryData" align="center">
            <el-table-column label="分类名称" prop="title">
            </el-table-column>
            <el-table-column label="操作">
                <template #default="{row, $index}">
                    <el-button type="danger" size="small" @click="deleteCategory(row,$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="saveEdit">确认</el-button>
            </span>
        </template>
    </el-dialog>
    <div class="transparent" ref="trigger">123</div>
</template>
  
<script lang="ts" setup>
import {
    Document,
    Menu as IconMenu,
    Setting,
} from '@element-plus/icons-vue'
import { ElMenu, ElSubMenu, ElIcon, ElMenuItem, ElMessage } from "element-plus";
import { ref, nextTick, watch } from "vue"
import { reqCategory, reqDeleteCategory, reqAddCategory } from "@/api"

const isCollapse = ref(false)
const props = defineProps(["changeModule"])
//添加分类
type category = {
    title: string,
    id?: number,
    isDeleted?: number
}
const centerDialogVisible = ref(false)
const newCategory = ref('')
const categoryData = ref<Array<category>>([])
//监听dialog，改变当前选中的menu
const activeMenu = ref("1-1");
const trigger = ref();
const closeEffect = () => {
    activeMenu.value = "";
    trigger.value.style.visibility = "visible";
    nextTick(() => {
        activeMenu.value = "1-1"
        trigger.value.style.visibility = "hidden";
    })
}
const addCategory = () => {
    if (newCategory.value.trim() == "") {
        ElMessage.error("分类名称不能为空");
        return
    }
    categoryData.value.push({ title: newCategory.value });
    newCategory.value = ""
}
//删除分类回调
const deleteCategory = async (row: category, index: number) => {
    // console.log(row);
    if (row.id) {
        let res = await reqDeleteCategory(row.id);
        if (res.code == 200) {
            let result = await reqCategory();
            if (result.code == 200) {
                // console.log(result);
                categoryData.value = result.data;
            }
        } else {
            ElMessage.error(res.message);
        }
        console.log(categoryData);

    } else {
        categoryData.value.splice(index, 1);
    }
}
//分类管理打开时回调
const dialogOpenCallback = async () => {
    let res = await reqCategory();
    if (res.code == 200) {
        categoryData.value = res.data;
    }
    // console.log(categoryData);
}
const saveEdit = async () => {
    let res = await reqAddCategory(categoryData.value);
    if (res.code == 200) {
        centerDialogVisible.value = false;
        ElMessage.success("成功")
    } else {
        ElMessage.error("保存失败")
    }
}
</script>
  
<style scoped lang="scss">
.transparent {
    position: absolute;
    visibility: hidden;
}

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
  