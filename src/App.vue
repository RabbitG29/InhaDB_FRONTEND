<template>
  <div id="app">
    <div id="header">
            <div id="login-box">
                <div id="login-menu">
                    <div id="sidebar-toggle" @click="sidebar =! sidebar" :class="sidebar?'open':''">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <router-link v-if="!isLogged" to="Login"> 로그인 </router-link>

                    <span v-else>
                        <a href="" @click="logOut"> 로그아웃 </a>
                        <router-link to="MyPage"> 마이페이지 </router-link>
                        <router-link v-if="isEc != 0" :to="{ name: 'ECPage', params: { voteid: isEc } }"> {{isEc}}회 선관위페이지 </router-link>
                        <a v-if="isCand != 0"> {{isCand}}회 후보자 </a>
                    </span>
                </div>
            </div>
            <div class="header">
                <div class="container">
                    <div class="row">
                        <div class=" col-sm-4 col-xs-4 container">
                            <div id="navigation">
                                  <h2><router-link to="/">정보통신공학과 선거</router-link></h2>
                            </div>
                        </div>
                        <div id="nav-menu" class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <app-menu-navigation/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
        isLogged: function() {
            return this.$store.getters.isLogged
        },
        getId() {
            return this.$store.getters.getId
        },
        getName() {
            return this.$store.getters.getName
        },
        isCand() {
          return this.$store.getters.getCand
        },
        isEc() {
          return this.$store.getters.getEc
        }
    },
    watch: {
        $route: function() {
            this.sidebar = false;
        }
    },
    methods: {
        logOut: function() {
            this.$store.commit('logOut')
        }
    },
    data(){
        return {
            sidebar: false,
             cand: '',
             ec: ''
        }
    }
}
</script>

<style>
@import './assets/noty.css';
@import '../node_modules/vue-wysiwyg/dist/vueWysiwyg.css';
@import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
@font-face {
  font-family: 'NanumGothic' ;
  src:url(//fonts.gstatic.com/ea/nanumgothic/v5/NanumGothic-Regular.eot);
  src:url(//fonts.gstatic.com/ea/nanumgothic/v5/NanumGothic-Regular.eot?#iefix) format('embedded-opentype'),
      url(//fonts.gstatic.com/ea/nanumgothic/v5/NanumGothic-Regular.woff2) format('woff2'),
      url(//fonts.gstatic.com/ea/nanumgothic/v5/NanumGothic-Regular.woff) format('woff'),
      url(//fonts.gstatic.com/ea/nanumgothic/v5/NanumGothic-Regular.ttf) format('truetype');
  font-weight : normal;
  font-style : normal;
}
div {
 font-family: 'NanumGothic';
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
<style scoped>
@media (min-width: 999px){
    #nav-menu {
        display: inline-block;
    }
}

@media (max-width: 1000px){
    #nav-menu {
        display: none;
    }
}
#login-box {
    position: fixed;
    z-index: 10000;
    width: 100%;
    height: 30px;
    background-color: #BBDEFB;
}
#login-menu {
    float: right;
    margin-right: 10px;
    margin-bottom: 5px;
    font-size: 15px;
    display: relative;
    color: black;
    z-index: 10;
}
a {
    margin-left: 5px;
}
#login-menu a {
    color: black;
}

#main-menu {
    background: white;
}

#main-menu a {
    box-sizing: border-box;
    width: 110px;
    color: black;
    background: white;
}
.header {
    background-color: #fff;
    z-index: 99;
    position: relative;
    padding-top: 80px;
    padding-bottom: 20px;
}
</style>
