<template>
    <div class="wraper">
        <div class="tag">
            <span>文章列表</span>
            <el-button @click="changeModule(1)">添加文章</el-button>
        </div>
        <div class="select">
            <span>分类</span>
            <el-select v-model="selection.category" class="m-2" placeholder="请选择" size="large">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <span>标签</span>
            <el-select v-model="selection.tag" class="m-2" placeholder="请选择" size="large">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <span>状态</span>
            <el-select v-model="selection.state" class="m-2" placeholder="请选择" size="large">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <span>文章标题</span>
            <el-input placeholder="请输入标题关键词" />
            <el-button type="primary">查询</el-button>
        </div>
        <div class="articleList">
            <el-table :data="tableData">
                <el-table-column prop="title" label="文章标题" width="180" align="center" />
                <el-table-column prop="category" label="文章分类" width="180" align="center" />
                <el-table-column prop="tag" label="标签" align="center">
                    <template #default="scope">
                        <el-tag class="ml-2" type="success" v-for="(item, index) in scope.row.tag" :key="index">{{item}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" align="center" />
                <el-table-column prop="updateTime" label="更新时间" align="center" />
                <el-table-column label="操作" align="center">
                    <template #default>
                        <el-button type="primary" size="small">编辑</el-button>
                        <el-button type="danger" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>

</template>

<script lang='ts' setup>
import { ref, reactive } from 'vue'

const props = defineProps(["changeModule"])
const selection = reactive({
    category: "",
    tag: "",
    state: "",
    title: ""
})

const options = [
    {
        value: 'Option1',
        label: 'Option1',
    },
    {
        value: 'Option2',
        label: 'Option2',
    },
    {
        value: 'Option3',
        label: 'Option3',
    },
    {
        value: 'Option4',
        label: 'Option4',
    },
    {
        value: 'Option5',
        label: 'Option5',
    },
]
const tableData = [
    {
        title: "flak京东方",
        category: "前端",
        tag: ["faksld", "asdfa"],
        createTime: "fasdfasd",
        updateTime: "fdsafsdf",
    },
    {
        title: "flak京东方",
        category: "前端",
        tag: ["faksld", "asdfa"],
        createTime: "fasdfasd",
        updateTime: "fdsafsdf",
    },
    {
        title: "flak京东方",
        category: "前端",
        tag: ["faksld", "asdfa"],
        createTime: "fasdfasd",
        updateTime: "fdsafsdf",
    },
    {
        title: "flak京东方",
        category: "前端",
        tag: ["faksld", "asdfa"],
        createTime: "fasdfasd",
        updateTime: "fdsafsdf",
    },
]
</script>

<style scoped lang="scss">
.wraper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;

    .tag {
        height: 1rem;
        width: 100%;
        padding: 0 .4rem;
        box-sizing: border-box;
        border-bottom: 1px solid #ccc;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .select {
        width: 100%;
        height: 1.5rem;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;

        .el-select {
            width: 2.5rem;
        }

        span {
            font-size: .25rem;
            margin: 0 .2rem;
        }

        .el-input {
            width: 4rem;
            height: 40px;

            input {
                height: 40px;
            }
        }

        .el-button {
            margin: 0 .2rem;
        }
    }

    .articleList {
        width: 100%;

        .el-tag {
            margin-left: .1rem;
        }
    }
}
</style>