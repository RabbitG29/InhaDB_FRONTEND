<template>
  <div>
    <div class="container">
      <h4> {{this.voteid}}회 후보자 정보</h4>
      <a href="#" class="btn btn-primary" style="float:right cursor: pointer" @click="updateRank">득표 순위 갱신</a>
      <br>
      <br>
      <h5> 승인된 후보자 목록 </h5>
      <div class="board-box">
        <div class="row">
          <div class="col-sm-10"></div>
          <table class="table table-striped">
            <thead>
              <tr class="text-center">
                <th scope="col" class="text-center">선거회차</th>
                <th scope="col" class="text-center">기호</th>
                <th scope="col" class="text-center">정후보이름</th>
                <th scope="col" class="text-center">부후보이름</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in list" class="text-center">
                  <td>{{item.선거회차}}</td>
                  <td>{{item.기호}}</td>
                  <td>{{item.정후보이름}}</td>
                  <td>{{item.부후보이름}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <br>
      <h5> 승인 대기 중인 후보 </h5>
      <div class="board-box">
        <div class="row">
          <div class="col-sm-10"></div>
          <table class="table table-striped">
            <thead>
              <tr class="text-center">
                <th scope="col" class="text-center">선거회차</th>
                <th scope="col" class="text-center">기호</th>
                <th scope="col" class="text-center">정후보이름</th>
                <th scope="col" class="text-center">부후보이름</th>
                <th scope="col" class="text-center">승인여부</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item2 in list2" class="text-center">
                  <td>{{item2.선거회차}}</td>
                  <td>{{item2.기호}}</td>
                  <td>{{item2.정후보이름}}</td>
                  <td>{{item2.부후보이름}}</td>
                  <td> <button class="btn btn-primary" @click.prevent="submit(item2)" >승인</button>
                       <button class="btn btn-danger" @click.prevent="reject(item2)" >거절</button>
                  </td>
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
  name: 'ECPage',
  data() {
    return {
      msg:'선관위페이지',
      list: [],
      list2: [],
      hasVoteInfo: '',
      voteid: ''
    }
  },
  mounted: function() {
    this.msg = ''
    this.voteid = this.$route.params.voteid
    console.log(this.voteid)
    console.log("선관위페이지")
    this.getData()
  },
  watch: {
    // this.$route
    $route: function(to, from){
      this.msg = ''
      console.log('선관위페이지')
      this.getData()

    }
  },
  methods: {
    getData: function(){
        var url = this.$config.targetURL+'/ecpage/'+this.voteid;
        var url2 = this.$config.targetURL+'/ecpage/yet/'+this.voteid;
        console.log(url)
        this.$http.get(url)
        .then(result=>{
            console.log(result)
            console.log(result.data.status)
            this.list = result.data.result
            console.log(this.list)
        })
        .catch(error=>{
            console.log('서버에러')
        })
        this.$http.get(url2)
        .then(result=>{
          console.log(result)
          this.list2 = result.data.result
        })
        .catch(error=>{
          console.log('error')
        })
    },
    submit: function(item) {
      var json={
        candi_num: item.기호,
        vote_num: item.선거회차
      }
      console.log(json);
      this.$http.post(this.$config.targetURL+'/ecpage/voteInfomation/', json)
      .then(r=> {
        if(r.data.status=="success") {
          this.getData();
          this.$notice(
            {type: 'success',
            text: '성공적으로 승인되었습니다.'}
          )
        }
        else if(r.data.status=='error') {
          this.$notice(
            {type: 'error',
            text: r.data.errMsg}
          )
        }
      })
    },
    getVoteInfo: function() {
      this.$http.post(this.$config.targetURL+'/ecpage/isHasVoteInfo/')
      .then(result=> {
        console.log(result)
        console.log(result.data.status)
        this.list2 = result.data.result
        console.log(this.list2)
      })
      .catch(error=>{
          console.log('서버에러')
      })
    },
    reject: function(item) {
      var url3 = this.$config.targetURL+'/ecpage/'+item.선거회차+'/'+item.기호;
      this.$http.delete(url3)
      .then(r=> {
        if(r.data.status=="success") {
          this.getData();
          this.$notice(
            {type: 'success',
            text: '후보자가 거절되었습니다.'}
          )
        }
        else if(r.data.status=='error') {
          this.$notice(
            {type: 'error',
            text: "서버에러"}
          )
        }
      })
    },
    updateRank: function() {
      var url4 = this.$config.targetURL+'/vote/candInfo/rank';
      var json = {
        voteid: this.voteid
      }
      this.$http.put(url4,json)
      .then(r=> {
        if(r.data.status=="success") {
          this.$notice(
            {type: 'success',
            text: '후보 순위가 업데이트되었습니다.'}
          )
        }
        else {
          this.$notice(
            {type: 'error',
            text: "에러"}
          )
        }
      })
    }
  }
}
</script>

<style>

</style>
