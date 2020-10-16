<template>
  <div id="encabezado">
    <nav class="navbar navbar-dark bg-dark">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">PropertyMap</a> 
        </div>
        <ul class="nav navbar-nav">
          <li><router-link class="active" to="/">Inicio</router-link></li>
          <li><router-link to="/okupas">Associations</router-link></li>
          <li><router-link to="/users">Users</router-link></li>
          <li><router-link to="/owners">Owners</router-link></li>
          <li v-if="role=='admin'" class="nav-item dropdown">
            <router-link to="/properties" >Properties</router-link>
            <div class="dropdown-menu bg-dark">
              <router-link class="dropdown-item" to="/properties">List properties</router-link>
              <router-link class="dropdown-item" to="/addproperties">Add property</router-link>
            </div>
          </li>
          <li v-else><router-link to="/properties" >Properties</router-link></li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li><router-link class="fa fa-sign-in" to="/signup"> Sign Up</router-link></li>
          <li><router-link class="fa fa-user" to="/login"> Login</router-link></li>
          <li><button class="button btn-light" type="button" v-on:click="logout()">Logout</button></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.js'
export default {
  data() {
            return {
                role: ""
            }
  },
  mounted(){
    this.role = localStorage.getItem("role")
  },
  methods: {
    logout() {
      localStorage.clear()
      console.log(this.$router.resolve(location).href)
      if (this.$router.resolve(location).href!='/#app/login') {
        this.$router.push('/login')      }
    }
  }
}
</script>
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
    display: inline-block;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
  text-decoration: none;
}
a:hover {
  color: seashell;
}
.dropdown {
  color: #42b983;
}
.dropdown-item:hover {
  color: #42b983;
}
.dropdown:hover>.dropdown-menu {
  display: block;
}
.navbar-nav .dropdown-menu {
  position: absolute;
}
</style>