<template>
<div class="container">
<modal class="md" name="edit-property-modal" @before-open="beforeOpen" transition="pop-out" height="auto" :scrollable="true" >
<div class="card" style="padding:5%">
  <div class="card-body">
    <form autocomplete="off">
        <div class="form-group">
            <label for="selectOwn"><strong>Propietario </strong></label>
            <select class="col-6 mx-4" id="selectOwn" v-if="Object.keys(datos.owners).length > 0" v-model="selectedOwner">
              <option v-for="(owner2, index2) in datos.owners" :key="index2" :value="owner2.owner_id" v-text="owner2.name" ></option>
            </select>
            <div class="col-3"/>
            <label for="selectAso" ><strong>Asociación </strong></label>
            <select id="selectAso" class="mx-4 col-6" v-if="Object.keys(datos.okupas).length > 0" v-model="selectedOkupa">
                <option v-for="(okupa2, index_k2) in datos.okupas" :key="index_k2" :value="okupa2.okupa_id" v-text="okupa2.name" ></option>
            </select>
            <div class="col-3"/>
            <label for="select_typ"><strong>Tipo </strong></label>
            <select id="select_typ"  class="mx-4 col-4" v-model="selectedType" >
            <option :value="input.type" disabled hidden> {{ input.type }} </option>
            <option value="estudio" >Estudio</option>
            <option value="chalet">Chalet</option>
            <option value="chalet adosado">Chalet adosado</option>
            <option value="piso">Piso</option>
            <option value="local">Local</option>
            <option value="otro">Otro</option>
          </select>
            <div class="col-3"/>
            <label for="input-message"><strong>Descripción </strong></label>
            <textarea class="form-control" v-model="input.description" name="description" type="text" id="input-message" placeholder="Description">
            </textarea>
        </div>
    </form>
        <div class="mx-auto col-6">
            <button v-if="(selectedType!=0 && selectedOwner!=0 && selectedOkupa!=0)" @click="clickOK({type:selectedType,description:input.description,owner_id:selectedOwner,okupa_id:selectedOkupa},'put','properties/'+input.property_id,false); $modal.hide('edit-property-modal');clean()"  class="btn btn-success" >Guardar</button>
            <button v-else disabled class="btn btn-success" >Guardar</button>
            <button @click="$modal.hide('edit-property-modal');clean()"  class="btn btn-danger" data-dismiss="modal">Cancelar</button>
        </div>
  </div>
</div>
</modal>
</div>
</template>

<script>
import {modalMixins,dataMixins} from '../mixins.js'
import '../interceptor'
export default {

  data() {
            return {
                selectedOwner:0,
                selectedOkupa:0,
                selectedType:0,
                input: {},
                //datos: {}
            }
        },
        mixins:[modalMixins,dataMixins],
  methods: {
      clean () {
        this.selectedOwner = 0
        this.selectedOkupa = 0
        this.selectedType = 0
      },
      beforeOpen(event) {
        this.input = event.params.usedProperty
        this.selectedType = this.input.type
        this.selectedOkupa = this.input.okupa_id
        this.selectedOwner = this.input.owner_id
        this.load('owners')
        this.load('okupas')
      }
  }
}
</script>