export default {
    computed: {
        isLogged: function(){
            return this.$store.getters.isLogged
        },
        getId(){
            return this.$store.getters.getId
        },
        getAuthLevel(){
            return this.$store.getters.getAuthLevel
        },
        getToken(){
            return this.$store.getters.getToken
        },
        getName(){
            return this.$store.getters.getName
        }
    },
    methods: {

    }

}
