<template>
  <div class="container">
    <h1>Candidate</h1>
    <router-link :to="{ name: 'HelloWorld', params: {} }">홈으로</router-link>
    <h2>후보 이름들 및 정보...</h2>
    <br>
    <h2>후보 공약들...</h2>
  </div>
</template>

<script>
export default {
  name: 'CandInfo'
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
