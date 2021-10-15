<template>
  <div class="home">
    <Head></Head>
    <Banner></Banner>
    <div>
      <br><br><br><br><br><br><br><br><br><br>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  //2
  import Head from '../components/Head'
  import Footer from '../components/Footer'
  import Banner from '../components/Banner'


export default {
  name: 'Home',
  components: {
    Head,
    Footer,
    Banner,
  },


}
</script>
