<template>
    <div id="signup container">
        <form class="form" >
            <h1>Sign up</h1>
            <input type="text" autocomplete="on" name="username" v-model="input.username" placeholder="Username" />
            <input type="text" name="fullname" v-model="input.fullname" placeholder="Fullname" />
            <input type="password" autocomplete="on" v-on:keyup.enter="signup()" name="password" v-model="input.password" placeholder="Password" />
            <button type="button" v-on:click="signup()">Sign up</button>
        </form>
        <transition name="fade">
            <div v-if="show">
                <h6> {{showData}}</h6>
            </div>
        </transition>
    </div>
</template>

<script>
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
        mounted() {
            if (localStorage.getItem('user_id') === null){
                console.log(localStorage.getItem('user_id'))
                console.log("No user")
                }
            else {
                console.log(localStorage.getItem('user_id'))

                this.$router.push('/')
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
            signup() {
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
                        url:'http://localhost:4444/users',
                        data:data,
                    }).then(function (response) {
                        // Respuesta
                        console.log(response.data)
                        self.testToast("User registered!")
                        setTimeout(function () {
                                self.$router.push('/login')
                        }, 1500);
                        
                    }).catch(function (error) {     
                        console.log("ERROR: "+error)
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
    #signup {
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
