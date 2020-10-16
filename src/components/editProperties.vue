<template>
<div class="container">
<modal name="edit-property-modal" @before-open="beforeOpen" transition="pop-out" height="auto" :scrollable="true" >
<div class="card" style="padding:5%">
  <div class="card-body">
    <form >
        <div class="form-group">
            <label for="selectOwn"><strong>Propietario </strong></label>
            <select class="col-6 mx-4" id="selectOwn" v-if="Object.keys(listaowners).length > 0" v-model="selectedOwner">
                <option v-bind:value="0" disabled >Seleccione un propietario</option>
                <option v-for="(owner, index) in listaowners" :key="index" v-bind:value="owner.owner_id" v-text="owner.name" ></option>
            </select>
            <div class="col-3"/>
            <label for="selectAso" ><strong>Asociación </strong></label>
            <select id="selectAso" class="mx-4 col-6" v-if="Object.keys(listaokupas).length > 0" v-model="selectedOkupa">
                <option v-bind:value="0" disabled >Seleccione una asociación</option>
                <option v-for="(okupa, index) in listaokupas" :key="index" v-bind:value="okupa.okupa_id" v-text="okupa.name" ></option>
            </select>
            <div class="col-3"/>
            <label for="input-type"><strong>Tipo </strong></label>
            <input type="text" v-model="input.type" class="form-control col-6" id="input-type" placeholder="Type">
            <div class="col-3"/>
            <label for="input-message"><strong>Descripción </strong></label>
            <textarea class="form-control" v-model="input.description" name="description" type="text" id="input-message" placeholder="Description">
            </textarea>
        </div>
    </form>
        <div class="mx-auto col-6">
            <button @click="clickOK()"  class="btn btn-success" >Guardar</button>
            <button @click="clickClose()"  class="btn btn-danger" data-dismiss="modal">Cancelar</button>
        </div>
  </div>
</div>
</modal>
</div>
</template>

<script>
import '../interceptor'
import axios from 'axios'
export default {
  data() {
            return {
                selectedOwner:0,
                selectedOkupa:0,
                input: {
                    id:0,
                    type: "",
                    description: ""
                },
                listaowners:[],
                listaokupas:[]
            }
        },
  methods: {
      beforeOpen(event) {
          this.input.id = event.params.usedProperty.property_id
          this.input.type = event.params.usedProperty.type
          this.input.description = event.params.usedProperty.description
          this.loadowners()
          this.loadokupas()
      },
      loadowners() {
      const url = 'http://localhost:4444/owners'
      axios.get(url)
      .then(response => {
        this.listaowners = response.data
      })
      .catch(error => {
        console.log(error)
      })
    },
    loadokupas() {
      const url = 'http://localhost:4444/okupas'
      axios.get(url)
      .then(response => {
        this.listaokupas = response.data
      })
      .catch(error => {
        console.log(error)
      })
    },
      clickOK() {
          if(this.input.type != "" && this.selectedOkupa > 0 && this.selectedOwner > 0 &&this.input.description != "") {
              let data = JSON.stringify({type:this.input.type,description:this.input.description,
              owner_id:this.selectedOwner,okupa_id:this.selectedOkupa})
                   const axios = require ('axios')
                    axios({
                        method: 'put',
                        url:'http://localhost:4444/properties/'+this.input.id,
                        data:data,
                    }).then(function (response) {
                        // Respuesta
                        console.log(response.data)
                        location.reload(false)
                        console.log("Guardado")
                    }).catch(function (error) {     
                        console.log("ERROR: "+error)
                    })        
          }
          
      },
      clickClose() {
          this.$modal.hide('edit-property-modal')
      }
  }
}
</script>
<style scoped>

input {
    padding:10px;
    outline: none;
    transition: 0.5s all;
    padding: 4px 8px;
    margin-bottom: 15px;
    box-sizing: border-box;
}
button {
    border-radius: 4px;
    padding: 10px;
    margin-right: 10px;
    transition: 0.1s all;
    margin-top: 8px;
}
.button-set {
    margin-bottom:8px;
}
.pop-out-enter-active,
.pop-out-leave-active {
    transition: all 0.5s;
}
.pop-out-enter,
.pop-out-leave-active {
    opacity: 0;
    transform: translateY(24px);
}
</style>