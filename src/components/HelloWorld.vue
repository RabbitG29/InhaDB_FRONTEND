<template>
  <div class="hello">
    <h1>HOME</h1>
    <br>
    <h2>INHA Univ. Database Capstone Design</h2>
    <h2>Final Project 2018 Fall</h2>
    <br>
    <img src="./images/db.jpg">
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  computed: {
        isLogged: function() {
            return this.$store.getters.isLogged
        },
        getId() {
            return this.$store.getters.getId
        }
    },
  methods: {
        logOut: function() {
          this.$store.commit('logOut')
        }
    },
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
