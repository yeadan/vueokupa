<template>
<div class="container">
<modal name="edit-user-modal" @before-open="beforeOpen" transition="pop-out" height="auto" :scrollable="true" >
<div class="card" style="padding:5%">
  <div class="card-body">
    <form >
        <div class="form-group" >
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
                    password:"",
                    name: "",
                    role:""
                }, 
                role: ""
            }
        },
    mounted() {
        this.role = localStorage.getItem("role")
    },
    methods: {
      beforeOpen(event) {
          this.input.id = event.params.usedUser.user_id
          this.input.name = event.params.usedUser.full_name
          this.input.role = event.params.usedUser.role
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
                        url:'http://localhost:4444/users/'+this.input.id,
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
          this.$modal.hide('edit-user-modal')
      }
  }
}
</script>
<style scoped>

label {
    display: inline-block;
    width: 100px;
}
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
