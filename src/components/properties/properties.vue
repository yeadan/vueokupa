<template >
  <div class="row" id="properties">
    <div class="col-lg-6 col-md-12 col-xl-6">
      <div style="margin: 10px">
        <div class="card-title row">
          <h3 style="text-align: right" class="col-7">Propiedades</h3>
          <div class="col-1" />
          <form class="col-3">
            <input
              type="text"
              id="inputFiltro"
              placeholder="Filtrar..."
              class="form-control inputsm"
            />
          </form>
          <router-link v-if="role == 'admin'" to="/addproperties"
            ><i
              style="color: green; margin: 7px"
              title="Añadir"
              class="fa fa-plus"
          /></router-link>
        </div>
        <div v-if="loading" class="spinner-border text-dark"></div>
        <div v-else>
          <div v-if="Object.keys(datos.properties).length > 0">
            <table id="listProperty" class="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="filter"
                  v-for="mydata in datos.properties"
                  :key="mydata.property_id"
                  @click="getproperty(mydata.property_id)"
                >
                  <td>{{ mydata.property_id }}</td>
                  <td>{{ cleanString(mydata.type) }}</td>
                  <td>{{ cleanString(mydata.poblacion) }}</td>
                  <td>{{ cleanString(mydata.comunidad) }}</td>
                  <td v-if="mydata.description.length < 25">{{ mydata.description }}</td>
                  <td v-else>
                    {{ mydata.description.substring(0, 25) + ".." }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="alert alert-danger" role="alert">
            No hay propiedades registradas
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-3 col-md-6 col-xl-3">
      <div class="card h-100">
        <div class="card-body">
          <div
            v-if="role == 'admin' && propertydata != ''"
            class="row card-title"
          >
            <h5 class="col-9">Propiedad</h5>
            <i
              title="Editar"
              @click="AdminEditProperty"
              class="col-1 fas fa-edit"
            ></i>
            <i
              title="Borrar"
              @click="deleteProperty(propertydata.property_id)"
              class="col-1 fas fa-trash-alt"
            ></i>
            <AdminEditProperty @exit="closeModal"></AdminEditProperty>
          </div>
          <div v-else class="card-title">
            <h5>Propiedad</h5>
          </div>
          <div align="left" v-if="propertydata != ''">
            <p class="card-text">
              <small
                ><strong>Id propiedad: </strong
                >{{ propertydata.property_id }}</small
              >
            </p>
            <p class="card-text">
              <small
                ><strong>Propietario: </strong
                >{{ propertydata.owner.name }}</small
              >
            </p>
            <p class="card-text">
              <small
                ><strong>Asociación: </strong
                >{{ propertydata.okupa.name }}</small
              >
            </p>
            <p class="card-text">
              <small
                ><strong>Descripción: </strong>
                {{ propertydata.description }}</small
              >
            </p>
            <p class="card-text">
              <small
                ><strong>Tipo: </strong
                >{{ cleanString(propertydata.type) }}</small
              >
            </p>
            <p class="card-text">
              <small
                ><strong>Fecha registro: </strong
                >{{ propertydata.created }}</small
              >
            </p>
          </div>
          <div v-else class="alert alert-danger" role="alert">
            <small>Ninguna propiedad seleccionada</small>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-3 col-md-6 col-xl-3">
      <div class="card h-100">
        <div class="card-body">
          <div
            v-if="role == 'admin' && propertydata != ''"
            class="row card-title"
          >
            <h5 class="col-12">Dirección</h5>
          </div>
          <div v-else class="card-title">
            <h5>Dirección</h5>
          </div>
          <div align="left" v-if="propertydata != ''">
            <p class="card-text">
              <small
                ><strong>Calle: </strong
                >{{ cleanString(propertydata.calle) }}</small
              >
            </p>
            <div align="left" class="card-text">
              <p>
                <small
                  ><strong>Número: </strong>{{ propertydata.numero }}</small
                >
                <small class="ml-3"
                  ><strong> Piso: </strong>{{ propertydata.piso }}
                  <strong v-if="propertydata.piso > 0">º&nbsp; </strong>
                  <strong v-else>&nbsp; </strong
                  >{{ propertydata.puerta.toUpperCase() }}</small
                >
              </p>
            </div>
            <p class="card-text">
              <small
                ><strong>CP: </strong>{{ propertydata.codigo_postal }}</small
              >
            </p>
            <p class="card-text">
              <small
                ><strong>Núcleo: </strong>
                {{ cleanString(propertydata.nucleo) }}</small
              >
            </p>
            <p class="card-text">
              <small
                ><strong>Población: </strong
                >{{ cleanString(propertydata.poblacion) }}</small
              >
            </p>
            <p class="card-text">
              <small
                ><strong>Municipio: </strong
                >{{ cleanString(propertydata.municipio) }}</small
              >
            </p>
            <p class="card-text">
              <small
                ><strong>Provincia: </strong
                >{{ cleanString(propertydata.provincia) }}</small
              >
            </p>
            <p class="card-text">
              <small
                ><strong>Comunidad: </strong
                >{{ cleanString(propertydata.comunidad) }}</small
              >
            </p>
          </div>
          <div v-else class="alert alert-danger" role="alert">
            <small>Ninguna propiedad seleccionada</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dataMixins } from "@/mixins.js";
import adminEditProperty from "./editProperties.vue";
import "@/interceptor";
import axios from "axios";
import $ from "jquery";
export default {
  data() {
    return {
      role: "",
      propertydata: "",
    };
  },
  mixins: [dataMixins],
  components: {
    AdminEditProperty: adminEditProperty,
  },

  mounted() {
    this.role = this.$store.getters.getRole;
    this.user_id = this.$store.getters.getUserID;
    this.load("properties");

    //Para filtrar los datos, con jquery
    $("#inputFiltro").on("keyup", function () {
      var value = $(this).val().toLowerCase();
      $("#listProperty .filter").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
    });
  },
  methods: {
    closeModal() {
      this.propertydata = "";
      this.load("properties");
    },
    AdminEditProperty() {
      this.$modal.show("edit-property-modal", {
        usedProperty: this.propertydata,
      });
    },
    getproperty(index) {
      const url = this.url2 + "properties/" + index;
      axios
        .get(url)
        .then((response) => {
          this.propertydata = response.data;
        })
        .catch((error) => {
          console.log(error);
          return;
        });
    },
    deleteProperty(target) {
      var r = confirm("¿Estás seguro de querer borrarla?");
      var self = this;
      if (r) {
        axios({
          method: "delete",
          url: this.url2 + "properties/" + target,
        })
          .then(() => {
            self.load("properties");
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