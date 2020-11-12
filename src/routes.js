import store from '@/store'
import InicioComponent from './components/inicio.vue'
import NotFound from './components/notfound.vue'
import usuarios from './components/usuarios.vue'
import okupas from './components/okupas.vue'
import owners from './components/owners.vue'
import properties from './components/properties.vue'
import addProperties from './components/addProperties.vue'
import Register from './components/register.vue'

export const routes = [
    { path:'', component: InicioComponent},
    { path:'/', component: InicioComponent},
    { path:'/register', component: Register},
    { path:'/owners', beforeEnter: protect, component: owners},
    { path:'/users', beforeEnter: protect, component: usuarios},
    { path:'/okupas', beforeEnter: protect, component: okupas},
    { path:'/propertie', beforeEnter: protect, component: properties},
    { path:'/properties', beforeEnter: protect, component: properties},
    { path:'/addproperties', beforeEnter: protectAdmin, component: addProperties},
    { path:'*', component: NotFound }
]

// Función para proteger páginas y que únicamente sean accesibles con login
function protect (to, from, next) {
    if (store.getters.getUserID != '' && store.getters.getToken != '') 
        next()
    else
        next('/register')
}
//Solo accesibles por un admin
function protectAdmin (to, from, next) {
    console.log(store.getters.getRole)
    if (store.getters.getUserID != '' && store.getters.getToken != '' && store.getters.getRole =="admin")
        next()
    else
        next('/register')
}