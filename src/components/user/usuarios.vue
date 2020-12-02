<template>
  <div class="row" id="users">
    <div class="text-center col-md-12 col-lg-6">
      <div class="card h-100">
        <div class="card-body">
          <div class="card-title">
            <div class="row">
              <div class="col-md-6 col-lg-6">
                <div style="display: flex; text-align: center">
                  <div style="margin: auto" class="display:block">
                    <img v-if="Object.keys(userdata).length > 0"
                      style="margin: auto"
                      width="150px"
                      height="150px"
                      :src="'' + url2 + userdata.avatar"
                      alt="avatar"
                      @load="onImgLoad"
                      @error="$event.target.src='' + url2 + 'avatar_sample.jpg'"
                    />
                    <form style="display: flex">
                      <label for="file-input">
                        <i v-if="isLoaded"
                          style="position: relative; top: -150px; right: -130px"
                          class="fa fa-upload"
                        />
                        <i v-else 
                        style="position: relative; top: -25px; right: -75px"
                          class="fa fa-upload"
                          />
                      </label>
                      <input
                        @change="loadImage"
                        style="display: none"
                        id="file-input"
                        type="file"
                        accept="image/*"
                      />
                    </form>
                  </div>
                </div>
              </div>
              <div class="text-center col-md-6 col-lg-6 row">
                <p class="h4 col-8">User ID: {{ userdata.user_id }}</p>
                <br />
                <i
                  v-if="Object.keys(userdata).length > 0"
                  @click="editUser(userdata)"
                  title="Editar"
                  class="col-2 fas fa-edit"
                ></i>

                <div
                  class="card-text text-center col-lg-12 row"
                  v-if="Object.keys(userdata).length > 0"
                >
                  <br />
                  <p class="col-12" align="center">
                    <small
                      ><strong>User: </strong>{{ userdata.username }}</small
                    >
                  </p>
                  <p class="col-12 text-center" align="center">
                    <small
                      ><strong>Fullname: </strong
                      >{{ userdata.full_name }}</small
                    >
                  </p>
                  <p class="col-12 text-center" align="center">
                    <small
                      ><strong>Registered: </strong
                      >{{
                        userdata.registered.toLocaleString("es-ES", {
                          timeZone: "UTC",
                        })
                      }}</small
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <EditUser></EditUser>
      </div>
    </div>
    <div v-if="role == 'admin'" class="text-center col-md-12 col-lg-6">
      <div style="margin: 10px">
        <div class="card-title row">
                    <h3 style="text-align:right" class="col-7">Editar usuarios</h3>
          <div class="col-1"/>
          <form class="col-3">
            <input
              type="text"
              id="inputFiltro"
              placeholder="Filtrar..."
              class="form-control inputsm"
            />
          </form>
        </div>
        <div v-if="Object.keys(datos.users).length > 0">
          <table id="listUser" class="table ">
            <thead>
              <tr>
                <th>Username</th>
                <th>Full name</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="filter"
                v-for="(miembro, index) in datos.users"
                :key="index"
                @click="editUser(miembro)"
              >
                <td>{{ miembro.username }}</td>
                <td>{{ miembro.full_name }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { dataMixins } from "@/mixins.js";
import axios from "axios";
import editUser from "./editUser.vue";
import "@/interceptor";
import $ from "jquery";
export default {
  data() {
    return {
      userdata: "",
      role: "",
      isLoaded: false
    };
  },
  mixins: [dataMixins],
  components: {
    EditUser: editUser,
  },
  mounted() {
    this.isLoaded = false
    this.role = this.$store.getters.getRole;
    if (this.role == "admin") {
      this.load("users");
    }
    this.user_id = this.$store.getters.getUserID;
    let user = this.$store.getters.getUserID;
    const url = this.url2 + "users/" + user;
    axios
      .get(url)
      .then((response) => {
        this.userdata = response.data;
        //Para filtrar los datos, con jquery
        $("#inputFiltro").on("keyup", function () {
          var value = $(this).val().toLowerCase();
          $("#listUser .filter").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
       onImgLoad () {
      this.isLoaded = true
    },
    editUser(data) {
      this.$modal.show("edit-user-modal", { usedUser: data });
    },
    loadImage(f) {
      let datos = f.target.files[0];
      const file = new Blob([datos], { type: "image/*" });
      const formData = new FormData();
      formData.append("image", file, file.filename);

      var instance = axios.create();
      instance.interceptors.request.use(
        function (config) {
          config.headers["Content-Type"] = "Content-Type: multipart/form-data";
          return config;
        },
        function (error) {
          return Promise.reject(error);
        }
      );
      let url = this.url2 + "users/image/"+this.userdata.user_id
      instance.post(url, formData, {})
        .then((response) => {
          this.userdata.avatar = response.data.data
        })
        .catch((error) => {
          console.error(error);

        });
    },
  },
};
</script>
