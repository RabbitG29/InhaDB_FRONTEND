<template>
  <div class="container">
    <h1>Winner Info</h1>
    <router-link :to="{ name: 'HelloWorld', params: {} }">홈으로</router-link>
    <br>
    <h2>당선자 정보들.....</h2>
    <br>
    <h2>실시 공약들...</h2>
    <br>
    <h2>실시 사업들...</h2>
  </div>
</template>

<script>
export default {
  name: 'WinnerInfo'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.rank {
  background-color: rgb(240,240,240);
  font-size: 1.1em;
}
h3 {
  margin: 20px;
}
</style>
