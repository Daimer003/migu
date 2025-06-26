// src/router.js
import { createRouter, createWebHistory } from 'vue-router'

import Home from './views/Home.vue'
import Videos from './views/Videos.vue'
import Coleccion from './views/Coleccion.vue'
import SobreNosotros from './views/SobreNosotros.vue'
import Contactanos from './views/Contactanos.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/videos', name: 'Videos', component: Videos },
  { path: '/coleccion', name: 'Coleccion', component: Coleccion },
  { path: '/sobre-nosotros', name: 'SobreNosotros', component: SobreNosotros },
  { path: '/contactanos', name: 'Contactanos', component: Contactanos },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router