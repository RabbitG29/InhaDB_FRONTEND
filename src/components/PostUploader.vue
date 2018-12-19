<template>
  <div>
    <div class="unlogin-box container" v-show="!isLogged">
      <div class="alert alert-warning" role="alert" >로그인이 필요합니다!</div>
      <router-link tag="a" :to="{name: 'Login'}">클릭 시 로그인페이지로 이동합니다</router-link>
    </div>
    <div v-show="isLogged">
      <div class="board-box container">
        <button type="button" class="btn btn-outline-primary" style="float:right" @click.prevent="submitLog">{{mode=='create'?'등록':'수정'}}</button>
        <button type="button" class="btn btn-outline-secondary" style="float:right" @click="$router.go(-1)">뒤로가기</button>
        <form>
          <div class="form-group">
            <input v-model="title" class="form-control" id="Title" placeholder="title">
          </div>
          <div class="form-group">
            <input v-model="content" class="form-control" id="Content" placeholer="content"/>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    name : "PostUploader",
    data(){
        return {
            msg: '게시판',
            counter: 1,
            title: '',
            postId: '',
            boardId: '',
            cursorPos: '',
            content: '',
            mode: '',
            writerID:'',
            list: []
        }
    },
    computed: {
    },
    mounted: function(){
        this.msg = ' '
        console.log("hi")
        if(this.$route.query.mode == 'create'){
          console.log("create")
          this.mode = 'create';
          this.boardId = this.$route.query.boardId
        }
        else if(this.$route.query.mode == 'edit'){
          this.mode = 'edit'
          this.postId = this.$route.query.postId
          this.boardId = this.$route.query.boardId
          console.log(this.boardId)
          console.log("수정할때")
          this.$http.get(this.$config.targetURL+'/resources/post/content/'+this.boardId+'/'+this.postId)
          .then(r=>{
            if(r.data.status == 'success'){
              var result = JSON.parse(r.data.result)
              console.log(result[0])
              this.title = result[0].게시글제목
              this.writer = result[0].이름
              this.content = result[0].게시글내용
              this.writerID = result[0].학번
            }
          })
          .catch(e=>{

          })
        }
    },

    methods: {
        fileChanges: function(e){
          console.log(e)
          var file = e.target.files[0]
          this.file1 = file;
        },
        plus : function(){
            this.counter = this.counter +1
        },
        submitLog: function(){
          if(this.mode == 'create'){
            var url = this.$config.targetURL+'/resources/post/';

            var json = {
              writer: this.getName,
              content: this.content,
              writerID: this.getId,
              title: this.title,
              boardid: this.boardId
            }
            console.log(json)
            //var formData = new FormData()
            //formData.append('information', JSON.stringify(json))
            console.log(JSON.stringify(json))
            this.$http.post(url, json)
            .then(result=>{
              console.log('success!')
              this.$notice({
                type: 'success',
                text: '글 등록이 성공적으로 완료되었습니다.'
              })
              this.$router.go(-1)
            })
            .catch(error=>{
                console.log('서버에러')
                this.$router.push({
                  name: 'Board'
                })
              })
          }
          else if(this.mode == 'edit'){ // 게시글 수정
            var url = this.$config.targetURL+'/resources/post/';
            console.log("edit")
            var json = {
              content: this.content,
              title: this.title,
              postid: this.postId,
              boardid: this.boardId
            }
            console.log(json)
            //var formData = new FormData()
            //formData.append('information', JSON.stringify(json))

            this.$http.put(url, json)
            .then(result=>{
              console.log('success!')
              this.$notice({
                type: 'success',
                text: '글 수정이 성공적으로 완료되었습니다.'
              })
              this.$router.go(-1)
            })
            .catch(error=>{
                console.log('서버에러')
                this.$router.push({
                  name: 'Board'
                })
              })
          }
        },
        goBack: function(){
          this.$router.push({
            name: "Board"
          })
        }

    }
}
</script>
<style>
.board-box{
  margin-left: 150px;
  margin-right: 150px;
  margin-top: 80px;
}
.unlogin-box{
  margin-bottom: 50px;
  margin-top: 80px;
}
#Content{
  height: 500px;
}
</style>
