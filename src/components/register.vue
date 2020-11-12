<template>
  <div class="container row">
    <div class="col-2"></div>
    <div class="col-4">
    <Login/>
    </div>
    <div class="col-1"></div>
    <div class="col-5">
    <Signup/>
    </div>
  </div>    
</template>
<script>
import login from './login.vue'
import signup from './signup.vue'
export default {
    components: {
        Login: login,
        Signup: signup
    },
    mounted() {
    if (this.$store.getters.getUserID == ''){
        console.log("No user")
        }
    else this.$router.push('/')
}
}
</script>