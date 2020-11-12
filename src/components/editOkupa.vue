<template>
<div class="container">
<modal class="md" name="edit-okupa-modal" @before-open="beforeOpen" transition="pop-out" height="auto" :scrollable="true" >
<div class="card" style="padding:5%">
  <div class="card-body">
    <form >
        <div class="form-group">
            <label for="input-name"><strong>Nombre </strong></label>                        
            <input type="text" v-model="input.name" class="form-control" id="input-name" placeholder="Name">
            <label for="input-message"><strong>Descripción </strong></label>            
            <textarea class="form-control" v-model="input.description" name="description" type="text" id="input-message" placeholder="Description">
            </textarea>
        </div>
    </form>
        <div class="col-6 mx-auto">
            <button @click="clickOK({name:input.name, description:input.description},'put','okupas/'+input.id,false);clickClose('edit-okupa-modal')"  class="btn btn-success" >Guardar</button>
            <button @click="clickClose('edit-okupa-modal')"  class="btn btn-danger" data-dismiss="modal">Cancelar</button>
        </div>
  </div>
</div>
</modal>
</div>
</template>
<script>
import {modalMixins} from '@/mixins.js'
export default {
  data() {
            return {
                input: {
                    id:0,
                    name: "",
                    description: ""
                }
            }
        },
    mixins: [modalMixins],
    methods: {
      beforeOpen(event) {
          this.input.id = event.params.usedOkupa.okupa_id
          this.input.name = event.params.usedOkupa.name
          this.input.description = event.params.usedOkupa.description
      }
  }
}
</script>
<style scoped>