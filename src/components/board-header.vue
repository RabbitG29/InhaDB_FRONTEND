<template>
    <div>
        <div v-if="meta">
            <h3>{{boardName}}</h3>
            <h5 v-html="boardNote"></h5>
        </div>
        <div v-else>
            올바른 게시판 정보가 없습니다.
        </div>
    </div>
</template>
<script>
export default {
    props: {
        id: {

        }
    },
    data (){
        return {
            meta: '',
            boardName: '',
            boardNote: ''
        }
    },
    watch: {
        id: function(val){
            this.getData()
        },
        $route: function(val){
            console.log('id = '+this.id)
            this.getData()
        }
    },
    created: function(){
        this.getData()
    },
    methods: {
        getData: function(){
            console.log('id: '+this.id)
            if(!this.id) return;
            console.log(this.$config.targetURL+'/resources/board/'+this.id)
            this.$http.get(this.$config.targetURL+'/resources/board/'+this.id)
                .then(r=>{
                    if(r.data.status == 'success'){
                        console.log('성공적')
                        this.meta = r.data.data
                        this.boardName = this.meta.게시판이름
                        this.boardNote = this.meta.게시판설명
                        console.log(this.meta)
                        console.log(this.boardName)
                        console.log(this.boardNote)
                        this.$forceUpdate()
                    }
                    else if(r.data.status == "error"){
                        console.log('에러')
                    }
                })
        }
    }
}
</script>
