<template >
<div id="owners" class="container">
  <h2 align="center">(Privado) Propietarios </h2>
  <div class="row">
    <div class="col 4">
    <div class="card" >
        <div class="card-body" >
          <div v-if="role=='admin'" class="card-title row">
            <h5 class="col-10">Propietarios</h5>
            <i  @click="addOwner" style="line-height:inherit;color:green" class="col-2 fa fa-plus"></i>
            <AddOwner></AddOwner>
          </div>
          <div v-else class="card-title">
            <h5>Propietarios</h5>
          </div>
          <div v-if="Object.keys(datos.owners).length > 0">
          <ul class="list-group" v-for="(owner, index) in datos.owners" :key="index">
            <li class=" list-group-item list-group-item-action" @click="getowner(owner.owner_id)" ><small><strong>{{owner.owner_id}} : </strong>{{ owner.name }}</small></li>
          </ul>
          </div>
          <div v-else class="alert alert-danger" role="alert">
             No hay ningún propietario
          </div>
        </div>
      </div>
    </div>
  <div class="col 4">
    <div class="card">    
      <div class="card-body">
        <div v-if="role=='admin' && ownersdata != ''" class="row card-title">
          <h5 class="col-9 ">Propietario</h5>
          <i @click="editOwner" style="line-height:inherit" class="col-1 fas fa-edit"></i>
          <i @click="deleteOwner" style="line-height:inherit" class="col-1 fas fa-trash-alt"></i>
        </div>
        <div v-else class="card-title">
          <h5 >Propietario</h5>
       </div>
          <EditOwner></EditOwner>
        <div align="left" v-if='ownersdata != ""'>
          <p  class="card-text"><small><strong>Id propietario: </strong>{{ ownersdata.owner_id }}</small></p>
          <p  class="card-text"><small><strong>Nombre: </strong>{{ ownersdata.name }}</small></p>
          <p  class="card-text"><small><strong>Tipo: </strong>{{ ownersdata.type_owner }}</small></p>
          <p  class="card-text"><small><strong>Descripción: </strong> {{ownersdata.description }}</small></p>
          <p  class="card-text"><small><strong>Fecha registro: </strong>{{ ownersdata.created }}</small></p>
        </div>
        <div v-else class="alert alert-danger" role="alert">
          <small>Ningun propietario seleccionado</small>
        </div>
      </div>
    </div>
  </div>
  </div>
</div>
</template>

<script>
import {dataMixins} from '../mixins.js'
import addOwner from './addOwner.vue'
import editOwner from './editOwner.vue'
import '../interceptor'
import axios from 'axios'
export default {
  data () {
    return {
      role: '',
      ownersdata: "",
      activeOwner:0,
    }
  },
  mixins: [dataMixins],
  components: {
  AddOwner: addOwner,
  EditOwner: editOwner,
  },
  mounted () {
    this.role = localStorage.getItem("role")
    this.user_id = localStorage.getItem("user_id")
    this.load('owners')
  },
  methods: {
    addOwner() {
      this.$modal.show('add-owner-modal')
    },
    getowner(index){
      this.activeOwner = index
      const url = 'http://localhost:4444/owners/'+index
      axios.get(url)
      .then(response => {
        this.ownersdata = response.data
      })
      .catch(error => {
        console.log(error)
      })
    },
    editOwner() {
      this.$modal.show('edit-owner-modal', {usedOwner: this.ownersdata})
    },
    deleteOwner() {
      var r = confirm("¿Estás seguro de querer borrarlo?")
      if (r) {
        axios({
          method: 'delete',
          url:'http://localhost:4444/owners/'+this.activeOwner,
          }).then(function (response) {
          // Respuesta
            console.log(response)
            location.reload(false)
            alert("Borrado!")
          }).catch(function (error) {     
            console.log("ERROR: "+error)
        }) 
      }
    }
  }
}
</script>