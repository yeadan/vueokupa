<template >
  <div class="row" id="properties">
    <div class="col-lg-6 col-md-12 col-xl-6">
      <div style="margin:10px"  >
        <div class="card-title row">
          <h3 class="col-8"> Propiedades</h3>
          <form class="col-3 ">
            <input type="text" id="inputFiltro" placeholder="Filtrar..." class="form-control inputsm" >
          </form>
          <router-link v-if="role=='admin'" to="/addproperties"><i style="line-height:inherit;color:green;margin:7px" title="Añadir" class="fa fa-plus"/></router-link> 
        </div>
        <div v-if="(Object.keys(datos.properties).length > 0 && Object.keys(datos.owners).length > 0 && Object.keys(datos.okupas).length > 0)">
          <table id="listProperty" class="table table-striped  ">
            <thead>
              <tr >
                <th>ID</th>
                <th>Okupa</th>
                <th>Owner</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody >
              <tr class="filter" v-for="(okupa, index) in datos.properties" :key="index" @click="getproperty(okupa.property_id)" >
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
  <div class="col-lg-3 col-md-6 col-xl-3">
    <div class="card">    
      <div class="card-body">
        <div v-if="role=='admin' && propertydata != ''" class="row card-title">
          <h5 class="col-9 ">Propiedad</h5>
          <i style="line-height:inherit" title="Editar" @click="AdminEditProperty" class="col-1 fas fa-edit"></i>
          <i style="line-height:inherit" title="Borrar" @click="deleteProperty(propertydata.property_id)" class="col-1 fas fa-trash-alt"></i>
          <AdminEditProperty></AdminEditProperty>
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
  <div class="col-lg-3 col-md-6 col-xl-3">
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
      list: {
        okupa:[],
        owner:[]
      },
      role: '',
      propertydata: '',
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
    $("#inputFiltro").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#listProperty .filter").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      })
    })
  },
  methods: {
    loadProperties() {
            const url = 'http://localhost:4444/'+'properties'
            var index2 = ''
            var index3 = ''
            axios.get(url)
            .then(response => {
              this.datos['properties'] = response.data
              let promises = []
              let promises2 = []
              for (var i=0; i<this.datos['properties'].length; i++)
              {
                index2 = this.datos['properties'][i].okupa_id
                const url2 = 'http://localhost:4444/okupas/'+ index2
                promises.push (
                axios.get(url2)
                .then(response => {
                  var a = response.data.okupa_id
                  this.list.okupa[a]= response.data
                })
                .catch(error => {
                  console.log(error)
                }) )

                index3 = this.datos['properties'][i].owner_id
                const url3 = 'http://localhost:4444/owners/'+ index3
                promises2.push (
                axios.get(url3)
                .then(response => {
                  var x = response.data.owner_id
                  this.list.owner[x]= response.data
                })
                .catch(error => {
                  console.log(error)
                }) )
              }
              Promise.all(promises).then(()=> { 
                this.datos.okupas = this.list.okupa               
              })
              Promise.all(promises2).then(()=> { 
                this.datos.owners = this.list.owner
              })
            })
            .catch(error => {
              console.log(error)
            })
          },
    AdminEditProperty() {
      this.$modal.show('edit-property-modal', {usedProperty: this.propertydata})
    },
    getproperty(index){
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
    deleteProperty(target) {
      var r = confirm("¿Estás seguro de querer borrarla?")
      if (r) {
        axios({
          method: 'delete',
          url:'http://localhost:4444/properties/'+target,
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
table {
  font-size: smaller;
}
tbody tr:hover {  
  background-color: #dfedc4;  
  color: #666666;
  cursor: pointer;  
}
</style>