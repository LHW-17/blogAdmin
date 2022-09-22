<template>
    <div>
        <top></top>
        <router-view></router-view>
    </div>
</template>

<script lang='ts' setup>
import { reactive, ref } from 'vue'
import Top from '../components/admin/Top.vue';
</script>

<style scoped lang="scss">
div {
    height: 100vh;
    width: 100vw;
    background-color: rgb(223, 223, 223);
    box-sizing: border-box;
    overflow: hidden;
}
</style>