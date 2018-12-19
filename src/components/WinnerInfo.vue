<template>
  <div class="container">
    <h1>{{this.winid}}회 당선자</h1>
    <br>
    <a href="#" class="btn btn-secondary" style="float:right cursor: pointer" @click="goBack">뒤로가기</a>
    <br>
    <h3>정후보{{this.seclist[0].이름}}</h3>
    <table class="table table-striped">
    <thead>
       <tr class="text-center">
        <th class="text-center" scope="col">이력번호</th>
        <th class="text-center">년도</th>
        <th class="text-center">이력내용</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in seclist" @click="readBoard(item)" :key="index">
        <td>{{item.이력번호}}</td>
        <td>{{item.연도}}</td>
        <td>{{item.이력내용}}</td>
      </tr>
    </tbody>
    </table>
    <h3>부후보</h3>
    <table class="table table-striped">
    <thead>
       <tr class="text-center">
        <th class="text-center" scope="col">이력번호</th>
        <th class="text-center">년도</th>
        <th class="text-center">이력내용</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in seclist2" @click="readBoard(item)" :key="index">
        <td>{{item.이력번호}}</td>
        <td>{{item.연도}}</td>
        <td>{{item.이력내용}}</td>
      </tr>

    </tbody>
    </table>
    <br>
    <h2>실시 공약 목록</h2>
    <table class="table table-striped">
      <thead>
         <tr class="text-center">
          <th class="text-center" scope="col">공약번호</th>
          <th class="text-center">공약내용</th>
          <th class="text-center">이행여부</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" @click="readBoard(item)" :key="index">
          <td>{{item.공약번호}}</td>
          <td>{{item.공약내용}}</td>
          <td>
            <a v-if="item.이행여부==1">완료</a>
            <a v-if="item.이행여부==0">미완료</a>
          </td>
        </tr>
      </tbody>
    </table>
    <br>
    <h2>실시 사업 목록</h2>
    <table class="table table-striped">
      <thead>
         <tr class="text-center">
          <th class="text-center" scope="col">공약 외 사업번호</th>
          <th class="text-center">사업 이름</th>
          <th class="text-center">사업내용</th>
          <th class="text-center">사업평가</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in thlist" @click="readBoard(item)" :key="index">
          <td>{{item.사업번호}}</td>
          <td>{{item.사업이름}}</td>
          <td>{{item.사업내용}}</td>
          <td>{{item.사업평가}}</td>
        </tr>
      </tbody>
    </table>
    <div class="row">
        <!-- print meeting log list -->

      </div>
  </div>

</template>

<script>
export default {
    name : "WinnerInfo",
    data() {
      return {
        msg: '선거정보',
        list: [],
        seclist:[],
        sectlist2:[],
        thlist:[],
        winid: ''
      }
    },

    methods: {
      getData: function() {
        var url = this.$config.targetURL+'/vote/winnerInfo/in/'+this.winid;
        console.log(url)
        this.$http.get(url)
        .then(result=> {
          console.log(result)
          this.list = JSON.parse(result.data.result)
    //      console.log("?")
          console.log(this.list)
      //    console.log("!")
        })
        .catch(error=> {
          console.log('서버에러')
        })
      },
      getData2: function() {
        var url2 = this.$config.targetURL+'/vote/winnerInfo/in/career/'+this.winid;
        this.$http.get(url2)
        .then(result=> {
          console.log(result)
          this.seclist = JSON.parse(result.data.result)
          this.seclist2=JSON.parse(result.data.result2)
      //    console.log("??")
          console.log(this.seclist)
          console.log(this.seclist2)
        //  console.log("!!")
        })
        .catch(error=> {
          console.log('서버에러')
        })
      },
    getData3: function() {
      var url3 = this.$config.targetURL+'/vote/winnerInfo/in/busi/'+this.winid;
      console.log(url3)
      this.$http.get(url3)
      .then(result=> {
        console.log(result)
        console.log("?????????")
        this.thlist = JSON.parse(result.data.result)
        console.log("???")
        console.log(this.thlist)
        console.log("!!!")
      })
      .catch(error=> {
        console.log('서버에러')
      })
    },
    goBack: function(){
      this.$router.go(-1)
    }
  },
    mounted: function(){
      this.msg = ''
      this.winid = this.$route.params.winid
      console.log('회차 : '+this.winid)
      this.getData()
      this.getData2()
      this.getData3()
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
