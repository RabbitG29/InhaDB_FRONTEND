<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <div class="container" id="post-box">
          <h4 font-style="bold" v-html="title"></h4>
          <h5>{{writer}}</h5>
          <h5><small class="text-right">{{writetime}}</small></h5>

          <div id="edit-box">
            <div v-show="isLogged && getId == writerID">
              <button type="button" class="btn btn-light btn-sm" style="cursor: pointer" @click.prevent="editLog">수정</button>
            </div>
            <div v-show="isLogged && getId == writerID">
              <button type="button" class="btn btn-light btn-sm" style="cursor: pointer" @click.prevent="deleteLog">삭제</button>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body">
    <!--    <h5 class="card-title">Special title treatment</h5> -->
        <div class="card-text">
          <div v-html="content"></div>

          </div>
        <div>
          <a v-if="filename" :href="path">첨부파일 다운로드 ({{filename}})</a>
        </div>
        <div v-if="filename.match(/(.pdf)$/)">
          <embed :src="$config.targetURL+`/meetinglog/${id}/${filename}`" type='application/pdf' width="1000px" height="1400px">
        </div>
        <a href="#" class="btn btn-secondary" style="float:right cursor: pointer" @click="goBack">뒤로가기</a>
      </div>
    </div>
    <br>

        <!--댓글작성-->
    <div v-if="isLogged" class="list-group col-sm-12">
      <div id="comment-post-box">
      <textarea v-model="comment" class="form-control"  placeholder="Comment" rows="3"></textarea>
      <button type="button" class="btn btn-primary" style="cursor: pointer" @click.prevent="commentEroll">댓글작성</button>
      </div>
    </div>

    <!--댓글 보이기-->
    <div class="row" id="comment">
      <div class="col-sm-2"></div>
      <div class="list-group col-sm-12">
        <div class="text-left card comment-card"
        v-for="(item, index) in list" :key="index+item.mode">
            <div class="card-body" id="comment-box">
              <h5 class="comment-writer">{{item.이름}}
                <sub class="comment-timestamp" style="color: #5cb85c">{{item.댓글작성일시}}</sub>
              </h5>
              <br>
              <h6 v-if="item.mode == 'view'">{{item.댓글내용}}</h6>
              <h6 v-else><textarea class="form-control" v-model="item.댓글내용"></textarea></h6>

              <div class="row" id="edit-box">
                <div v-show="getId==item.학번">
                  <button v-if="item.mode == 'edit'" type="button" class="btn btn-light btn-sm" style="cursor: pointer" @click="changeCommentMode(index)">취소</button>
                  <button v-if="item.mode == 'view'" type="button" class="btn btn-light btn-sm" style="cursor: pointer" @click="changeCommentMode(index)">수정</button>
                  <button v-else type="button" class="btn btn-light btn-sm" style="cursor: pointer" @click.prevent="editComment(item)">확인</button>

                  <button type="button" class="btn btn-light btn-sm" style="cursor: pointer" @click.prevent="deleteComment(item.댓글번호)">삭제</button>
                </div>

              </div>
            </div>
        </div>
      </div>
      <div class="col-sm-2"></div>
    </div>
    <br>
  </div>
