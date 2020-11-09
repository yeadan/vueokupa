<template >
<div id="okupas" >
  <h2 align="center">(Privado) Propiedades </h2>
  <div class="row">
    <div class="col-6 card">
      <div class="card-body" >
        <div v-if="role=='admin'" class="card-title row">
          <h3 class="col-10"> Propiedades</h3>
          <div class="col-2">
            <router-link to="/addproperties"><i style="line-height:inherit;color:green" title="Añadir" class="col-2 fa fa-plus"/></router-link> 
          </div>

        </div>
        <div v-else class="card-title">
          <h3>Propiedades</h3>
        </div>
        <div class="">
        <form class="float-right">
            <input type="text" id="aso" placeholder="Filtrar..." class="filter form-control inputsm" >
        </form>
        </div>
        <div  v-if="(Object.keys(datos.properties).length > 0 && Object.keys(datos.owners).length > 0 && Object.keys(datos.okupas).length > 0)">
          <table id="listProperty" class="table table-striped  ">
            <thead>
              <tr>
                <th>ID</th>
                <th>Okupa</th>
                <th>Owner</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody >
              <tr v-for="(okupa, index) in datos.properties" :key="index" @click="getproperty(okupa.property_id)" >
                <td>{{okupa.property_id}}</td>
                <td>{{datos.okupas[okupa.okupa_id].name}}</td>
                <td>{{datos.owners[okupa.owner_id].name}} </td>
                <td>{{ okupa.type }}</td>
                <td>{{ okupa.description }}</td>
              </tr>
            </tbody>
                          
            </table>
        </div>
        <div v-else class="alert alert-danger" role="alert">
           No hay propiedades registradas
        </div>
      </div>
    </div>
  <div class="col-3">
    <div class="card">    
      <div class="card-body">
        <div v-if="role=='admin' && propertydata != ''" class="row card-title">
          <h5 class="col-9 ">Propiedad</h5>
          <i style="line-height:inherit" title="Editar" @click="AdminEditProperty" class="col-1 fas fa-edit"></i>
          <i style="line-height:inherit" title="Borrar" @click="deleteProperty" class="col-1 fas fa-trash-alt"></i>
          <AdminEditProperty @editProperty="editPropertyFunc"></AdminEditProperty>
        </div>
        <div v-else class="card-title">
          <h5 >Propiedad</h5>
        </div>
        <div align="left" v-if='propertydata != ""'>
          <p  class="card-text"><small><strong>Id propiedad: </strong>{{ propertydata.property_id }}</small></p>
          <p  class="card-text"><small><strong>Propietario: </strong>{{ theOwner.name}}</small></p>
          <p  class="card-text"><small><strong>Asociación: </strong>{{ theOkupa.name }}</small></p>
          <p  class="card-text"><small><strong>Descripción: </strong> {{propertydata.description }}</small></p>
          <p  class="card-text"><small><strong>Tipo: </strong>{{ propertydata.type }}</small></p>
          <p  class="card-text"><small><strong>Fecha registro: </strong>{{ propertydata.created }}</small></p>

        </div>
        <div v-else class="alert alert-danger" role="alert">
          <small>Ninguna propiedad seleccionada</small>
        </div>
      </div>
    </div>
  </div>
  <div class="col-3">
    <div class="card">    
      <div class="card-body">
        <div v-if="role=='admin' && propertydata != ''" class="row card-title">
          <h5 class="col-12 ">Dirección</h5>
        </div>
        <div v-else class="card-title">
          <h5 >Dirección</h5>
        </div>
        <div align="left" v-if='propertydata != ""'>
          <p  class="card-text"><small><strong>Calle: </strong>{{ propertydata.calle }}</small></p>
          <div align="left" class="card-text ">
          <p ><small><strong>Número: </strong>{{ propertydata.numero }}</small>
          <small class="ml-3"><strong> Piso: </strong>{{ propertydata.piso }}<strong>º&nbsp; </strong>{{ propertydata.puerta }}</small></p></div>
          <p  class="card-text"><small><strong>CP: </strong>{{ propertydata.codigo_postal }}</small></p>
          <p  class="card-text"><small><strong>Núcleo: </strong> {{propertydata.nucleo }}</small></p>
          <p  class="card-text"><small><strong>Población: </strong>{{ propertydata.poblacion }}</small></p>
          <p  class="card-text"><small><strong>Municipio: </strong>{{ propertydata.municipio }}</small></p>
          <p  class="card-text"><small><strong>Provincia: </strong>{{ propertydata.provincia }}</small></p>
          <p  class="card-text"><small><strong>Comunidad: </strong>{{ propertydata.comunidad }}</small></p>

        </div>
        <div v-else class="alert alert-danger" role="alert">
          <small>Ninguna propiedad seleccionada</small>
        </div>
      </div>
    </div>
  </div>
  </div>
</div>
</template>

<script>
import {dataMixins} from '../mixins.js'
import adminEditProperty from './editProperties.vue'
import '../interceptor'
import axios from 'axios'
import $ from 'jquery'
export default {
  data () {
    return {
      role: '',
      propertydata: '',
      activeProperty:0,
      adminUser:0,
      theOwner:"",
      theOkupa:""
    }
  },
  mixins: [dataMixins],
  components: {
    AdminEditProperty: adminEditProperty
  },

  mounted () {
    this.role = this.$store.getters.getRole
    this.user_id = this.$store.getters.getUserID
    this.loadProperties()

    //Para filtrar los datos, con jquery
    $("#aso").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#listProperty tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      })
    })
    
  },
  methods: {
    editPropertyFunc(data) {
      this.adminUser = data
      
    },
    AdminEditProperty() {
      this.$modal.show('edit-property-modal', {usedProperty: this.propertydata})
    },
    getproperty(index){
      this.activeProperty = index
      const url = 'http://localhost:4444/properties/'+index
      axios.get(url)
      .then(response => {
        this.propertydata = response.data
        this.getOwner(this.propertydata.owner_id)
        this.getOkupa(this.propertydata.okupa_id)
      })
      .catch(error => {
        console.log(error)
        return
      })
    },
    getOwner(index) {
      const url = 'http://localhost:4444/owners/'+ index
      axios.get(url)
      .then(response => {
        this.theOwner= response.data
      })
      .catch(error => {
        console.log("Error leyendo usuario:"+error)
      })
      return this.theOwner
    },
      getOkupa(index) {
      const url = 'http://localhost:4444/okupas/'+ index
      axios.get(url)
      .then(response => {
        this.theOkupa = response.data
      })
      .catch(error => {
        console.log("Error leyendo usuario:"+error)
      })
      return this.theOkupa
    },
    deleteProperty() {
      var r = confirm("¿Estás seguro de querer borrarla?")
      if (r) {
        axios({
          method: 'delete',
          url:'http://localhost:4444/properties/'+this.activeProperty,
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
<style scoped>

tbody tr:hover {  
  background-color: #dfedc4;  
  color: #666666;  
}
</style>