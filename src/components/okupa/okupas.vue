<template >
  <div id="okupas" class="row">
    <div class="col-lg-6 col-md-12 col-xl-6">
      <div style="margin: 10px">
        <div class="card-title row">
          <h3 style="text-align: right" class="col-7">Asociaciones</h3>
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
            @click="addOkupa"
            title="Añadir"
            style="color: green; margin: 7px"
            class="fa fa-plus"
          ></i>
        </div>
        <AddOkupa @exit="closeModal"></AddOkupa>
        <div v-if="loading" class="spinner-border text-dark"></div>
        <div v-else>
          <div v-if="Object.keys(datos.okupas).length > 0">
            <table id="listOkupa" class="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="filter"
                  v-for="okupa in datos.okupas"
                  :key="okupa.okupa_id"
                  @click="getokupa(okupa.okupa_id), getmembers(okupa.okupa_id)"
                >
                  <td>{{ okupa.okupa_id }}</td>
                  <td>{{ okupa.name }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="alert alert-danger" role="alert">
            No hay asociaciones okupas
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-3 col-xl-3 col-md-6">
      <div class="card h-100">
        <div class="card-body">
          <div
            v-if="role == 'admin' && okupasdata != ''"
            class="row card-title"
          >
            <h5 class="col-9">Asociación</h5>
            <i
              @click="editOkupa"
              title="Editar"
              class="col-1 fas fa-edit"
            ></i>
            <i
              @click="deleteOkupa"
              title="Borrar"
              class="col-1 fas fa-trash-alt"
            ></i>
          </div>
          <div v-else class="card-title">
            <h5>Asociación</h5>
          </div>
          <EditOkupa @exit="closeModal"></EditOkupa>
          <div align="left" v-if="okupasdata != ''">
            <p class="card-text">
              <small
                ><strong>Id asociación: </strong
                >{{ okupasdata.okupa_id }}</small
              >
            </p>
            <p class="card-text">
              <small><strong>Nombre: </strong>{{ okupasdata.name }}</small>
            </p>
            <p class="card-text">
              <small
                ><strong>Descripción: </strong>
                {{ okupasdata.description }}</small
              >
            </p>
            <p class="card-text">
              <small
                ><strong>Fecha registro: </strong
                >{{ okupasdata.created }}</small
              >
            </p>
          </div>
          <div v-else class="alert alert-danger" role="alert">
            <small>Ninguna asociación seleccionada</small>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-3 col-md-6 col-xl-3">
      <div class="card h-100">
        <div class="card-body">
          <div class="card-tittle row">
            <h5 class="card-title col-10">Miembros</h5>
            <i
              v-if="role == 'admin'"
              title="Añadir miembro"
              @click="adminAddMember"
              style="color: green"
              class="col-1 fa fa-user-plus"
            ></i>
            <i
              v-else
              @click="addMember"
              title="Añadir Miembro"
              style="color: green"
              class="col-1 fa fa-user-plus"
            ></i>
            <AdminAddOkupa @addNewUser="addNewUserFunc"></AdminAddOkupa>
          </div>
          <div v-if="Object.keys(miembrosdata).length > 0">
            <div
              class="row"
              v-for="(miembro, index) in miembrosdata"
              :key="index"
            >
              <div id="members" class="col-8">
                <p class="card-text">
                  <small>{{ miembro.full_name }} </small>
                </p>
              </div>
              <div
                v-if="role == 'admin' || user_id == miembro.user_id"
                class="col-4"
              >
                <i
                  @click="delMember(miembro.user_id)"
                  title="Borrar miembro"
                  style="color: red"
                  class="fa fa-remove"
                ></i>
              </div>
            </div>
          </div>
          <div v-else class="alert alert-danger" role="alert">
            <small>No se ha encontrado ningún miembro</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dataMixins } from "@/mixins.js";
import addOkupaUser from "@/components/okupa/addOkupaUser.vue";
import addOkupa from "@/components/okupa/addOkupa.vue";
import editOkupa from "@/components/okupa/editOkupa.vue";
import "@/interceptor";
import axios from "axios";
import $ from "jquery";
export default {
  data() {
    return {
      role: "",
      okupasdata: "",
      miembrosdata: [],
      activeOkupa: 0,
      adminUser: 0,
    };
  },
  mixins: [dataMixins],
  components: {
    AddOkupa: addOkupa,
    EditOkupa: editOkupa,
    AdminAddOkupa: addOkupaUser,
  },
  mounted() {
    this.role = this.$store.getters.getRole;
    this.user_id = this.$store.getters.getUserID;
    this.load("okupas");

    //Para filtrar los datos, con jquery
    $("#inputFiltro").on("keyup", function () {
      var value = $(this).val().toLowerCase();
      $("#listOkupa .filter").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
    });
  },
  /* No necesario, usando events con emit
  watch: {
    datos: {
      handler() {
      console.log("CAMBIO")
      },
      deep:true
    }
  },*/
  methods: {
    clean() {
      this.okupasdata = "";
      this.miembrosdata = "";
      this.datos.okupas = {};
    },
    closeModal() {
      this.clean();
      this.load("okupas");
    },
    addNewUserFunc(data) {
      this.adminUser = data;
      this.addMember();
    },
    addOkupa() {
      this.$modal.show("add-okupa-modal");
    },
    getokupa(index) {
      const url = this.url2 + "okupas/" + index;
      axios
        .get(url)
        .then((response) => {
          this.okupasdata = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getmembers(index) {
      this.activeOkupa = index;
      const url = this.url2 + "okupas/users/" + index;
      axios
        .get(url)
        .then((response) => {
          this.miembrosdata = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    delMember(index) {
      var r = confirm("¿Estás seguro de querer borrarlo?");
      if (r && this.okupasdata != "") {
        const url = this.url2 + "okupas/" + this.activeOkupa + "/" + index;
        axios
          .delete(url)
          .then((response) => {
            console.log("Usuario borrado | " + response.data);
            this.getmembers(this.activeOkupa);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (r) {
        alert("No se ha podido borrar el usuario");
      }
    },
    editOkupa() {
      this.$modal.show("edit-okupa-modal", { usedOkupa: this.okupasdata });
    },
    deleteOkupa() {
      var self = this;
      var r = confirm("¿Estás seguro de querer borrarlo?");
      if (r) {
        axios({
          method: "delete",
          url: this.url2 + "okupas/" + this.activeOkupa,
        })
          .then(() => {
            alert("Borrado!");
            self.clean();
            self.load("okupas");
          })
          .catch(function (error) {
            console.log("ERROR: " + error);
          });
      }
    },

    adminAddMember() {
      this.$modal.show("admin-add-okupa-modal", { asoOkupa: this.activeOkupa });
    },
    addMember() {
      if (this.okupasdata != "") {
        let theUser = this.user_id;
        if (this.role == "admin") {
          theUser = this.adminUser;
        }
        const url = this.url2 + "okupas/" + this.activeOkupa + "/" + theUser;
        axios
          .post(url)
          .then((response) => {
            console.log("Usuario añadido ", response.data);
            this.getmembers(this.activeOkupa);
          })
          .catch((error) => {
            console.log(error);
          });
      } else alert("No hay asociación donde añadir el usuario");
    },
  },
};
</script>