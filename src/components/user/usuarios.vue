<template>
  <div class="row " id="users">
          <div class="text-center col-md-12 col-lg-6" >
            <div class="card h-100">
            <div class="card-body">
              <div class="card-title row">
                <p class="col 2"></p>
                <p class="h3 col-8">Usuario ID: {{userdata.user_id}}</p>
                <br>
                <br>
                <i v-if="Object.keys(userdata).length > 0" @click="editUser(userdata)" title="Editar" style="line-height:inherit" class="col-2 fas fa-edit"></i>
              </div>
              <div class="card-text" v-if="Object.keys(userdata).length > 0">
                <p align="center" ><small><strong>Nombre de usuario: </strong>{{ userdata.username }}</small></p>
                <p align="center" ><small><strong>Nombre completo: </strong>{{ userdata.full_name }}</small></p>
                <p align="center" ><small><strong>Fecha registro: </strong>{{ userdata.registered.toLocaleString('es-ES', { timeZone: 'UTC' }) }}</small></p>
              </div>
            </div>
            </div>
            <EditUser></EditUser>
          </div>
          <div v-if="role=='admin'" class="text-center col-md-12 col-lg-6">
            <div style="margin:10px" >
              <div class="card-title row">
                <h3 class="col-9">Editar usuarios</h3>
                <form class="col-3 ">
                  <input type="text" id="inputFiltro" placeholder="Filtrar..." class="form-control inputsm" >
                </form>
              </div>
              <div v-if="Object.keys(datos.users).length > 0">
              <table id="listUser" class="table table-striped" >
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Full name</th>
                </tr>
              </thead>
              <tbody >
                <tr class="filter" v-for="(miembro, index) in datos.users" :key="index" @click="editUser(miembro)">
                <td >{{ miembro.username }} </td>
                <td >{{ miembro.full_name }} </td>
                </tr>
              </tbody>
              </table>
              </div>
            </div>
    </div>
  </div>
</template>
<script>
import {dataMixins} from '@/mixins.js'
import axios from 'axios'
import editUser from './editUser.vue'
import '@/interceptor'
import $ from 'jquery'
export default {
  data () {
    return {
      userdata: "",
      role:"",
    }
  },
  mixins: [dataMixins],
  components: {
    EditUser: editUser
  },
  mounted () { 


    this.role = this.$store.getters.getRole
    if (this.role == "admin") { this.load('users') }
    this.user_id = this.$store.getters.getUserID
    let user = this.$store.getters.getUserID
    const url = this.url2+'users/'+user
    axios.get(url)
    .then(response => {
      this.userdata = response.data
      //Para filtrar los datos, con jquery
      $("#inputFiltro").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#listUser .filter").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      })
    }) 
    })
    .catch(error => {
      console.log(error)
    })
  },
  methods: {
    editUser(data) {
      this.$modal.show('edit-user-modal', {usedUser: data})
    }
  }
}
</script>
