<template>
  <div>
  <div class="container">
    <h1>후보자정보</h1>
    <a href="#" class="btn btn-secondary" style="float:right cursor: pointer" @click="goBack">뒤로가기</a>
    <div>
      <div id="card-candidate">
        <div class="row form-group">
          <div class="col-sm-10"></div>
          <div class="col-sm-2" >
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">기호 {{list[0].기호}}번</h5>
            <h6 class="card-subtitle" style="color: #5cb85c">{{list[0].정후보이름}} {{list[0].부후보이름}}</h6>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <h6 class="card-subtitle" style="color: #5cb85c"> {{list[0].정후보이름}} 후보 이력</h6> <br>
            <div v-for="item2 in list2" v-if="list[0].정후보==item2.학번" class="card_text">
              <p>{{item2.이력번호}}. {{item2.연도}} {{item2.이력내용}}</p>
            </div>
          </div>
          <div class="card-body">
            <h6 class="card-subtitle" style="color: #5cb85c"> {{list[0].부후보이름}} 후보 이력 </h6> <br>
            <div v-for="item2 in list2" v-if="list[0].부후보==item2.학번" class="card_text">
              <p>{{item2.이력번호}}. {{item2.연도}} {{item2.이력내용}}</p>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <h5 class="card-subtitle" style="color: #5cb85c"> 공약 </h5> <br>
            <div v-for="item in list" class="card-text">
              <p>{{item.공약번호}}. {{item.공약내용}}</p>
            </div>
          </div>
        </div>
      </div>
  </div>
</div>
</div>
</template>

<script>
export default {
  name: 'candInfo',
  data() {
    return {
      msg: '후보자정보',
      list: [],
      vote_num: '',
      candi_num: ''
    }
  },
  mounted: function() {
    this.msg=''
    this.vote_num=this.$route.params.vote_num
    this.candi_num=this.$route.params.candi_num
    console.log('현재 선거회차 : ' + this.vote_num)
    console.log('기호 : ' + this.candi_num)
    this.getData()
  },
  watch: {
    $route: function(to, from) {
      this.msg=''
      this.vote_num=this.$route.params.vote_num
      this.candi_num=this.$route.params.candi_num
      console.log('현재 선거회차 : ' + this.vote_num)
      console.log('기호 : ' + this.candi_num)
      this.getData()
    }
  },
  methods: {
    getData: function() {
      var url = this.$config.targetURL+'/vote/candInfo/'+this.vote_num+'/'+this.candi_num;
      console.log(url)
      this.$http.get(url)
      .then(result=> {
        console.log(result)
        console.log(result.data.status)
        this.list = result.data.result1
        this.list2 = result.data.result2
        console.log(this.list)
        console.log(this.list2)
      })
      .catch(error=> {
        console.log('서버에러')
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
