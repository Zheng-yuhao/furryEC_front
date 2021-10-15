<template>
    <div class="login">
    <span @click="close_login">X</span>
    </div>
</template>

<script>
    export default {
        name: "Login",
        methods:{
            close_login(){
                //子传父组件 this.$emit,给父组件传递一个事件
                this.$emit("close")
            },

        },

    }
</script>

<style scoped>
.login{
    width: 100vw;
    height: 100vw;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 666;
    background-color: rgba(0,0,0,0.4);
}
    span{
        font-size: 30px;
        cursor: pointer;
    }
</style>