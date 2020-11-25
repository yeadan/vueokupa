<template>
    <div id="signup">
        <form class="form-group" >
            <h1>Sign up</h1>
            <br>
            <input class="form-control" type="text" autocomplete="on" name="username" v-model="input.username" placeholder="Email" />
            <input class="form-control" type="text" name="fullname" v-model="input.fullname" placeholder="Fullname" />
            <input class="form-control" type="password" autocomplete="on" v-on:keyup.enter="signup()" name="password" v-model="input.password" placeholder="Password" />
            <input class="form-control" type="password" autocomplete="on" v-on:keyup.enter="signup()" name="password2" v-model="input.password2" placeholder="Repeat Password" />
            <button class="btn-sm btn-secondary" type="button" v-on:click="signup()">Sign up</button>
        </form>
        <transition name="fade">
            <div v-if="show">
                <h6> {{showData}}</h6>
            </div>
        </transition>
    </div>
</template>

<script>
import {dataMixins} from '@/mixins.js'
import '../interceptor'
    export default {
        name: 'Signup',
        data() {
            return {
                input: {
                    username: "",
                    fullname: "",
                    password: "",
                    role: "user"
                },
                show:false,
                showData:""
            }
        },
        mixins:[dataMixins],
        methods: {
            testToast(message) {
                this.show = true;
                this.showData = message
                setTimeout(() => {
                    this.show = false
                    this.showData = ""
                }, 850)
            },
            signup() {
                if (this.input.username == "" || this.input.fullname == ""
                    || this.input.password == "") 
                {
                    this.testToast("Username, fullname and password must be present");
                    return
                }
                if (this.input.password != this.input.password2) {
                    this.testToast("The two password fields don't match")
                    return
                }
                const self = this
                var fecha = new Date()
                if (this.input.username != "" && this.input.fullname != ""
                    && this.input.password != "") {
                    let data = JSON.stringify({username:this.input.username,full_name:this.input.fullname,
                    password:this.input.password,role:this.input.role,registered:fecha})
                    console.log(data)
                    const axios = require ('axios')

                    axios({
                        method: 'post',
                        url:this.url2+'users',
                        data:data,
                    }).then(function (response) {
                        // Respuesta
                        console.log(response.data)
                        self.testToast("User registered!")
                        setTimeout(function () {
                                self.$router.push('/register')
                        }, 1500);
                        
                    }).catch(function (error) {     
                        if (!error.response) {
                            // network error
                            self.testToast('Error: Network Error')
                            return
                        }
                        self.testToast("The username, fullname or password is incorrect")
                    })        
                } else {
                    this.testToast("A username, fullname and password must be present");
                }
            }
        }
    }
</script>

<style scoped>
.btn-secondary {
    margin-top: 15px;
}

#signup {
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
