<template>
  <div class="container">
    <h1>Winner Info</h1>
    <router-link :to="{ name: 'HelloWorld', params: {} }">홈으로</router-link>
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
