<template >
<div id="okupas" class="container">
  <h2 align="center">(Privado) Asociaciones </h2>
  <div class="row">
    <div class="col-4 card">
      <div class="card-body" >
        <div v-if="role=='admin'" class="card-title row">
          <h5 class="col-10">Asociaciones</h5>
          <i  @click="addOkupa" style="line-height:inherit;color:green" class="col-2 fa fa-plus"></i>
           <AddOkupa></AddOkupa>
        </div>
        <div v-else class="card-title">
          <h5>Asociaciones</h5>
        </div>
        <div v-if="Object.keys(datos.okupas).length > 0">
          <ul class="list-group" v-for="(okupa, index) in datos.okupas" :key="index">
            <li class=" list-group-item list-group-item-action" @click="getokupa(okupa.okupa_id),getmembers(okupa.okupa_id)" ><small><strong>{{okupa.okupa_id}} : </strong>{{ okupa.name }}</small></li>
          </ul>
        </div>
        <div v-else class="alert alert-danger" role="alert">
           No hay asociaciones okupas
        </div>
      </div>
    </div>
  <div class="col-4">
    <div class="card">    
      <div class="card-body">
        <div v-if="role=='admin' && okupasdata != ''" class="row card-title">
          <h5 class="col-9 ">Asociación</h5>
          <i @click="editOkupa" style="line-height:inherit" class="col-1 fas fa-edit"></i>
          <i @click="deleteOkupa" style="line-height:inherit" class="col-1 fas fa-trash-alt"></i>
        </div>
        <div v-else class="card-title">
          <h5 >Asociación</h5>
       </div>
          <EditOkupa></EditOkupa>
        <div align="left" v-if='okupasdata != ""'>
          <p  class="card-text"><small><strong>Id asociación: </strong>{{ okupasdata.okupa_id }}</small></p>
          <p  class="card-text"><small><strong>Nombre: </strong>{{ okupasdata.name }}</small></p>
          <p  class="card-text"><small><strong>Descripción: </strong> {{okupasdata.description }}</small></p>
          <p  class="card-text"><small><strong>Fecha registro: </strong>{{ okupasdata.created }}</small></p>
        </div>
        <div v-else class="alert alert-danger" role="alert">
          <small>Ninguna asociación seleccionada</small>
        </div>
      </div>
    </div>
  </div>
    <div class="container card col-4">
      <div class="card-body">
        <div class="card-tittle row">
          <h5 class="card-title col-10">Miembros</h5>
          <i v-if="role=='admin'" @click="adminAddMember" style="line-height:inherit;color:green" class="col-1 fa fa-user-plus"></i>
          <i v-else @click="addMember" style="line-height:inherit;color:green" class="col-1 fa fa-user-plus"></i>
          <AdminAddOkupa @addNewUser="addNewUserFunc"></AdminAddOkupa>
        </div>
        <div v-if="Object.keys(miembrosdata).length > 0">
          <div class="row" v-for="(miembro, index) in miembrosdata" :key="index">
            <div id="members" class=" col-8">
              <p class="card-text"><small>{{ miembro.full_name }} </small></p>
            </div>
            <div v-if="(role == 'admin' || user_id == miembro.user_id)" class=" col-4">
              <i @click="delMember(miembro.user_id)" style="color:red" class="fa fa-remove"></i>
            </div>
          </div>
        </div>
        <div v-else class="alert alert-danger" role="alert">
          <small>No se ha encontrado ningún miembro</small>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {dataMixins} from '../mixins.js'
import addOkupaUser from './addOkupaUser.vue'
import addOkupa from './addOkupa.vue'
import editOkupa from './editOkupa.vue'
import '../interceptor'
import axios from 'axios'
export default {
  data () {
    return {
      role: '',
      okupasdata: '',
     // listokupas: [],
      miembrosdata:[],
      activeOkupa:0,
      adminUser:0,
    }
  },
  mixins: [dataMixins],
  components: {
  AddOkupa: addOkupa,
  EditOkupa: editOkupa,
  AdminAddOkupa: addOkupaUser
  },
  mounted () {
    this.role = this.$store.getters.getRole
    this.user_id = this.$store.getters.getUserID
    this.load('okupas')
    
  },
  methods: {
    addNewUserFunc(data) {
      this.adminUser = data
      this.addMember()
    },
    
    addOkupa() {
      this.$modal.show('add-okupa-modal')
    },
    getokupa(index){
      const url = 'http://localhost:4444/okupas/'+index
      axios.get(url)
      .then(response => {
        this.okupasdata = response.data
      })
      .catch(error => {
        console.log(error)
      })
    },
    getmembers(index) {
      this.activeOkupa = index
      const url = 'http://localhost:4444/okupas/users/'+index
      axios.get(url)
      .then(response => {
        this.miembrosdata = response.data
      })
      .catch(error => {
        console.log(error)
      })
    },
    delMember(index) {
      var r = confirm("¿Estás seguro de querer borrarlo?")
      if (r && this.okupasdata != "") {
        const url = 'http://localhost:4444/okupas/'+this.activeOkupa+'/'+index
      axios.delete(url)
      .then(response => {
        console.log("Usuario borrado | "+response.data)
        this.getmembers(this.activeOkupa)
      })
      .catch(error => {
        console.log(error)
      })
      }
      else if (r) { alert ("No se ha podido borrar el usuario") }
    },
    editOkupa() {
      this.$modal.show('edit-okupa-modal', {usedOkupa: this.okupasdata})
    },
    deleteOkupa() {
      var r = confirm("¿Estás seguro de querer borrarlo?")
      if (r) {
        axios({
          method: 'delete',
          url:'http://localhost:4444/okupas/'+this.activeOkupa,
          }).then(function (response) {
          // Respuesta
            console.log(response)
            location.reload(false)
            alert("Borrado!")
          }).catch(function (error) {     
            console.log("ERROR: "+error)
        }) 
      }
    },
    adminAddMember() {
      this.$modal.show('admin-add-okupa-modal', {asoOkupa: this.activeOkupa})
    },
    addMember() {
      if (this.okupasdata != "") {
        let theUser = this.user_id
        if (this.role == "admin") {
          theUser = this.adminUser }
        const url = 'http://localhost:4444/okupas/'+this.activeOkupa+'/'+theUser    
        axios.post(url)
        .then(response => {
          console.log("Usuario añadido ",response.data)
          this.getmembers(this.activeOkupa)
        })
        .catch(error => {
          console.log(error)
        })
        }
        else alert ("No hay asociación donde añadir el usuario")
      }
  }
}
</script>