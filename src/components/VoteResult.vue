<template>
  <div class="container">
    <h1>{{this.voteid}}회 선거 결과</h1>
    <a href="#" class="btn btn-secondary" style="float:right cursor: pointer" @click="goBack">뒤로가기</a>
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
                <th class="text-center" scope="col">득표 순위</th>
                <th class="text-center">후보 기호</th>
                <th class="text-center">정후보 이름</th>
                <th class="text-center">부후보 이름</th>
                <th class="text-center">득표수(득표율)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="index">
                <td scope="col">{{item.득표순위}}위</td>
                <td>
                  <router-link :to="{ name: 'CandInfo', params: {vote_num: voteid, candi_num: item.기호 } }">{{item.기호}}번 후보</router-link>
                </td>
                <td>{{item.정후보이름}}</td>
                <td>{{item.부후보이름}}</td>
                <td>{{item.득표수}}({{item.득표율*100}}%)</td>
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
  name: 'VoteResult',
  data() {
    return {
      msg: '선거결과',
      list: [],
      list2: [],
      voteid: ''
    }
  },
  mounted: function(){
    this.msg = ''
    this.voteid = this.$route.params.voteid
    console.log('현재 선거 회차 : '+this.voteid)
    this.getData()
  },
  methods: {
    getData: function() {
      var url1 = this.$config.targetURL+'/vote/result/'+this.voteid;
      this.$http.get(url1)
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
</style>
