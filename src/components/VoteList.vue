<template>
  <div class="container">
    <h1>VoteList</h1>
    <a href="#" class="btn btn-secondary" style="float:right cursor: pointer" @click="goBack">뒤로가기</a>
    <div id="board">
      <div class="board-box">
      <div class="row form-group">
        <div class="col-sm-10"></div>
        <div class="col-sm-2" >
        </div>
      </div>
      <div class="row">
          <!-- print meeting log list -->
          <table class="table table-striped">
            <thead>
               <tr class="text-center">
                <th class="text-center" scope="col">선거회차</th>
                <th class="text-center">투표수</th>
                <th class="text-center">투표율</th>
                <th class="text-center">투표진행여부</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="index">
                <td scope="col">
                  <router-link :to="{ name: 'VoteInfo', params: { voteid: item.선거회차 } }">{{item.선거회차}}회 선거</router-link>
                </td>
                <td>{{item.투표수}}</td>
                <td>{{item.투표율*100}}%</td>
                <td v-if="now.isAfter(item.투표마감일시)&&item.투표율>=0.4">
                  <router-link :to="{ name: 'VoteResult', params: {voteid: item.선거회차} }">투표마감(당선)결과</router-link>
                </td>
                <td v-if="now.isAfter(item.투표마감일시)&&item.투표율<0.4">마감(무효)</td>
                <td v-if="now.isAfter(item.투표개시일시)&&now.isBefore(item.투표마감일시)">
                  <router-link v-if="isLogged" :to="{ name: 'Vote', params: {voteid: item.선거회차} }">투표중(투표하기)</router-link>
                  <a v-if="!isLogged">투표중</a>
                </td>
                <td v-if="now.isAfter(item.후보등록마감일시)&&now.isBefore(item.투표개시일시)">후보등록마감</td>
                <td v-if="now.isAfter(item.후보등록시작일시)&&now.isBefore(item.후보등록마감일시)">
                  <router-link v-if="isLogged" :to="{ name: 'RegitserCand', params: {voteid: item.선거회차} }">후보등록중(후보등록하기)</router-link>
                  <a v-if="!isLogged">후보등록중</a>
                </td>
                <td v-if="now.isBefore(item.후보등록시작일시)">후보등록 시작 예정</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VoteList',
  data() {
    return {
      msg: '투표목록',
      list: [],
      now: this.$moment().tz('Asia/Seoul'),
      voteid: ''
    }
  },
  mounted: function() {
    console.log("mounted")
    this.getData()


  },
  methods: {
    getData: function() {
      var url = this.$config.targetURL+'/vote';
      this.$http.get(url)
      .then(result=>{
        console.log(result)
        this.list = JSON.parse(result.data.result)
        console.log(this.list)
      })
      .catch(err=>{
        console.log("error")
      })
    },
    goBack: function(){
      this.$router.go(-1)
    }
  }
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
.board-box{
  margin-left: 150px;
  margin-right: 150px;
  margin-top: 10px;
  margin-bottom: 50px;
}
.card{
  text-align:left;
  width: 18rem;
  border: 1px solid grey;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom:10px;
}
#board {
  width: 100%;
}
@media (min-width: 999px){
    #board {
        display: inline-block;
    }
    #mobile-board{
        display: none;
    }
}

@media (max-width: 1000px){
    #board {
        display: none;
    }
    #mobile-board{
        display: inline-block;
    }
}
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
div, thead, tbody {
 font-family: 'NanumGothic';
}
</style>
