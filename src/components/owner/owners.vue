<template >
  <div id="owners" class="row">
    <div class="col-lg-6 col-md-12 col-xl-6">
      <div style="margin: 10px">
        <div class="card-title row">
          <h3 style="text-align: right" class="col-7">Propietarios</h3>
          <div class="col-1" />
          <form class="col-3">
            <input
              type="text"
              id="inputFiltro"
              placeholder="Filtrar..."
              class="form-control inputsm"
            />
          </form>
          <i
            v-if="role == 'admin'"
            @click="addOwner"
            title="Añadir"
            style="color: green; margin: 7px"
            class="fa fa-plus"
          ></i>
        </div>
        <AddOwner @exit="closeModal"></AddOwner>
        <div v-if="loading" class="spinner-border text-dark"></div>
        <div v-else>
          <div v-if="Object.keys(datos.owners).length > 0">
            <table id="listOwner" class="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="filter"
                  v-for="owner in datos.owners"
                  :key="owner.owner_id"
                  @click="getowner(owner.owner_id)"
                >
                  <td>{{ owner.owner_id }}</td>
                  <td>{{ owner.name }}</td>
                  <td>{{ owner.type_owner }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="alert alert-danger" role="alert">
            No hay ningún propietario
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-6 col-md-12 col-xl-6">
      <div class="card h-100">
        <div class="card-body">
          <div
            v-if="role == 'admin' && ownersdata != ''"
            class="row card-title"
          >
            <h5 class="col-9">Propietario</h5>
            <i
              @click="editOwner"
              title="Editar"
              class="col-1 fas fa-edit"
            ></i>
            <i
              @click="deleteOwner"
              title="Borrar"
              class="col-1 fas fa-trash-alt"
            ></i>
          </div>
          <div v-else class="card-title">
            <h5>Propietario</h5>
          </div>
          <EditOwner @exit="closeModal"></EditOwner>
          <div align="left" v-if="ownersdata != ''">
            <p class="card-text">
              <small
                ><strong>Id propietario: </strong
                >{{ ownersdata.owner_id }}</small
              >
            </p>
            <p class="card-text">
              <small><strong>Nombre: </strong>{{ ownersdata.name }}</small>
            </p>
            <p class="card-text">
              <small><strong>Tipo: </strong>{{ ownersdata.type_owner }}</small>
            </p>
            <p class="card-text">
              <small
                ><strong>Descripción: </strong>
                {{ ownersdata.description }}</small
              >
            </p>
            <p class="card-text">
              <small
                ><strong>Fecha registro: </strong
                >{{ ownersdata.created }}</small
              >
            </p>
          </div>
          <div v-else class="alert alert-danger" role="alert">
            <small>Ningun propietario seleccionado</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dataMixins } from "@/mixins.js";
import addOwner from "@/components/owner/addOwner.vue";
import editOwner from "./editOwner.vue";
import "@/interceptor";
import $ from "jquery";
import axios from "axios";
export default {
  data() {
    return {
      role: "",
      ownersdata: "",
      activeOwner: 0,
    };
  },
  mixins: [dataMixins],
  components: {
    AddOwner: addOwner,
    EditOwner: editOwner,
  },
  mounted() {
    this.role = this.$store.getters.getRole;
    this.user_id = this.$store.getters.getUserID;
    this.load("owners");

    //Para filtrar los datos, con jquery
    $("#inputFiltro").on("keyup", function () {
      var value = $(this).val().toLowerCase();
      $("#listOwner .filter").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
    });
  },
  methods: {
    closeModal() {
      this.ownersdata = "";
      this.load("owners");
    },
    addOwner() {
      this.$modal.show("add-owner-modal");
    },
    getowner(index) {
      this.activeOwner = index;
      const url = this.url2 + "owners/" + index;
      axios
        .get(url)
        .then((response) => {
          this.ownersdata = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editOwner() {
      this.$modal.show("edit-owner-modal", { usedOwner: this.ownersdata });
    },
    deleteOwner() {
      var self = this;
      var r = confirm("¿Estás seguro de querer borrarlo?");
      if (r) {
        axios({
          method: "delete",
          url: this.url2 + "owners/" + this.activeOwner,
        })
          .then(() => {
            self.load("owners");
            alert("Borrado!");
          })
          .catch(function (error) {
            console.log("ERROR: " + error);
          });
      }
    },
  },
};
</script>
