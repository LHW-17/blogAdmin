<template>
    <div class="wraper">
        <div class="tag">
            <span>文章列表</span>
            <el-button @click="addArticle">添加文章</el-button>
        </div>
        <div class="select">
            <span>分类</span>
            <el-select v-model="selection.categoryId" class="m-2" placeholder="请选择" size="large">
                <el-option v-for="item in categoryOptions" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
            <span>标签</span>
            <el-input placeholder="请输入标签" v-model="selection.tag" />
            <span>状态</span>
            <el-select v-model="selection.state" class="m-2" placeholder="请选择" size="large">
                <el-option v-for="item in stateOptions" :key="item.value" :label="item.key" :value="item.value" />
            </el-select>
            <span>文章标题</span>
            <el-input placeholder="请输入标题关键词" v-model="selection.title" />
            <el-button type="primary" @click="searchArtcle">查询</el-button>
        </div>
        <div class="articleList">
            <el-table :data="articleList">
                <el-table-column prop="articleTitle" label="文章标题" width="180" align="center" />
                <el-table-column prop="cTitle" label="文章分类" width="180" align="center" />
                <el-table-column prop="tag" label="标签" align="center">
                    <template #default="scope">
                        <el-tag class="ml-2" type="success" v-for="(item, index) in scope.row.tag" :key="index">{{item}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" align="center" />
                <el-table-column prop="updateTime" label="更新时间" align="center" />
                <el-table-column label="操作" align="center">
                    <template #default="{row}">
                        <el-button type="primary" size="small" @click="editHandler(row)">编辑</el-button>
                        <el-button type="danger" size="small" @click="deleteArticle(row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

    </div>

</template>

<script lang='ts' setup>
import { ref, reactive, onBeforeMount, onMounted } from 'vue'
import { reqArticleList, reqCategory, reqDeleteArticle, reqSearchArticle } from "@/api"
import { ElMessage, ElMessageBox } from 'element-plus';
import { type } from 'os';
const props = defineProps(["changeModule"])
type listItem = {
    id: number,
    articleTitle: string,
    cTitle: string,
    categoryId: number,
    tag: string | string[],
    createTime: string,
    updateTime: string
}
const articleList = ref<Array<listItem>>()

const getArticleList = async () => {
    const res = await reqArticleList();
    if (res.code == 200) {
        articleList.value = res.data.data.map((item: listItem) => {
            item.tag = JSON.parse(item.tag as string);
            return item;
        });
    }
}
onBeforeMount(() => {
    getArticleList()
})
//选项数据
const stateOptions = [
    {
        key: "编辑中",
        value: 0
    },
    {
        key: "已发布",
        value: 1
    }
]
//分类数据
const categoryOptions = ref<Array<{ name: string, id: number }>>([]);

onMounted(async () => {
    let res = await reqCategory();
    if (res.code == 200) {
        categoryOptions.value = res.data;
    }
})
//编辑按键功能 触发父组件emit向add组件传递数据
const emit = defineEmits(["deliverAritcleId"]);
const editHandler = (row: listItem) => {
    emit("deliverAritcleId", row.id);
    props.changeModule(1);
}
//添加文章回调
const addArticle = () => {
    emit("deliverAritcleId", -1);
    props.changeModule(1);
}
//删除文章功能
const deleteArticle = (id: number) => {
    ElMessageBox.confirm("确认删除文章？", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
    }).then(async () => {
        let res = await reqDeleteArticle(id);
        console.log(res);
        if (res.code == 200) {
            ElMessage.success("删除成功");
            getArticleList();
        } else {
            ElMessage.error("失败");
        }
    }).catch(() => {
        ElMessage({
            type: 'info',
            message: '删除取消',
        })
    })

}

/*
    查询文章功能
 */
type Selection = {
    categoryId?: number,
    tag?: string,
    state?: number,
    title?: string
}
const selection = reactive<Selection>({
    tag: "",
    title: ""
})
//查询按钮回调
const searchArtcle = async () => {
    let res = await reqSearchArticle(selection)
    console.log(res);
}
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
        height: 7.5rem;
        overflow: auto;

        .el-tag {
            margin-left: .1rem;
        }
    }
}
</style>