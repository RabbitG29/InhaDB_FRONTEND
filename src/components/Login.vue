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
  name: 'Login'
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
