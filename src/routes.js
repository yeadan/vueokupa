import InicioComponent from './components/inicio.vue'
import NotFound from './components/notfound.vue'
import LoginComponent from './components/login.vue'
import usuarios from './components/usuarios.vue'
import okupas from './components/okupas.vue'
import owners from './components/owners.vue'
import properties from './components/properties.vue'
import addProperties from './components/addProperties.vue'
import SignupComponent from './components/signup.vue'

export const routes = [
    { path:'', component: InicioComponent},
    { path:'/', component: InicioComponent},
    { path:'/login', component: LoginComponent},
    { path:'/signup', component: SignupComponent},
    { path:'/owners', beforeEnter: protect, component: owners},
    { path:'/users', beforeEnter: protect, component: usuarios},
    { path:'/okupas', beforeEnter: protect, component: okupas},
    { path:'/properties', beforeEnter: protect, component: properties},
    { path:'/addproperties', beforeEnter: protectAdmin, component: addProperties},
    { path:'*', component: NotFound }
]

// Función para proteger páginas y que únicamente sean accesibles con login
function protect (to, from, next) {
    if (localStorage.user_id) 
        next()
    else
        next('/login')
}
//Solo accesibles por un admin
function protectAdmin (to, from, next) {
    if (localStorage.user_id && localStorage.role =="admin")
        next()
    else
        next('/login')
}