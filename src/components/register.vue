<template>
  <div class="row" :style="{'background-image': 'url(' + require('../../public/house-861x574.jpg') + ')'}">
    <div class="col-lg-6 col-12 row" >
      <div class="mx-5 h-100 w-100">
    <Login class="col-6"/>
      </div>
    </div>
    <div class="col-12 col-lg-6 row" >
      <div class="mx-5 h-100 w-100">
    <Signup class="col-6"/>
    <br>
      </div>
    </div>
  </div>    
</template>
<script>
import login from './login.vue'
import signup from './signup.vue'
export default {
  data() {
    return {
image: "'../../public/house-861x574.jpg'"
    }
  },
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