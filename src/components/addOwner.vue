<template>
<div class="container">
<modal name="add-owner-modal" transition="pop-out" height="auto" :scrollable="true" >
<div class="card" style="padding:5%">
  <div class="card-body">
    <form >
        <div class="form-group">
            <label for="input-name"><strong>Nombre </strong></label>
            <input type="text" v-model="input.name" class="form-control" id="input-name" placeholder="Name">
            <label for="input-type"><strong>Tipo </strong></label>
            <input type="text" v-model="input.type" class="form-control col-6" id="input-type" placeholder="Type">
            <label for="input-message"><strong>Descripción </strong></label>
            <textarea class="form-control" v-model="input.description" name="description" type="text" id="input-message" placeholder="Description">
            </textarea>
        </div>
    </form>
        <div class="col-6 mx-auto">
            <button @click="clickOK()"  class="btn btn-success" >Añadir</button>
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
                    name: "",
                    type:"",
                    description: ""
                }
            }
        },
  methods: {
      clickOK() {
          if(this.input.name != "" && this.input.type != "" && this.input.description != "") {
              let thisDate = new Date().getTime()
              let newDate = new Date(thisDate).toISOString()
              let data = JSON.stringify({name:this.input.name,type_owner:this.input.type,
                    description:this.input.description,created:newDate})
                   const axios = require ('axios')
                    axios({
                        method: 'post',
                        url:'http://localhost:4444/owners',
                        data:data,
                    }).then(function (response) {
                        // Respuesta
                        console.log(response.data)
                        location.reload(false)
                        alert("Creado")
                    }).catch(function (error) {     
                        console.log("ERROR: "+error)
                    })        
          }    
      },
      clickClose() {
          this.$modal.hide('add-owner-modal')
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
