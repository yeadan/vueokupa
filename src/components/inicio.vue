<template>
  <div class="body">
    <div id="inicio">
      <h3>Página de Inicio ({{role}})</h3>
      <br>
      <br>
      <img src="../../public/logo_okupa.png">
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
    this.role = localStorage.getItem("role")
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
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
