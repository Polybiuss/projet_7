import { createWebHistory, createRouter } from "vue-router";



  const routes = [
        {
            path: '/',
            name: "HomeConnexion",
            component: () => import ('../pages/HomeConnexion.vue')
        },
        {
            path: '/post',
            name: "AllPost",
            component: () => import ('../pages/Allpost.vue')
        },
        {
            path: '/post/:id',
            name: "OnePost",
            props: true,
            component: () => import ('../pages/OnePost.vue')
        },
        {
            path: '/user',
            name: "ProfilUser",
            props: true,
            component: () => import ('../pages/ProfilUser.vue')
        },
        {
            path: '/comment/:id',
            name: "OneComment",
            props: true,
            component: () => import ('../pages/OneComment.vue')
        },
    ];

    const router = createRouter({
        history: createWebHistory(),
        routes,
      });
      
      export default router;
