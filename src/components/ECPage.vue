<template>
  <div>
    <div class="container">
      <h5> 후보자 정보 승인 </h5>
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
                <th scope="col" class="text-center"> </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in list" class="text-center">
                  <td>{{item.선거회차}}</td>
                  <td>{{item.기호}}</td>
                  <td>{{item.정후보이름}}</td>
                  <td>{{item.부후보이름}}</td>
                  <td> <button class="btn btn-primary" @click.prevent="submit(item)" >승인</button></td>
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
      hasVoteInfo: ''
    }
  },
  mounted: function() {
    this.msg = ''
    console.log("선관위페이지")
    this.getVoteInfo()
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
        var url = this.$config.targetURL+'/ecpage/';
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
    }
  }
}
</script>

<style>

</style>
