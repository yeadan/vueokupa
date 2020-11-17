<template>
<div class="container">
<modal class="md" name="edit-owner-modal" @before-open="beforeOpen" transition="pop-out" height="auto" :scrollable="true" >
<div class="card" style="padding:5%">
  <div class="card-body">
    <form >
        <div class="form-group">
            <label for="input-name"><strong>Nombre </strong></label>            
            <input type="text" v-model="input.name" class="form-control" id="input-name" placeholder="Name">
            <label for="input-type"><strong>Tipo </strong></label>            
            <input type="text" v-model="input.type" class="col-6 form-control" id="input-type" placeholder="Type">
            <label for="input-message"><strong>Descripción </strong></label>                        
            <textarea class="form-control" v-model="input.description" name="description" type="text" id="input-message" placeholder="Description">
            </textarea>
        </div>
    </form>
        <div class="mx-auto col-6">
            <button @click="editOk"  class="btn btn-success" >Guardar</button>
            <button @click="editClose(false)"  class="btn btn-danger" data-dismiss="modal">Cancelar</button>
        </div>
  </div>
</div>
</modal>
</div>
</template>
<script>
import {dataMixins} from '@/mixins.js'
export default {
  data() {
            return {
                input: {
                    id:0,
                    name: "",
                    type:"",
                    description: ""
                }
            }
        },
        mixins: [dataMixins],
  methods: {
        editClose(bool) {
            this.clickClose('edit-owner-modal')
            if (bool) 
                this.$emit('exit', true)
        },
        editOk() {
            this.clickOK({name:this.input.name,type_owner:this.input.type, description:this.input.description},'put','owners/'+this.input.id,false)
            this.editClose(true)
        },
      beforeOpen(event) {
          this.input.id = event.params.usedOwner.owner_id
          this.input.name = event.params.usedOwner.name
          this.input.type = event.params.usedOwner.type_owner
          this.input.description = event.params.usedOwner.description
      }
  }
}
</script>
