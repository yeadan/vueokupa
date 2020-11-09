//import $ from 'jquery'
import axios from 'axios'

export const dataMixins = {
    data() {
        return {
            list: {
                okupa:[],
                owner:[]
            },
            datos: {
                okupas:[],
                users:[],
                owners:[],
                properties:[]
            }
        }
    },
    methods: {
        loadProperties() {
            const url = 'http://localhost:4444/'+'properties'
            var index2 = ''
            var index3 = ''
            axios.get(url)
            .then(response => {
              this.datos['properties'] = response.data
              let promises = []
              let promises2 = []
              for (var i=0; i<this.datos['properties'].length; i++)
              {
                index2 = this.datos['properties'][i].okupa_id
                const url2 = 'http://localhost:4444/okupas/'+ index2
                promises.push (
                axios.get(url2)
                .then(response => {
                  var a = response.data.okupa_id
                  this.list.okupa[a]= response.data
                })
                .catch(error => {
                  console.log(error)
                }) )

                index3 = this.datos['properties'][i].owner_id
                const url3 = 'http://localhost:4444/owners/'+ index3
                promises2.push (
                axios.get(url3)
                .then(response => {
                  var x = response.data.owner_id
                  this.list.owner[x]= response.data
                })
                .catch(error => {
                  console.log(error)
                }) )
              }
              Promise.all(promises).then(()=> { 
                this.datos.okupas = this.list.okupa               
              })
              Promise.all(promises2).then(()=> { 
                this.datos.owners = this.list.owner
              })
            })
            .catch(error => {
              console.log(error)
            })
          },
          
        load(target) {
            const url = 'http://localhost:4444/'+target
            axios.get(url)
            .then(response => {
              this.datos[target] = response.data
              return response.data
            })
            .catch(error => {
              console.log(error)
            })
          }
    }
}
export const modalMixins = {
    methods: {
        clickClose(target) {
            this.$modal.hide(target)        
        },
        clickOK(target,metodo,path,date) {
            if(this.input.name != "" && this.input.description != "") {
                let thisDate = new Date().getTime()
                let newDate = new Date(thisDate).toISOString()
                if (date) target.created=newDate
                let data = JSON.stringify(target)
                
                const axios = require ('axios')
                axios({
                method: metodo,
                    url:'http://localhost:4444/'+path,
                data:data,
                }).then(function (response) {
                    // Respuesta
                    console.log(response.data)
                    alert("Guardado")
                    location.reload('/')
                }).catch(function (error) {     
                    console.log("ERROR: "+error)
                })  
            }
        }    
    }
}