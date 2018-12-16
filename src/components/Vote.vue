<template>
  <div class="container">
    <h1>Vote</h1>
    <router-link :to="{ name: 'HelloWorld', params: {} }">홈으로</router-link>
    <h2>투표...</h2>
  </div>
</template>

<script>
export default {
  name: 'Vote'
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
