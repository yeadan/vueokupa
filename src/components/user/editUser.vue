<template>
<div class="container">
<modal class="md" name="edit-user-modal" @before-open="beforeOpen" transition="pop-out" height="auto" :scrollable="true" >
<div class="card" style="padding:5%">
  <div class="card-body">
    <form >
        <div class="form-group" >
            <div class="row">
            <div class="col-10">
                <label for="input-username"><strong>Username</strong></label>
                <input type="text" disabled v-model="input.username" class="form-control" id="input-username">
            </div>
            <div class="col-2">
                <label for="input-id"><strong>User ID</strong></label>
                <input style="text-align:center" type="text" disabled v-model="input.id" class="form-control" id="input-id">
            </div>
            </div>
            <label for="input-name"><strong>Name</strong></label>
            <input type="text" v-model="input.name" class="form-control" id="input-name" placeholder="Name">
            <label for="input-password"><strong>Password</strong></label>
            <input type="password" v-model="input.password" class="form-control" id="input-password" placeholder="New password">
            <label v-if="role=='admin'" for="input-role"><strong>Role</strong></label>
            <select v-if="role=='admin'" id="input-role" class="form-control" v-model="input.role">
                <option value="0" disabled >Selecciona un rol</option>
                <option>admin</option>
                <option>user</option>
                <option>anonymous</option>
            </select>
            <label for="input-created"><strong>Registered</strong></label>
            <input type="text" disabled v-model="input.registered" class="form-control" id="input-created">
        </div>
    </form>
        <div class="col-6 mx-auto">
            <button @click="clickOK();clickClose()"  class="btn btn-success" >Guardar</button>
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
                    password:"",
                    name: "",
                    role:"",
                    registered:"",
                    username:""
                }, 
                role: ""
            }
        },
    mounted() {
        this.role = this.$store.getters.getRole
    },
    methods: {
      beforeOpen(event) {
          this.input.id = event.params.usedUser.user_id
          this.input.name = event.params.usedUser.full_name
          this.input.role = event.params.usedUser.role
          this.input.registered = event.params.usedUser.registered
          this.input.username = event.params.usedUser.username
          this.input.password = ""

      },
      clickOK() {
          if(this.input.name != "" && this.input.role != "") {
              let data = ""
              if (this.input.password !="") {
                  data = JSON.stringify({full_name:this.input.name, 
                password:this.input.password,role:this.input.role})
              } else {
                data = JSON.stringify({full_name:this.input.name, 
                role:this.input.role}) }

                   const axios = require ('axios')
                    axios({
                        method: 'put',
                        url:this.url2+'users/'+this.input.id,
                        data:data,
                    }).then(function (response) {
                        // Respuesta
                        console.log(response.data)
                        console.log("Guardado")
                    }).catch(function (error) {     
                        console.log("ERROR: "+error)
                    })        
          }
      },
      clickClose() {
          this.$modal.hide('edit-user-modal')
      }
  }
}
</script>
