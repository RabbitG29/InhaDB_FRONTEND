<template>
  <div class="container">
    <h1>{{this.voteid}}회 선거 정보</h1>
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
                <th class="text-center" scope="col">선거회차</th>
                <th class="text-center">후보 등록 기간</th>
                <th class="text-center">투표 기간</th>
                <th class="text-center">투표수(투표율)</th>
                <th class="text-center">현재 상태</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="index">
                <td scope="col">{{item.선거회차}}회 선거</td>
                <td>{{item.후보등록시작일시.format('YYYY년M월D일 H:M')}}~{{item.후보등록마감일시.format('YYYY년M월D일 H:M')}}</td>
                <td>{{item.투표개시일시.format('YYYY년M월D일 H:M')}}~{{item.투표마감일시.format('YYYY년M월D일 H:M')}}</td>
                <td>{{item.투표수}}({{item.투표율*100}})</td>
                <td v-if="now.isAfter(item.투표마감일시)&&item.투표율>=0.4">마감(당선)</td>
                <td v-if="now.isAfter(item.투표마감일시)&&item.투표율<0.4">마감(무효)</td>
                <td v-if="now.isAfter(item.투표개시일시)&&now.isBefore(item.투표마감일시)">
                  투표중
                </td>
                <td v-if="now.isAfter(item.후보등록마감일시)&&now.isBefore(item.투표개시일시)">후보등록마감</td>
                <td v-if="now.isAfter(item.후보등록시작일시)&&now.isBefore(item.후보등록마감일시)">
                  후보등록중
                </td>
                <td v-if="now.isBefore(item.후보등록시작일시)">후보등록 시작 예정</td>

              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <br>
    <h2>{{this.voteid}}회 선거 후보자 명단</h2>
    <br>
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
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list2" :key="index">
                <td scope="col">{{item.선거회차}}회 선거</td>
                <td>
                  <router-link :to="{ name: 'CandInfo', params: {vote_num: voteid, candi_num: item.기호 } }">{{item.기호}}번 후보</router-link>
                </td>
                <td>{{item.정후보이름}}</td>
                <td>{{item.부후보이름}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default { //vote_num이랑 candi_num 넘겨줘야 함
  name: 'VoteInfo',
  data() {
    return {
      msg: '선거정보',
      list: [],
      list2: [],
      now: this.$moment().tz('Asia/Seoul'),
      voteid: ''
    }
  },
  mounted: function(){
    this.msg = ''
    this.voteid = this.$route.params.voteid
    console.log('현재 선거 회차 : '+this.voteid)
    this.getData()
    this.getData2()
  },
  methods: {
    getData: function() {
      var url = this.$config.targetURL+'/vote/info/'+this.voteid;
      this.$http.get(url)
      .then(result=>{
        console.log(result)
        this.list = JSON.parse(result.data.result)
        console.log(this.list)
        this.list.forEach(v=>{
          var dateinfo = v.후보등록시작일시
          var dateinfo2 = v.후보등록마감일시
          var dateinfo3 = v.투표개시일시
          var dateinfo4 = v.투표마감일시
          v.후보등록시작일시 = this.$moment(dateinfo).tz('Asia/Seoul')
          v.후보등록마감일시 = this.$moment(dateinfo2).tz('Asia/Seoul')
          v.투표개시일시 = this.$moment(dateinfo3).tz('Asia/Seoul')
          v.투표마감일시 = this.$moment(dateinfo4).tz('Asia/Seoul')
        })
      })
      .catch(err=>{
        console.log("error")
      })
    },
    getData2: function() {
      var url2 = this.$config.targetURL+'/vote/candInfo/'+this.voteid;
      this.$http.get(url2)
      .then(result=>{
        console.log(result)
        this.list2 = JSON.parse(result.data.result)
        console.log(this.list2)
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
