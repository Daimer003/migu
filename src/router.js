// src/router.js
import { createRouter, createWebHistory } from "vue-router";

import Home from "./views/Home.vue";
import Videos from "./views/Videos.vue";
import Coleccion from "./views/Coleccion.vue";
import SobreNosotros from "./views/SobreNosotros.vue";
import Contactanos from "./views/Contactanos.vue";
import Details from "./components/product/Details.vue";
import CheckoutView from "./views/CheckoutView.vue";
import SearchView from "./views/SearchView.vue";
import Profile from "./views/Profile.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/videos", name: "Videos", component: Videos },
  { path: "/coleccion", name: "Colección", component: Coleccion },
  { path: "/sobre-nosotros", name: "SobreNosotros", component: SobreNosotros },
  { path: "/contactanos", name: "Contactanos", component: Contactanos },
  { path: "/detalles/:id", name: "Detalles", component: Details },
  { path: "/verificar/", name: "Checkout", component: CheckoutView },
  { path: "/buscar/", name: "Buscar", component: SearchView },
  { path: "/perfil/", name: "perfil", component: Profile },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
