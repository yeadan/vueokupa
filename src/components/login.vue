<template>
    <div id="login">
        <form class="form-group" >
            <h1>Login</h1>
            <br>
            <input class="form-control" required type="email" autocomplete="on" name="username" v-model="input.username" placeholder="Email" />
            <input class="form-control" type="password" autocomplete="on" v-on:keyup.enter="login()" name="password" v-model="input.password" placeholder="Password" />
            <button class="btn-sm btn-secondary" type="button" v-on:click="login()">Login</button>
            <button class="btn-sm btn-secondary" type="button" v-on:click="login2()">Sergio</button>

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
        methods: {
            testToast(message) {
                this.show = true;
                this.showData = message
                setTimeout(() => {
                    this.show = false
                    this.showData = ""
                }, 850)
            },
            login2() {
                const self = this

                    let data = JSON.stringify({username:"sergio@bosch.com",
                    password:"boschvega"})
                    const axios = require ('axios')
                    axios({
                        method: 'post',
                        url:'http://localhost:4444/users/login',
                        data:data,
                    }).then(function (response) {
                        // Almacenamos user, role y token
                        self.$store.dispatch(ACTION_CHANGE_ROLE,response.data.role)
                        self.$store.dispatch(ACTION_CHANGE_TOKEN,response.data.token)
                        self.$store.dispatch(ACTION_CHANGE_USER_ID,response.data.user_id)
                        //localStorage.setItem('access-token',response.data.token)
                        self.$router.push('/')
                        .catch((error => {console.log(error)}))
                    }).catch(function (error) {     
                        if (!error.response) {
                            // network error
                            self.testToast('Error: Network Error')
                            return
                        }
                        self.testToast("The username or password is incorrect")
                    })        
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
                        // Almacenamos user, role y token
                        self.$store.dispatch(ACTION_CHANGE_ROLE,response.data.role)
                        self.$store.dispatch(ACTION_CHANGE_TOKEN,response.data.token)
                        self.$store.dispatch(ACTION_CHANGE_USER_ID,response.data.user_id)
                        //localStorage.setItem('access-token',response.data.token)
                        self.$router.push('/')
                        .catch((error => {console.log(error)}))
                    }).catch(function (error) {     
                        if (!error.response) {
                            // network error
                            self.testToast('Error: Network Error')
                            return
                        }
                        self.testToast("The username or password is incorrect")
                    })        
                } else {
                    this.testToast("Username and password must be present");
                }
            }
        }
    }
</script>

<style scoped>
.btn-secondary {
    margin-top: 15px;
}
#login {
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
  margin: 5px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
