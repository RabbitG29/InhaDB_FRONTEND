<template>
  <div class="login container" style="text-align: center;">
    <div class="" style="">
        <div v-show="!isLogged" class="col-sm-4" style="margin: 0 auto;">
          <h1>LOGIN</h1>
          <router-link :to="{ name: 'HelloWorld', params: {} }">홈으로</router-link>
            <form>
                <div class="form-group">
                    <label for="id">학번</label>
                    <input class="form-control" id="id" aria-describedby="emailHelp" placeholder="Enter ID" v-model="id">
                    <small id="emailHelp" class="form-text text-muted"></small>
                </div>
                <div class="form-group">
                    <label for="password">비밀번호</label>
                    <input type="password" class="form-control" id="password" placeholder="Password" v-model="password">
                    <small id="emailHelp" class="form-text text-muted">초기비밀번호는 학번입니다.</small>
                </div>
                <button class="btn btn-primary" @click.prevent="submit">로그인</button>
            </form>
        </div>
    </div>
   <div v-show="isLogged">
        <meta http-http-equiv="refresh" content="0;url=/">
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      id: '',
      password: '',
      name: '',
      password: ''
    }
  },
  computed: {
    isLogged () {
        return this.$store.getters.isLogged
    }
  },
  methods: {
      logIn(data){
        console.log("commit")
        console.log(data.ec)
          console.log(data.cand)
          this.$store.commit('logIn', {
              id: this.id,
              password: this.password,
              cand: data.cand,
              ec: data.ec
          })
      },
      submit: function(){
          this.$http.get(this.$config.targetURL+`/login?id=${this.id}&password=${this.password}`)
          .then((result)=>{
              if(result.data.status == 'success'){ // 로그인 성공
                  console.log('success')
                  if(result.data.token == 'email'){ // 이메일 인증이 아직 안된경우
                      this.$router.push({
                          name: 'EmailAuth',
                          query: {
                              id: this.id
                          }
                      })
                  }
                  else {
                    console.log(result.data)
                    this.logIn(result.data)
                    this.$notice({
                        type: 'success',
                        text: '무사히 로그인 성공!',
                    })
                    this.$router.push("/")
                  }
              }
              else {
                console.log('error')
                    this.$notice({
                        type: 'alert',
                        text: '로그인 정보가 올바르지 않습니다'
                    })
              }
            })
          .catch((error)=>{
            console.log('server success')
            this.$notice({
                type: 'alert',
                text: '서버에 오류가 있습니다.'
            })
          })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
