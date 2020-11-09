import axios from 'axios'
import {router} from './main'
import store from '@/store'
import { ACTION_LOGOUT } from './store/app.store'


// Add a response interceptor
axios.interceptors.response.use((response) => { 
    return response;
},  (error) => {
    if (error.response.status == 401) {
        console.log('unauthorized, logging out ...')
        store.dispatch(ACTION_LOGOUT)
        router.push('/login')
    }
    return Promise.reject(error);
})

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    const token = store.getters.getToken
    if (token && config.baseURL !='https://apiv1.geoapi.es/comunidades?type=JSON&key=2fbda50bcbdc4f0d5ff1b7f08546174f90e60e0de4cc83d2f4cab5ea2708a989&sandbox=0') {
        const authToken = 'Bearer '+token
        config.headers.Authorization =  authToken
    }
    return config;
}, function(error) {
    return Promise.reject(error)
})