<template>
  <div class="container">
    <!-->TODO : 로그인되지 않았거나 이미 투표한 경우 페이지 들어오지 못하도록<!-->
    <h1>{{this.voteid}}회 선거 투표하기</h1>
    <div id="board">
      <div class="board-box">
      <div class="row form-group">
        <div class="col-sm-10"></div>
        <div class="col-sm-2" >
        </div>
      </div>
      <div class="row">
          <!-- print list -->
          <table class="table table-striped">
            <thead>
               <tr class="text-center">
                <th class="text-center" scope="col">선거회차</th>
                <th class="text-center">후보 기호</th>
                <th class="text-center">정후보 이름</th>
                <th class="text-center">부후보 이름</th>
                <th class="text-center">투표하기</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="index">
                <td scope="col">{{item.선거회차}}회 선거</td>
                <td>{{item.기호}}번 후보</td>
                <td>{{item.정후보이름}}</td>
                <td>{{item.부후보이름}}</td>
                <button v-on:click="vote" align="center">투표</button>
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
  name: 'Vote',
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
    vote: function() {
      alert("투표되었습니다")
      //TODO : 투표했을 경우 선거 정보의 투표수 1 증가, 득표 정보의 득표수 1 증가, 학생참여투표의 투표여부 true
      this.$router.push("/") // 홈으로
    },
    getData: function() {
      var url = this.$config.targetURL+'/vote/candInfo/'+this.voteid;
      this.$http.get(url)
      .then(result=>{
        console.log(result)
        this.list = JSON.parse(result.data.result)
        console.log(this.list)
      })
      .catch(err=>{
        console.log("error")
      })
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
</style>
