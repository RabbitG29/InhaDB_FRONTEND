<template>
  <div class="container">
    <h1>VoteInfo</h1>
    <router-link :to="{ name: 'HelloWorld', params: {} }">홈으로</router-link>
    <br>
    <h2>선거 정보가 나열됨...</h2>
    <br>
    <router-link :to="{ name: 'CandInfo', params: {} }">후보1</router-link>
    <br>
    <router-link :to="{ name: 'CandInfo', params: {} }">후보2</router-link>
  </div>
</template>

<script>
export default {
  name: 'VoteInfo'
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
