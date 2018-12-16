<template>
  <div class="container">
    <h1>{{this.voteid}}회 선거 후보 등록</h1>
    <br>
    <div class="col-sm-4" style="margin: 0 auto;">
    <form>
        <div class="form-group">
            <label for="id">정후보</label>
            <input class="form-control" id="id" aria-describedby="emailHelp" placeholder="정후보학번" v-model="Jid">
            <input type="password" class="form-control" id="password" placeholder="정후보 비밀번호" v-model="Jpassword">
        </div>
        <div class="form-group">
          <label for="id">부후보</label>
          <input class="form-control" id="id" aria-describedby="emailHelp" placeholder="부후보학번" v-model="Bid">
          <input type="password" class="form-control" id="password" placeholder="부후보 비밀번호" v-model="Bpassword">
          <br>
          <small id="emailHelp" class="form-text text-muted">선관위 승인 후 정식 등록이 완료됩니다.</small>
        </div>
        <button class="btn btn-primary" @click.prevent="submit">후보 등록</button>
    </form>
  </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterCand',
  data() {
    return {
      msg: '후보등록',
      list: [],
      voteid: ''
    }
  },
  mounted: function() {
    this.voteid=this.$route.params.voteid
    console.log("mounted")
    this.getData()
  },
  methods: {
    getData: function() {
      //TODO : 학생 비밀번호 확인하기
    },
    submit: function(){
      //TODO : 제출하면 후보에 등록
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
.rank {
  background-color: rgb(240,240,240);
  font-size: 1.1em;
}
h3 {
  margin: 20px;
}
</style>
