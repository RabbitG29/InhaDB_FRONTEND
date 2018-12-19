<template>
  <div class="container">
    <h1>MyPage</h1>
    <br>
    <h2>{{this.name}}({{getId}})님의 이력</h2>
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
                <th class="text-center" scope="col">이력번호</th>
                <th class="text-center">연도</th>
                <th class="text-center">이력 내용</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="index">
                <td scope="col">{{item.이력번호}}</td>
                <td>{{item.연도}}년</td>
                <td>{{item.이력내용}}</td>
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
  computed: {
    getId() {
        return this.$store.getters.getId
    }
  },
  data() {
    return {
      msg: '선거결과',
      list: [],
      name: ''
    }
  },
  mounted: function(){
    this.getName1();
    this.msg = ''
    console.log('mypage')
    this.getData()
  },
  methods: {
    getData: function() {
      var url1 = this.$config.targetURL+'/login/exp/'+this.getId;
      this.$http.get(url1)
      .then(result=>{
        console.log(result)
        this.list = result.data.result
        console.log(this.list)
      })
      .catch(err=>{
        console.log("error")
      })
    },
    getName1: function() {
      var url2 = this.$config.targetURL+'/login/name/'+this.getId;
      this.$http.get(url2)
      .then(result=>{
        this.name=result.data.result
        console.log(this.name)
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
