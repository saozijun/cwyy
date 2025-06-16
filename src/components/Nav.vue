<template>
    <div class="nav">
        <div class="back">
            <div @click="back(backText)" v-if="isBack">
                <img src="../assets/back.png" alt="">
                <span>{{ backText }}</span>
            </div>
        </div>
        <div class="title">{{ title }}</div>
        <div class="right-icon">
            <slot name="right">
                <div class="right-nav">
                    <img src="../assets/more.png" alt="">
                </div>
            </slot>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const back = () => {
    if (window.history.length > 1) router.back();
    else router.push('/')
}

defineProps({
    title: {
        type: String,
        default: ''
    },
    isBack: {
        type: Boolean,
        default: true
    },
    backText: {
        type: String,
        default: ''
    }
})

</script>

<style lang="scss" scoped>
@use "@/assets/mixin.scss" as *;

.nav {
    display: flex;
    align-items: center;
    background-color: #f8fcffc7;
    backdrop-filter: blur(10px);
    position: sticky;
    top: 0;
    color: #2c3e50;
    min-height: 42px;
    padding: 10px 0;
    z-index: 11;

    .right-icon {
        min-width: 100px;
        text-align: right;
        padding: 0 18px;
    }

    .back {
        min-width: 100px;
        height: 100%;
        padding-left: 5px;
        >div {
            width: 100%;
            height: 100%;
            padding: 0 10px;
            display: flex;
            align-items: center;
            gap: 3px;
            font-size: 16px;
        }
        img{
            width: 16px;
        }
    }

    .title {
        font-size: 16px;
        font-weight: 600;
        flex: 1;
        text-align: center;
        @include ellipsis(1);
    }
    .right-nav{
        display: flex;
        align-items: center;
        justify-content: end;
    }
    .right-nav img{
        width: 28px;
    }
}
</style>
