import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Board from '@/components/Board'
import Vote from '@/components/Vote'
import Login from '@/components/Login'
import VoteList from '@/components/VoteList'
import VoteInfo from '@/components/VoteInfo'
import WinnerList from '@/components/WinnerList'
import CandInfo from '@/components/CandInfo'
import WinnerInfo from '@/components/WinnerInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/board',
      name: 'Board',
      component: Board
    },
    {
      path: '/vote',
      name: 'Vote',
      component: Vote
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/voteList',
      name : 'VoteList',
      component: VoteList
    },
    {
      path: '/voteInfo',
      name: 'VoteInfo',
      component: VoteInfo
    },
    {
      path: '/winnerList',
      name: 'WinnerList',
      component: WinnerList
    },
    {
      path: '/candInfo',
      name: 'CandInfo',
      component: CandInfo
    },
    {
      path: '/winnerInfo',
      name: 'WinnerInfo',
      component: WinnerInfo
    }
  ]
})
