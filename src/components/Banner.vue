<template>

  <div id="banner">
      <el-carousel height="400px">
          <el-carousel-item v-for="item in banner_list" >
            <router-link :to="item.link">
              <img :src="item.img" :alt="item.name">
            </router-link>

          </el-carousel-item>
      </el-carousel>

  </div>

</template>

<script>
export default {
  name: "Banner",

  data(){
    return {
      banner_list: []
    }
  },

  created(){
    this.$axios.get(this.$settings.base_url+'/home/banner/').then(response=>{
      this.banner_list = response.data
      console.log()
    }).catch(errors=>{})
  }
}
</script>

<style scoped>
  .el-carousel__item {
          height: 400px;
          min-width: 1200px;
      }
      .el-carousel__item img {
          height: 400px;
          margin-left: calc(50% - 1920px / 2);
      }
</style>