<template>
  <div id="encabezado">
    <nav class="navbar navbar-dark bg-dark">
      <div class="container-fluid">
        <div class="navbar-header">
          <router-link class="navbar-brand" to="/">PropertyMap</router-link>
        </div>
        <ul class="nav navbar-nav">
          <li><router-link class="active" to="/">Inicio</router-link></li>
          <li><router-link to="/okupas">Associations</router-link></li>
          <li><router-link to="/owners">Owners</router-link></li>
          <li
            v-if="this.$store.getters.getRole == 'admin'"
            class="nav-item dropdown"
          >
            <router-link to="/properties">Properties</router-link>
            <div class="dropdown-menu bg-dark">
              <router-link class="dropdown-item" to="/properties"
                >List properties</router-link
              >
              <router-link class="dropdown-item" to="/addproperties"
                >Add property</router-link
              >
            </div>
          </li>
          <li v-else><router-link to="/properties">Properties</router-link></li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li v-if="this.$store.getters.getToken != ''">
            <router-link class="fa fa-user" title="Users" to="/users">
              Users
            </router-link>
          </li>
          <li v-else>
            <router-link class="fa fa-sign-in" title="Sign Up" to="/register">
              Sign Up</router-link
            >
          </li>
          <li>
            <button
              class="btn-sm btn-light"
              type="button"
              v-on:click="logout()"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { ACTION_LOGOUT } from "@/store/app.store";
export default {
  methods: {
    logout() {
      var self = this;
      this.$store.dispatch(ACTION_LOGOUT).then(() => {
        // Vuelve a la pantalla de registro
        if (self.$router.resolve(location).href != "/#app/register") {
          self.$router.push("/register");
        }
      });
    },
  },
};
</script>
<style scoped>
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
.dropdown:hover > .dropdown-menu {
  display: block;
}
.navbar-nav .dropdown-menu {
  position: absolute;
}
</style>