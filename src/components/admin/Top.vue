<template>
    <div class="top">
        <div class="left">
            <img class="logo" src="@/assets/images/logo.jpg" alt="echo">
            <span>My Blog</span>
        </div>
        <div class="middle">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#545c64"
                text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
                <el-menu-item index="1" @click="$router.push('/admin')">首页</el-menu-item>
                <el-menu-item index="2" @click="$router.push('/admin/manage')">控制台</el-menu-item>
            </el-menu>
        </div>
        <div class="right">
            <img class="logo" src="@/assets/images/logo.jpg" alt="echo">
            <el-dropdown>
                <span class="el-dropdown-link">
                    echo
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item> 退出登录 </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>

</template>

<script lang='ts' setup>
import { computed } from 'vue'
import { useRoute } from "vue-router"
import { ArrowDown } from '@element-plus/icons-vue'

const route = useRoute();
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const activeIndex = computed(() => {
    return route.path == "/admin" ? "1" : "2";
})
//跳转回调

</script>

<style scoped lang="scss">
* {
    margin: 0;
    padding: 0;
}

.top {
    width: 100%;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    background-color: #545c64;

    .left {
        width: 4rem;
        height: 100%;

        display: flex;
        align-items: center;

        img {
            width: .8rem;
            height: .8rem;
            border-radius: 50%;
            margin-left: .4rem;
        }

        span {
            margin-left: .2rem;
            font-size: .4rem;
            font-weight: 800;
            color: #fff;
        }
    }

    .right {
        width: 5rem;
        height: 100%;
        position: absolute;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;

        .el-dropdown {
            color: #fff;
            margin-left: .4rem;
        }

        .example-showcase .el-dropdown-link {
            cursor: pointer;
            color: var(--el-color-primary);
            display: flex;
            align-items: center;
        }

        img {
            width: .7rem;
            height: .7rem;
            border-radius: 50%;
            margin-left: .4rem;
        }
    }

    .middle {
        flex: 1;
        height: 100%;

        .el-menu {
            height: 100%;

            .el-menu-item {
                width: 1.6rem;
                margin-left: .4rem;
            }
        }
    }
}
</style>