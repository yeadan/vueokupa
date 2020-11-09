//import $ from 'jquery'
import axios from 'axios'

export const dataMixins = {
    data() {
        return {
            datos: {
                okupas:[],
                users:[],
                owners:[],
                properties:[]
            }
        }
    },
    methods: {
          
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