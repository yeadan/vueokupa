<template>
    <div class="container">
        <modal class="md" name="add-okupa-modal" transition="pop-out" height="auto" :scrollable="true" >
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
                        <button @click="addOK"  class="btn btn-success" >Añadir</button>
                        <button @click="addClose(false)"  class="btn btn-danger" data-dismiss="modal">Cancelar</button>
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
                    name: "",
                    description: ""
                }
            }
        },
    mixins: [dataMixins],
    methods: {
        addClose(bool) {
            this.clickClose('add-okupa-modal')
            if (bool) 
                this.$emit('exit', true)
        },
        addOK() {
            this.clickOK({name:this.input.name, description:this.input.description},'post','okupas',true)
            this.addClose(true)
        }
    }
}
</script>
