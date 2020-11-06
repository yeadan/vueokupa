//import $ from 'jquery'

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