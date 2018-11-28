<template>
  <div class="hello">
    <h1>HOME</h1>
    <router-link to="board"> 게시판 </router-link>
    <br>
    <router-link to="vote"> 투표하기 </router-link>
    <br>
    <router-link to="login"> 로그인 </router-link>
    <br>
    <router-link to="voteList"> 투표목록 </router-link>
    <br>
    <router-link to="voteInfo"> 투표정보 </router-link>
    <br>
    <router-link to="candInfo"> 후보정보 </router-link>
    <br>
    <router-link to="winnerInfo"> 당선자정보 </router-link>
    <br>
    <router-link to="winnerList"> 당선자목록 </router-link>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
