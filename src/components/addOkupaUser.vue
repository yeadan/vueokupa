<template>
<div class="container">
<modal class="md" name="admin-add-okupa-modal" height="auto" @before-open="beforeOpen" transition="pop-out" :scrollable="true" >
<div class="card" style="padding:5%">
  <div class="card-body">
    <label for="selectUsr"><strong>Usuario </strong></label>
    <select id="selectUsr" class="col6 mx-4" v-if="Object.keys(listausers).length > 0" v-model="selected">
        <option v-bind:value="0" disabled >Seleccione un usuario</option>
            <option v-for="(user, index) in listausers" :key="index" v-bind:value="user.user_id" v-text="user.full_name" ></option>
    </select>
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

import '../interceptor'
import axios from 'axios'
export default {
  name: 'DemoLoginModal',
  data() {
            return {
                selected:0,
                listausers:[]
            }
        },
  methods: {
    beforeOpen(event) {
        this.activeOkupa =event.params.asoOkupa
        this.loadusers()
    },
    loadusers() {
      const url = 'http://localhost:4444/users'
      axios.get(url)
      .then(response => {
        this.listausers = response.data
      })
      .catch(error => {
        console.log(error)
      })
    },
    clickOK() {
      if (this.selected > 0) {
          this.$emit('addNewUser',this.selected)
          this.$modal.hide('admin-add-okupa-modal')
      }
    },
      clickClose() {
          this.$modal.hide('admin-add-okupa-modal')
      }
  }
}
</script>
