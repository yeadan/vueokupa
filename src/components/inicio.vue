<template>
  <div class="body">
    <div id="inicio">
      <h3 v-if='role!=""'>Página de Inicio ({{role}})</h3>
      <h3 v-else>Página de Inicio</h3>
      <br>
      <br>
      <img src="/logo_okupa.png">
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      role:""
    }
  },
  mounted() {
    this.role = this.$store.getters.getRole
  }
}
</script>
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
