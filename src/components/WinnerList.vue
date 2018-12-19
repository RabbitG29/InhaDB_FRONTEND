<template>
  <div class="container">
    <h1>역대 당선자 목록</h1>
    <br>
    <a href="#" class="btn btn-secondary" style="float:right cursor: pointer" @click="goBack">뒤로가기</a>
    <br>
    <br>
    <div class="card" v-for="(item, index) in list" :key="index" id="blog-card">
      <br>
    <h2><router-link :to="{ name: 'WinnerInfo', params: {winid: item.선거회차 } }"> {{item.선거회차}}회 당선인</router-link></h2>
      <a class="card-link">
        <article class="blog-card">
          <img class="post-image" :src="image" />
          <div class="article-details">
            <h3 class="post-title">{{ item.기호 }}</h3>
            <p class="post-description">{{ item.정후보 }}</p>
            <p class="post-description">{{ item.정후보이름 }}</p>
            <p class="post-description">{{ item.부후보 }}</p>
            <p class="post-description">{{ item.부후보이름 }}</p>
          </div>


        </article>
      </a>
    <br>
  </div>

  </div>
</template>

<script>
export default {
  name: 'WinnerList',
  data() {
    return {
      msg: '당선자정보',
      list: [],
      image: 'https://source.unsplash.com/DnWYw0zLJBg',
      winid:''
    }
  },
  mounted: function() {
    console.log("mounted")
    this.getData()
    console.log("ㅠㅠ")
  },
  methods: {
    getData: function() {
      var url = this.$config.targetURL+'/vote/winnerInfo';
      console.log(url)
      this.$http.get(url)
      .then(result=> {
        console.log(result)
        this.list = JSON.parse(result.data.result)
        console.log("?")
        console.log(this.list)
        console.log("!")
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


body {
  display: flex;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  color: $text;
  background: $bg;
  font-size: 0.9375rem;
  min-height: 100vh;
  margin: 0;
  line-height: 1.6;
  align-items: center;
  justify-content: center;
  text-rendering: optimizeLegibility;
}

#container {
  width: 30rem;
  height: 13.625rem;
}

.blog-card {
  display: flex;
  flex-direction: row;
  background: $white;
  box-shadow: 0 0.1875rem 1.5rem $shadow;
  border-radius: 0.375rem;
  overflow: hidden;
}


.post-image {
  @include transition(opacity 0.3s ease);
  display: block;
  width: 100%;
   object-fit: cover;
}

.article-details {
  padding: 1.5rem;
}

.post-category {
  display: inline-block;
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.0625rem;
  margin: 0 0 0.75rem 0;
  padding: 0 0 0.25rem 0;
  border-bottom: 0.125rem solid $border;
}

.post-title {
  @include transition(color 0.3s ease);
  font-size: 1.125rem;
  line-height: 1.4;
  color: $black;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

.post-author {
  font-size: 0.875rem;
  line-height: 1;
  margin: 1.125rem 0 0 0;
  padding: 1.125rem 0 0 0;
  border-top: 0.0625rem solid $border;
}

@media (max-width: 40rem) {
  #container {
    width: 18rem;
    height: 27.25rem;
  }

  .blog-card {
    flex-wrap: wrap;
  }
}

@supports (display: grid) {
  body {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 0.625rem;
    grid-template-areas: ". main main ." ". main main .";
  }

  #container {
    grid-area: main;
    align-self: center;
    justify-self: center;
  }

  .post-image {
    height: 100%;
  }

  .blog-card {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr;
  }

  @media (max-width: 40rem) {
    .blog-card {
      grid-template-columns: auto;
      grid-template-rows: 12rem 1fr;
    }
  }
}
</style>
