<template>
  <div class="row ">
    <div class="col">
      <h2 align="center">(Privado) Datos de Usuario </h2>
      <div class="container">
        <div class="row" >
          <div class="card text-center col-5" >
            <div class="card-body">
              <div class="card-title row">
                <p class="col 2"></p>
                <p class="h5 col-8">Usuario ID: {{userdata.user_id}}</p>
                <i v-if="Object.keys(userdata).length > 0" @click="editUser(userdata)" style="line-height:inherit" class="col-2 fas fa-edit"></i>
              </div>
              <div class="card-text" v-if="Object.keys(userdata).length > 0">
                <p align="center" ><small><strong>Nombre completo: </strong>{{ userdata.full_name }}</small></p>
                <p align="center" ><small><strong>Fecha registro: </strong>{{ userdata.registered.toLocaleString('es-ES', { timeZone: 'UTC' }) }}</small></p>
              </div>
            </div>
            <EditUser></EditUser>
          </div>
          <div v-if="role=='admin'" class="card container text-center col-5">
            <div class="card-body">
              <div class="card-title">
                <h5>Usuarios</h5>
              </div>
              <div v-if="Object.keys(datos.users).length > 0">
                <div class="row" v-for="(miembro, index) in datos.users" :key="index">
                  <div class="col-10">
                    <p class="card-text "><small>{{ miembro.full_name }} </small></p>
                  </div>
                  <div class="col-2">
                    <i @click="editUser(miembro)" style="line-height:inherit" class="col-2 fas fa-edit"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {dataMixins} from '../mixins.js'
import axios from 'axios'
import editUser from './editUser.vue'
import '../interceptor'
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
    this.role = localStorage.getItem("role")
    if (this.role == "admin") { this.load('users') }
    this.user_id = localStorage.getItem("user_id")

    let user = localStorage.getItem("user_id")
    const url = 'http://localhost:4444/users/'+user
    axios.get(url)
    .then(response => {
      this.userdata = response.data
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
