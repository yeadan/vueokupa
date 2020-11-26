//import $ from 'jquery'
import axios from 'axios'
//import {router} from './main'

export const dataMixins = {
    data() {
        return {
            url4: 'https://okupa.netlify.app/',//front
            url3: 'http://localhost:4444',//local
            url2: 'https://okupa2020.herokuapp.com/',//back
            loading: false,
            datos: {
                okupas: [],
                users: [],
                owners: [],
                properties: []
            }
        }
    },
    methods: {
        load(target) {
            const url = this.url2 + target
            axios.get(url)
                .then(response => {
                    this.datos[target] = response.data
                    this.loading = false
                    return response.data
                })
                .catch(error => {
                    console.log(error)
                })
        },
        clickClose(target) {
            this.$modal.hide(target)
        },
        clickOK(target, metodo, path, date, loader) {
            var self = this
            if (this.input.name != "" && this.input.description != "") {
                let thisDate = new Date().getTime()
                let newDate = new Date(thisDate).toISOString()
                if (date) target.created = newDate
                let data = JSON.stringify(target)

                const axios = require('axios')
                axios({
                    method: metodo,
                    url: this.url2 + path,
                    data: data,
                }).then(() => {
                    //Si todo va bien, recargamos la vista
                    if (loader)
                        self.load(loader)
                }).catch(function (error) {
                    console.log("ERROR: " + error)
                })
            }
        },
        cleanString(target) {
            if (typeof target != 'undefined' && Object.keys(target).length > 0)
                return target.replace(/(\B)[^ ]*/g, match => (match.toLowerCase())).replace(/^[^ ]/g, match => (match.toUpperCase()))
            else return target
        }
    }
}