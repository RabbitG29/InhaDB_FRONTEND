<template>
<div class="container">
    <board-header :id="boardId"/>
    <div id="board">
      <div class="board-box">
      <div v-show="isLogged" class="row form-group">
        <div class="col-sm-10"></div>
        <div class="col-sm-2" >
          <button type="button" class="btn btn-secondary" v-if="(this.boardId!=1)||((this.boardId==1)&&(isEc != 0))"
        @click="createLog()" >글 등록</button>
        </div>
      </div>
      <div class="row">
          <!-- print meeting log list -->
          <table class="table table-striped">
            <thead>
               <tr class="text-center">
                <th class="text-center" scope="col">#</th>
                <th class="text-center">작성자</th>
                <th class="text-center">제목</th>
                <th class="text-center">작성일시</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" @click="readBoard(item)" :key="index" style="cursor: pointer">
                <td scope="col">{{index+1}}</td>
                <td>{{item.이름}}</td>
                <td>{{item.게시글제목}}</td>
                <td>{{item.게시글작성일시}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div id="mobile-board">
      <div class="card" style="cursor: pointer" v-for="(item, index) in list" @click="readBoard(item)" :key="index">
        <div class="card-body">
          <h5 class="card-title">{{item.게시글제목}}</h5>
          <h6 class="card-subtitle mb-2 " style="color: #5cb85c">{{item.writetime}}</h6>
          <p class="card-text">{{item.학번}}</p>
        </div>
      </div>
  </div>
</div>
</template>
<script>
export default {
    name : "Board",
    computed: {
      isEc() {
        return this.$store.getters.getEc
      }
    },
    data(){
        return {
            msg: '게시판',
            counter: 1,     //<!-- 하단 페이지버튼을 위한 변수-->
            list: [],
            boardId: ''
        }
    },
    mounted: function(){
      this.msg = ''
      this.boardId = this.$route.query.boardId
      console.log('현재 게시판 번호 : '+this.boardId)
      this.getData()
    },
    watch: {
      // this.$route
      $route: function(to, from){
        this.msg = ''
        this.boardId = this.$route.query.boardId
        console.log('현재 게시판 번호 : '+this.boardId)
        this.getData()
      }
    },
    methods: {
        readBoard: function(item){
          this.$router.push({
            name: 'PostViewer',
            query: {
              id: item.게시글번호,
              boardid: this.boardId
            }
          })
        },
        plus : function(){
            this.counter = this.counter +1
        },
        getData: function(){
            var url = this.$config.targetURL+'/resources/post/'+this.boardId
            console.log(url)
            this.$http.get(url)
            .then(result=>{
                console.log(result)
                console.log(result.data.status)
                this.list = JSON.parse(result.data.result)
                console.log(this.list)
                this.list.forEach(v=>{
                  var dateinfo = v.게시글작성일시
                  console.log(dateinfo)
                  v.게시글작성일시 = this.$moment(dateinfo).tz('Asia/Seoul').format('YYYY년 M월 D일 H시 m분')
                })
            })
            .catch(error=>{
                console.log('서버에러')
            })
        },
        createLog: function(){
          this.$router.push({
            name:'PostUploader',
            query: {
              mode: 'create',
              boardId: this.boardId
            }
          })
        }
    }
}
</script>

<style scoped>
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
