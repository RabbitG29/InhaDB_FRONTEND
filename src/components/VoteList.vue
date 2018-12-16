<template>
  <div class="container">
    <h1>VoteList</h1>
    <router-link :to="{ name: 'HelloWorld', params: {} }">홈으로</router-link>
    <br>
    <router-link :to="{ name: 'VoteInfo', params: {} }">목록1</router-link>
    <router-link :to="{ name: 'Vote', params: {} }">투표하기</router-link>
    <br>
    <router-link :to="{ name: 'VoteInfo', params: {} }">목록2</router-link>
    <br>
  </div>
</template>

<script>
export default {
  name: 'VoteList'
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
