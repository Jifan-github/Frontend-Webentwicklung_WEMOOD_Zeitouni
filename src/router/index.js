import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArtikelView from '../views/ArtikelView.vue'
import SuchergebnisseView from '../views/SuchergebnisseView.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/artikel',
        name: 'artikel',
        component: ArtikelView
    },
    {
        path: '/suchergebnisse',
        name: 'suchergebnisse',
        component: SuchergebnisseView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router