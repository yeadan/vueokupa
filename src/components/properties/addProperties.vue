<template >
  <div id="properties" class="container">
    <div class="row" align="left">
      <div class="col-lg-5 col-md-12">
        <table>
          <caption style="caption-side: top">
            <h3>Datos</h3>
          </caption>
          <tr>
            <td>
              <label for="select_propietario">Propietario </label>
            </td>
            <td>
              <select id="select_propietario" v-model="resultado.owner_id">
                <option value="0" disabled selected>Escoge uno...</option>
                <option
                  v-for="(owner, index) in datos.owners"
                  :key="index"
                  :value="owner.owner_id"
                >
                  {{ owner.name }}
                </option>
              </select>
            </td>
          </tr>
          <tr>
            <td><label class="" for="select_okupa">Asociación </label></td>
            <td>
              <select id="select_okupa" v-model="resultado.okupa_id">
                <option value="0" disabled selected>Escoge una...</option>
                <option
                  v-for="(okupa, index) in datos.okupas"
                  :key="index"
                  :value="okupa.okupa_id"
                >
                  {{ okupa.name }}
                </option>
              </select>
            </td>
          </tr>
          <tr>
            <td><label class="" for="select_typ">Tipo </label></td>
            <td>
              <select id="select_typ" class="" v-model="resultado.type">
                <option value="0" disabled selected>Escoge uno...</option>
                <option value="estudio">Estudio</option>
                <option value="chalet">Chalet</option>
                <option value="chalet adosado">Chalet Adosado</option>
                <option value="piso">Piso</option>
                <option value="local">Local</option>
                <option value="otro">Otro</option>
              </select>
            </td>
          </tr>
          <tr>
            <td><label class="" for="prop_descripcion">Descripción </label></td>
            <td>
              <textarea
                v-model="resultado.description"
                placeholder="Añade una descripción..."
                name="prop_descripcion"
                rows="5"
                cols="30"
                minlength="3"
                maxlength="200"
              ></textarea>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <div
                style="float: right"
                v-if="
                  resultado.owner_id > 0 &&
                  resultado.user_id > 0 &&
                  resultado.okupa_id > 0 &&
                  Object.keys(resultado.description).length > 2 &&
                  Object.keys(resultado.type).length > 0
                "
              >
                <span class="alert alert-success" role="alert">
                  <small>OK!</small>
                </span>
                <button
                  class="btn btn-sm btn-success"
                  onclick="document.getElementById('select_com').removeAttribute('disabled');"
                >
                  Añadir Dirección
                </button>
              </div>
              <div v-else style="float: right">
                <span class="alert alert-danger" role="alert">
                  <small>Faltan datos</small>
                </span>
                <button disabled class="btn btn-sm btn-success">
                  Añadir Dirección
                </button>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div id="div_address" class="col-lg-7 col-md-12" style="width: 100%">
        <table>
          <caption style="caption-side: top">
            <h3>Dirección</h3>
          </caption>
          <tr>
            <td><label class="" for="select_com">Comunidad </label></td>
            <td>
              <select
                disabled
                id="select_com"
                class=""
                @change="get_provincias()"
                v-model="selectThis.com"
              >
                <option value="0" disabled selected>Escoge una...</option>
                <option
                  v-for="(comunidad, index) in comunidades"
                  :key="index"
                  :value="comunidad.CCOM"
                >
                  {{ comunidad.COM }}
                </option>
              </select>
            </td>
          </tr>
          <tr>
            <td><label class="" for="select_pro">Provincia </label></td>
            <td>
              <select
                disabled
                id="select_pro"
                class=""
                @change="get_municipios()"
                v-model="selectThis.pro"
              >
                <option value="0" disabled selected>Escoge una...</option>
                <option
                  v-for="(provincia, index) in provincias"
                  :key="index"
                  :value="provincia.CPRO"
                >
                  {{ provincia.PRO }}
                </option>
              </select>
            </td>
          </tr>
          <tr>
            <td><label class="" for="select_mun">Municipio </label></td>
            <td>
              <select
                disabled
                id="select_mun"
                class=""
                @change="get_poblaciones()"
                v-model="selectThis.mun"
              >
                <option value="0" disabled selected>Escoge uno...</option>
                <option
                  v-for="(municipio, index) in municipios"
                  :key="index"
                  :value="municipio.CMUM"
                >
                  {{ municipio.DMUN50 }}
                </option>
              </select>
            </td>
          </tr>
          <tr>
            <td><label class="" for="select_pob">Población </label></td>
            <td>
              <select
                disabled
                id="select_pob"
                class=""
                @change="get_nucleos()"
                v-model="selectThis.pob"
              >
                <option value="0" disabled selected>Escoge una...</option>
                <option
                  v-for="(poblacion, index) in poblaciones"
                  :key="index"
                  :value="poblacion.NENTSI50"
                >
                  {{ poblacion.NENTSI50 }}
                </option>
              </select>
            </td>
          </tr>
          <tr>
            <td><label class="" for="select_nuc">Núcleo </label></td>
            <td>
              <select
                disabled
                id="select_nuc"
                class=""
                @change="get_CPs()"
                v-model="selectThis.nuc"
              >
                <option value="0" disabled selected>Escoge una...</option>
                <option
                  v-for="(nucleo, index) in nucleos"
                  :key="index"
                  :value="nucleo.CUN"
                >
                  {{ nucleo.NNUCLE50 }}
                </option>
              </select>
            </td>
          </tr>
          <tr>
            <td><label class="" for="select_cps">Código Postal </label></td>
            <td>
              <select
                disabled
                id="select_cps"
                class=""
                @change="get_calles()"
                v-model="selectThis.CPs"
              >
                <option value="0" disabled selected>Escoge uno...</option>
                <option
                  v-for="(CP, index) in codigosPostal"
                  :key="index"
                  :value="CP.CPOS"
                >
                  {{ CP.CPOS }}
                </option>
              </select>
            </td>
          </tr>
          <tr>
            <td><label class="" for="select_cal">Dirección </label></td>
            <td>
              <select
                disabled
                id="select_cal"
                class=""
                @change="get_end()"
                v-model="selectThis.cal"
              >
                <option value="0" disabled selected>Escoge una...</option>
                <option
                  v-for="(calle, index) in calles"
                  :key="index"
                  :value="calle.CVIA"
                >
                  {{ calle.TVIA + " " + calle.NVIAC }}
                </option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <label for="num">Número</label>
              <input
                disabled
                style="width: 60px; text-align: center"
                type="number"
                id="num"
                @change="get_number($event.target.value)"
              />

              <label for="piso">Piso</label>
            </td>
            <td>
              <input
                disabled
                style="width: 60px; text-align: center"
                type="number"
                id="piso"
                @change="get_floor($event.target.value)"
              />
              <label for="puerta">Puerta</label>

              <input
                maxlength="1"
                disabled
                style="
                  width: 60px;
                  text-align: center;
                  text-transform: uppercase;
                "
                id="puerta"
                @change="get_door($event.target.value)"
              />
            </td>
          </tr>

          <tr>
            <td></td>
            <td>
              <div style="float: right">
                <span id="label-address" role="alert" class="alert alert-danger"
                  ><small>Dirección incompleta</small></span
                >
                <button
                  class="btn btn-sm btn-success"
                  id="btn_add"
                  @click="comprobate()"
                >
                  Añadir
                </button>
                <router-link
                  style="margin: 10px; margin-left: 0px"
                  class="btn btn-sm btn-danger"
                  to="/properties"
                  >Cancelar</router-link
                >
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { dataMixins } from "@/mixins.js";
import axios from "axios";
export default {
  data() {
    return {
      selectThis: {
        com: "",
        pro: "",
        mun: "",
        pob: "",
        nuc: "",
        CPs: "",
        Cal: "",
      },
      key: "2fbda50bcbdc4f0d5ff1b7f08546174f90e60e0de4cc83d2f4cab5ea2708a989",
      resultado: {
        owner_id: 0,
        okupa_id: 0,
        user_id: parseInt(this.$store.getters.getUserID),
        type: 0,
        description: "",
        created: 0,
        comunidad: "",
        provincia: "",
        municipio: "",
        poblacion: "",
        nucleo: "",
        codigo_postal: "",
        calle: "",
        numero: 0,
        piso: 0,
        puerta: "",
        okupa: {},
        owner: {},
      },
      comunidades: [],
      provincias: [],
      municipios: [],
      poblaciones: [],
      nucleos: [],
      codigosPostal: [],
      calles: [],
      instance: "", // Nueva instance de axios sin interceptors
    };
  },
  mixins: [dataMixins],
  mounted() {
    this.get_comunidades();
    this.load("okupas");
    this.load("owners");
  },
  methods: {
    get_comunidades() {
      this.instance = axios.create();
      this.instance.interceptors.request.use(
        function (config) {
          return config;
        },
        function (error) {
          return Promise.reject(error);
        }
      );
      const self = this;
      const url =
        "https://apiv1.geoapi.es/comunidades?type=JSON&key=" +
        this.key +
        "&sandbox=0";
      this.instance
        .get(url)
        .then((response) => {
          self.comunidades = JSON.parse(JSON.stringify(response.data.data));
        })
        .catch((error) => {
          console.log(error);
        });
    },
    get_provincias() {
      document.getElementById("select_pro").removeAttribute("disabled");
      let ID = this.selectThis.com;
      this.resultado.comunidad = document.getElementById("select_com").options[
        document.getElementById("select_com").selectedIndex
      ].text;
      const self = this;
      const url =
        "https://apiv1.geoapi.es/provincias?CCOM=" +
        ID +
        "&type=JSON&key=" +
        this.key +
        "&sandbox=0";
      this.instance
        .get(url)
        .then((response) => {
          let result = JSON.stringify(response.data.data);
          self.provincias = JSON.parse(result);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    get_municipios() {
      let ID = this.selectThis.pro;
      this.resultado.provincia = document.getElementById("select_pro").options[
        document.getElementById("select_pro").selectedIndex
      ].text;
      const self = this;
      const url =
        "https://apiv1.geoapi.es/municipios?CPRO=" +
        ID +
        "&type=JSON&key=" +
        this.key +
        "&sandbox=0";
      this.instance
        .get(url)
        .then((response) => {
          document.getElementById("select_mun").removeAttribute("disabled");
          self.municipios = JSON.parse(JSON.stringify(response.data.data));
        })
        .catch((error) => {
          console.log(error);
        });
    },
    get_poblaciones() {
      let IDPRO = this.selectThis.pro;
      let ID = this.selectThis.mun;
      this.resultado.municipio = document.getElementById("select_mun").options[
        document.getElementById("select_mun").selectedIndex
      ].text;
      const self = this;
      const url =
        "https://apiv1.geoapi.es/poblaciones?CPRO=" +
        IDPRO +
        "&CMUM=" +
        ID +
        "&type=JSON&key=" +
        this.key +
        "&sandbox=0";
      this.instance
        .get(url)
        .then((response) => {
          document.getElementById("select_pob").removeAttribute("disabled");
          self.poblaciones = JSON.parse(JSON.stringify(response.data.data));
        })
        .catch((error) => {
          console.log(error);
        });
    },
    get_nucleos() {
      let IDPRO = this.selectThis.pro;
      let IDPOB = this.selectThis.pob;
      let ID = this.selectThis.mun;
      this.resultado.poblacion = IDPOB;
      const self = this;
      const url =
        "https://apiv1.geoapi.es/nucleos?CPRO=" +
        IDPRO +
        "&CMUM=" +
        ID +
        "&NENTSI50=" +
        IDPOB +
        "&type=JSON&key=" +
        this.key +
        "&sandbox=0";
      this.instance
        .get(url)
        .then((response) => {
          document.getElementById("select_nuc").removeAttribute("disabled");
          self.nucleos = JSON.parse(JSON.stringify(response.data.data));
        })
        .catch((error) => {
          console.log(error);
        });
    },
    get_CPs() {
      let IDPRO = this.selectThis.pro;
      let IDNUC = this.selectThis.nuc;
      let ID = this.selectThis.mun;
      this.resultado.nucleo = document.getElementById("select_nuc").options[
        document.getElementById("select_nuc").selectedIndex
      ].text;
      const self = this;
      const url =
        "https://apiv1.geoapi.es/cps?CPRO=" +
        IDPRO +
        "&CMUM=" +
        ID +
        "&CUN=" +
        IDNUC +
        "&type=JSON&key=" +
        this.key +
        "&sandbox=0";
      this.instance
        .get(url)
        .then((response) => {
          document.getElementById("select_cps").removeAttribute("disabled");
          self.codigosPostal = JSON.parse(JSON.stringify(response.data.data));
        })
        .catch((error) => {
          console.log(error);
        });
    },
    get_calles() {
      let IDPRO = this.selectThis.pro;
      let IDNUC = this.selectThis.nuc;
      let ID = this.selectThis.mun;
      let IDCP = this.selectThis.CPs;
      this.resultado.codigo_postal = IDCP;
      const self = this;
      const url =
        "https://apiv1.geoapi.es/calles?CPRO=" +
        IDPRO +
        "&CMUM=" +
        ID +
        "&CUN=" +
        IDNUC +
        "&CPOS=" +
        IDCP +
        "&type=JSON&key=" +
        this.key +
        "&sandbox=0";
      this.instance
        .get(url)
        .then((response) => {
          document.getElementById("select_cal").removeAttribute("disabled");
          self.calles = JSON.parse(JSON.stringify(response.data.data));
          if (self.calles == "") {
            //Para pequeños pueblos sin calles
            self.calles = [{ CVIA: "404", NVIAC: " ", TVIA: "<ninguna>" }];
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    get_end() {
      //let ID = this.selectThis.cal
      document.getElementById("num").removeAttribute("disabled");
      document.getElementById("piso").removeAttribute("disabled");
      document.getElementById("puerta").removeAttribute("disabled");
      this.resultado.calle = document.getElementById("select_cal").options[
        document.getElementById("select_cal").selectedIndex
      ].text;
      document
        .getElementById("label-address")
        .setAttribute("class", "alert alert-success");
      document.getElementById("label-address").innerHTML = "<small>OK!</small>";
    },
    get_number(value) {
      this.resultado.numero = parseInt(value);
    },
    get_floor(value) {
      this.resultado.piso = parseInt(value);
    },
    get_door(value) {
      this.resultado.puerta = value;
    },
    comprobate() {
      for (var propt in this.resultado) {
        if (this.resultado[propt].length < 1 && propt != "puerta") {
          document
            .getElementById("btn_add")
            .setAttribute("class", "btn btn-sm btn-warning");
          setTimeout(() => {
            document
              .getElementById("btn_add")
              .setAttribute("class", "btn btn-sm btn-success");
          }, 500);
          return;
        }
      }
      let thisDate = new Date().getTime();
      this.resultado.created = new Date(thisDate).toISOString();
      var self = this;
      axios({
        method: "post",
        url: this.url2 + "properties",
        data: this.resultado,
      })
        .then(function (response) {
          // Respuesta
          console.log(response);
          alert("Creado");
          self.$router.push("/properties");
        })
        .catch(function (error) {
          console.error("ERROR: " + error);
        });
    },
  },
};
</script>

<style scoped>
select,
label,
textarea,
input,
button {
  margin: 10px;
}
textarea {
  resize: none;
  padding: 10px;
}
</style>