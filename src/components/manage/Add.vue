<template>
    <div class="add">
        <div class="head">
            <div class="title">
                <span>文章标题</span>
                <el-input placeholder="请输入文章标题" v-model="articleState.title"></el-input>
                <el-button type="success" @click="submit">提交</el-button>
            </div>
            <div class="description">
                <span>文章描述</span>
                <el-input v-model="articleState.description" :rows="3" type="textarea" placeholder="请输入" />
                <div class="img">
                    <span>图片</span>
                    <el-input v-model="articleState.imgUrl" placeholder="请输入图片url" />
                </div>
            </div>
            <div class="select">
                <span>文章分类</span>
                <el-select v-model="articleState.categoryId" class="m-2" placeholder="请选择分类" size="large">
                    <el-option v-for="item in categoryOptions" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
                <span>文章状态</span>
                <el-select v-model="articleState.stateNum" class="m-2" placeholder="请选择文章状态" size="large">
                    <el-option label="已发布" :value="1" />
                    <el-option label="编辑中" :value="0" />
                </el-select>
            </div>
            <div class="tag">
                <span class="name">标签</span>
                <div>
                    <el-tag v-for="tag in articleState.tag" type="success" :key="tag" class="mx-1" closable size="large"
                        :disable-transitions="false" @close="handleClose(tag)">
                        {{ tag }}
                    </el-tag>
                    <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" class="ml-1 w-20" size="default"
                        @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" />
                    <el-button v-else class="button-new-tag ml-1" size="default" @click="showInput">
                        + 标签
                    </el-button>
                </div>
            </div>
        </div>
        <div class="article-content">
            <v-md-editor v-model="articleState.content" height="6rem" left-toolbar="
        undo redo clear | h bold italic strikethrough quote | ul ol table hr | link image code | emoji ">
            </v-md-editor>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { ElMessage } from 'element-plus';
import { reactive, ref, nextTick } from 'vue'
import { reqAddArticle } from "@/api"
import type { UploadProps } from 'element-plus'

type article = {
    title: string,
    description: string,
    categoryId: number,
    tag: Array<string>,
    imgUrl: string,
    content: string,
    stateNum: number
}
const articleState = ref<article>({
    title: "",
    description: "",
    categoryId: 0,
    imgUrl: "",
    tag: [],
    content: "",
    stateNum: 0
})
const categoryOptions = reactive([{
    name: "",
    id: 0
}])
//提交回调
const submit = async () => {
    if (articleState.value.title.trim() == "" || articleState.value.content.trim() == "" || articleState.value.categoryId == 0) {
        ElMessage.error("不能提交空文章")
    } else {
        let res = await reqAddArticle(articleState.value)
        if (res.code == 200) {
            ElMessage({
                type: "success",
                message: res.message
            });
        }
    }
}


//tag
const inputValue = ref('')
const inputVisible = ref(false)
const InputRef = ref()//<InstanceType<typeof ElInput>>

const handleClose = (tag: string) => {
    articleState.value.tag.splice(articleState.value.tag.indexOf(tag), 1)
}

const showInput = () => {
    inputVisible.value = true
    nextTick(() => {
        InputRef.value!.input!.focus()
    })
}

const handleInputConfirm = () => {
    if (inputValue.value) {
        articleState.value.tag.push(inputValue.value)
    }
    inputVisible.value = false
    inputValue.value = ''
}
//上传图片
</script>

<style scoped lang="scss">
.add {
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;

    .head {
        width: 100%;
        display: flex;
        flex-direction: column;

        .title {
            width: 100%;
            height: 1rem;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            margin-top: .2rem;
            position: relative;

            span {
                margin-left: .8rem;
                margin-right: .3rem;
                font-size: .25rem;
            }

            .el-input {
                width: 40%;
            }

            .el-button {
                position: absolute;
                right: 1rem;
            }
        }

        .description {
            display: flex;
            margin-bottom: .3rem;

            span {
                width: 1.2rem;
                margin-left: .8rem;
                margin-right: .3rem;
                font-size: .25rem;
            }

            .el-textarea {
                margin-left: -.2rem;
                width: 40%;
            }

            //上传样式
            .img {
                margin-left: 1.5rem;
                position: absolute;
                top: 2.7rem;
                right: 4rem;
                display: flex;
                align-items: center;
            }
        }

        .select {


            span {
                margin-left: .8rem;
                margin-right: .3rem;
                font-size: .25rem;
            }
        }

        .tag {
            margin-bottom: .4rem;
            margin-top: .2rem;
            display: flex;
            width: 100%;

            span.name {
                width: 1rem;
                margin-left: .8rem;
                margin-right: .3rem;
                font-size: .25rem;
            }

            div {
                margin-left: .1rem;
                width: 100%;

                .el-tag {
                    margin: 0 .1rem;

                }

                .el-input {
                    width: 2rem;
                }
            }
        }
    }
}
</style>