</template>
<script>
var moment = require('moment')
var path = require('path');
export default {
  name: 'readBoard',
  data(){
    return {
      title : '',
      writer: '',
      writerID: '',
      context: '',
      writetime: '',
      content: '',
      comment: '',
      path: '',
      id: '',
      boardid: '',
      filename: '',
      list: []
    }
  },
  created: function(){
    this.$Progress.start()
    this.id = this.$route.query.id
    this.boardid = this.$route.query.boardid
    console.log('마운티드!')
        console.log(this.id)
        console.log(this.bardid)
    this.$http.get(this.$config.targetURL+'/resources/post/content/'+this.boardid+'/'+this.id)
    .then(r=>{
    console.log('마운티드!2')
      if(r.data.status == 'success'){
        var result = JSON.parse(r.data.result)
        this.title = result[0].게시글제목
        this.writer = result[0].이름
        this.writetime = this.$moment(result[0].게시글작성일시).tz('Asia/Seoul').format('YYYY년 M월 D일 h시 m분')
        this.writerID = result[0].학번
        this.content = result[0].게시글내용
        this.$Progress.finish()
        console.log("hi")
      }
    })
    .catch(e=>{
        this.$Progress.fail()
    })
    this.getComment()
  },
  computed: {
    isLogged: function(){
      return this.$store.getters.isLogged
    },
    getId(){
      return this.$store.getters.getId
    },
    getToken(){
      return this.$store.getters.getToken
    }
  },
  methods: {
    changeCommentMode: function(index){
      this.list[index].mode = 'edit'
      this.$forceUpdate()
    },
    goBack: function(){
      this.$router.go(-1)
    },
    deleteLog: function(){
      this.$http.delete(this.$config.targetURL+'/resources/post/'+this.boardid+'/'+this.id)
      .then(result=>{
        if(result.data.status == 'success'){
          console.log('삭제성공')
          this.$notice({
            type: 'success',
            text: '삭제가 성공적으로 완료되었습니다.'
          })
          this.$router.go(-1)
        }
      })
      .catch(error=>{
        console.log('서버에러')
      })
    },
    editLog: function(){
      console.log('버튼누름')
      this.$router.push({
        name:'PostUploader',
        query: {
          mode: 'edit',
          postId: this.id,
          boardId: this.boardid
        }
      })
    },
    getComment: function(){
      console.log("comment")
      this.$http.get(this.$config.targetURL+'/resources/comment/'+this.boardid+'/'+this.id)
      .then(result=>{
          console.log(result)
          console.log(result.data.status)

          this.list = JSON.parse(result.data.result)
          this.list.forEach(v=>{
            var ct = v.댓글작성일시
            v.댓글작성일시 = this.$moment(ct).tz('Asia/Seoul').format('YYYY년 M월 D일 h시 m분')
            v.mode = 'view'
            console.log(v.mode)
          })

})
      .catch(error=>{
          console.log('서버에러')
      })
    },
    commentEroll : function(){ // 댓글 등록
     var url = this.$config.targetURL+'/resources/comment';

     var json = {
       postId: this.id,
       content: this.comment,
       writerID: this.getId,
       boardId: this.boardid
     }
     console.log(json)
     this.$http.post(url, json)
     .then(result=>{
       if(result.data.status == 'success'){
         this.getComment()
         this.comment = ''
         this.$notice({
           type: 'success',
           text: '성공!'
         })
       }
     })
     .catch(error=>{
         console.log('서버에러')
       })
    },
    deleteComment : function(commentId){
      this.$http.delete(this.$config.targetURL+'/resources/comment/'+this.boardid+'/'+this.id+'/'+commentId)
      .then(result=>{
        if(result.data.status == 'success'){
          console.log('삭제성공')
          this.getComment()
          this.$notice({
            type: 'success',
            text: '삭제가 성공적으로 완료되었습니다.'
          })
        }
      })
      .catch(error=>{
        console.log('서버에러')
      })
    },
    editComment : function(item){ //댓글 수정
      var commentId = item.댓글번호
      var comment = item.댓글내용

      console.log(commentId + '  ' +comment)
      var url = this.$config.targetURL+'/resources/comment';
      var json = {
        commentId: commentId,
        content: comment,
        boardId: this.boardid,
        postId: this.id
      }
      this.$http.put(url, json)

      .then(result=>{
        if(result.data.status == 'success'){
          console.log('수정성공')
          this.getComment()
          this.$notice({
            type: 'success',
            text: '수정이 성공적으로 완료되었습니다.'
          })
        }
      })
      .catch(error=>{
        console.log('서버에러')
      })
    },
  }
}
</script>
<style scoped>
#mobile-comment {
  width: 100%;
}
#comment-box #edit-box {
  position: absolute;
  bottom: 15px;
  right: 30px;
}
#comment-post-box button {
  position: absolute;
  top: 35px;
  right: 30px;
}
#comment-post-box {
  margin-top: 15px;
  margin-bottom: 15px;
}
#comment-box {
  margin-top: 10px;
  margin-bottom: 10px;
}
.comment-card:hover {
  background-color: rgb(241,241,241);
  transition-duration: 0.3s;
}
.comment-writer {
  margin-left: 5px;
}
.comment-timestamp {
  position: absolute;
  top: 40px;
  right: 30px;
}
.board-box{
  margin-left: 150px;
  margin-right: 150px;
  margin-top: 80px;
}
#mobile-edit-box {
  position: absolute;
  bottom: 9px;
  right: 9px;

}
#post-box #edit-box {
  position: absolute;
  top: 20px;
  right: 20px;
}
.list-group .card {
  margin: 5px;
}
.card{
  margin-bottom:10px;
}
#comment{
  width: 100%;
}
@media (min-width: 999px){
    #comment {
        display: inline-block;
    }
    #mobile-comment{
        display: none;
    }
}

@media (max-width: 1000px){
    #comment {
        display: none;
    }
    #mobile-comment{
        display: inline-block;
    }
}

</style>
