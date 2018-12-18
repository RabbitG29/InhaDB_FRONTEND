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
      voteid: '',
      Jid: '',
      Jpassword: '',
      Bid: '',
      Bpassword: '',
      ok1: '',
      ok2: ''
    }
  },
  mounted: function() {
    this.voteid=this.$route.params.voteid
    console.log("mounted")
  },
  methods: {
    submit: function(){
      //정후보 확인
      this.$http.get(this.$config.targetURL+`/login?id=${this.Jid}&password=${this.Jpassword}`)
      .then((result)=>{
          if(result.data.status == 'success'){ // 성공
              console.log('success')
              console.log(result.data)
              this.ok1=1;
          }
          else {
            console.log('error')
            alert("정후보 정보가 올바르지 않습니다.")
            this.$router.go(0)
          }
        })
      .catch((error)=>{
        console.log('서버에러')
      })
      //부후보 확인
      this.$http.get(this.$config.targetURL+`/login?id=${this.Bid}&password=${this.Bpassword}`)
      .then((result)=>{
          if(result.data.status == 'success'){ // 성공
              console.log('success')
              console.log(result.data)
              this.ok2=1;
          }
          else {
            console.log('error')
            alert("부후보 정보가 올바르지 않습니다.")
            this.$router.go(0)
          }
        })
      .catch((error)=>{
        console.log('서버에러')
      })
      //TODO : 제출하면 후보에 등록
      var json = {
        voteid: this.voteid,
        jid: this.Jid,
        bid: this.Bid
      }
      this.$http.post(this.$config.targetURL+'/vote/candInfo/register',json)
      .then((reslt)=>{
        this.$notice({
          type: 'success',
          text: '후보 등록이 완료되었습니다.'
        })
        this.$router.go(-1)
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
.rank {
  background-color: rgb(240,240,240);
  font-size: 1.1em;
}
h3 {
  margin: 20px;
}
</style>
