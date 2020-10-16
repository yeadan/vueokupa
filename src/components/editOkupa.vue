<template>
<div class="container">
<modal name="edit-okupa-modal" @before-open="beforeOpen" transition="pop-out" height="auto" :scrollable="true" >
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
            <button @click="clickOK()"  class="btn btn-success" >Guardar</button>
            <button @click="clickClose()"  class="btn btn-danger" data-dismiss="modal">Cancelar</button>
        </div>
  </div>
</div>
</modal>
</div>
</template>
<script>

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
  methods: {
      beforeOpen(event) {
          this.input.id = event.params.usedOkupa.okupa_id
          this.input.name = event.params.usedOkupa.name
          this.input.description = event.params.usedOkupa.description
      },
      clickOK() {
          if(this.input.name != "" && this.input.description != "") {
              let data = JSON.stringify({name:this.input.name,
                    description:this.input.description})
                   const axios = require ('axios')

                    axios({
                        method: 'put',
                        url:'http://localhost:4444/okupas/'+this.input.id,
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
          this.$modal.hide('edit-okupa-modal')
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
