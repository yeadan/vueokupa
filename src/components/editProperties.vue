<template>
<div class="container">
<modal class="md" name="edit-property-modal" @before-open="beforeOpen" transition="pop-out" height="auto" :scrollable="true" >
<div class="card" style="padding:5%">
  <div class="card-body">
    <form >
        <div class="form-group">
            <label for="selectOwn"><strong>Propietario </strong></label>
            <select class="col-6 mx-4" id="selectOwn" v-if="Object.keys(datos.owners).length > 0" v-model="selectedOwner">
                <option v-bind:value="0" disabled >Seleccione un propietario</option>
                <option v-for="(owner, index) in datos.owners" :key="index" v-bind:value="owner.owner_id" v-text="owner.name" ></option>
            </select>
            <div class="col-3"/>
            <label for="selectAso" ><strong>Asociación </strong></label>
            <select id="selectAso" class="mx-4 col-6" v-if="Object.keys(datos.okupas).length > 0" v-model="selectedOkupa">
                <option v-bind:value="0" disabled >Seleccione una asociación</option>
                <option v-for="(okupa, index) in datos.okupas" :key="index" v-bind:value="okupa.okupa_id" v-text="okupa.name" ></option>
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
            <button @click="clickOK({type:input.type,description:input.description,owner_id:selectedOwner,okupa_id:selectedOkupa},'put','properties/'+input.id,false)"  class="btn btn-success" >Guardar</button>
            <button @click="clickClose('edit-property-modal')"  class="btn btn-danger" data-dismiss="modal">Cancelar</button>
        </div>
  </div>
</div>
</modal>
</div>
</template>

<script>
import {modalMixins} from '../mixins.js'
import {dataMixins} from '../mixins.js'
import '../interceptor'
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
            }
        },
        mixins:[modalMixins,dataMixins],
  methods: {
      beforeOpen(event) {
          this.input.id = event.params.usedProperty.property_id
          this.input.type = event.params.usedProperty.type
          this.input.description = event.params.usedProperty.description
          this.load('owners')
          this.load('okupas')
      }
  }
}
</script>