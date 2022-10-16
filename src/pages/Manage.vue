<template>
    <div class="content">
        <LeftTag :changeModule="changeModule" />
        <component :is="moduleList[currentModule]" class="block" :changeModule="changeModule" :data="emitData"
            @deliverAritcleId="onDeliver">
        </component>
    </div>
</template>

<script lang='ts' setup>
import LeftTag from '@/components/admin/LeftTag.vue';
import AritcleList from '@/components/manage/AritcleList.vue';
import Add from '@/components/manage/Add.vue';
import { ref } from "vue"

const moduleList = [AritcleList, Add]
const currentModule = ref(0)
const changeModule = (index: number) => {
    currentModule.value = index;
}
//向add组件传递的数据
const emitData = ref(-1)
const onDeliver = (id: number) => {
    emitData.value = id;
}
</script>

<style scoped lang="scss">
.content {
    width: 100%;
    display: flex;

    .block {
        width: 100%;
        background-color: #fff;
        margin: .1rem;
        box-sizing: border-box;
    }
}
</style>