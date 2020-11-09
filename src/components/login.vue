<template>
    <div id="login container">
        <form class="form" >
            <h1>Login</h1>
            <input type="text" autocomplete="on" name="username" v-model="input.username" placeholder="Username" />
            <input type="password" autocomplete="on" v-on:keyup.enter="login()" name="password" v-model="input.password" placeholder="Password" />
            <button type="button" v-on:click="login()">Login</button>
        </form>
        <transition name="fade">
            <div v-if="show">
                <h6> {{showData}}</h6>
            </div>
        </transition>
    </div>
</template>

<script>
import { ACTION_CHANGE_ROLE, ACTION_CHANGE_TOKEN, ACTION_CHANGE_USER_ID } from '@/store/app.store'
import '@/interceptor'
    export default {
        name: 'Login',
        data() {
            return {
                input: {
                    username: "",
                    password: ""
                },
                show:false,
                showData:""
            }
        },
        mounted() {
            if (this.$store.getters.getUserID == ''){
                console.log("No user")
                }
            else this.$router.push('/')
        },
        methods: {
            testToast(message) {
                this.show = true;
                this.showData = message
                setTimeout(() => {
                    this.show = false
                    this.showData = ""
                }, 850)
            },
            login() {
                const self = this
                if(this.input.username != "" && this.input.password != "") {
                    let data = JSON.stringify({username:this.input.username,
                    password:this.input.password})
                    const axios = require ('axios')
                    axios({
                        method: 'post',
                        url:'http://localhost:4444/users/login',
                        data:data,
                    }).then(function (response) {
                        // Respuesta
                        console.log(response.data)
                        // Almacenamos user, role y token
                        self.$store.dispatch(ACTION_CHANGE_ROLE,response.data.role)
                        self.$store.dispatch(ACTION_CHANGE_TOKEN,response.data.token)
                        self.$store.dispatch(ACTION_CHANGE_USER_ID,response.data.user_id)
                        //localStorage.setItem('access-token',response.data.token)
                        self.$router.push('/')
                    }).catch(function (error) {     
                        console.log("ERROR: "+error)
                        self.testToast("The username or password is incorrect")
                    })        
                } else {
                    this.testToast("A username and password must be present");
                }
            }
        }
    }
</script>

<style scoped>
#login {
    width: 500px;
    border: 1px solid #CCCCCC;
    background-color: #FFFFFF;
    margin: auto;
    margin-top: 50px;
    padding: 20px;
    transition: all 0.2s;
}

h6 {
    margin: 10px 0 0;
    color:#cc1100;
}
h3 {
  margin: 40px 0 0;
}

input {
  display: inline-block;
  margin: 0 5px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
