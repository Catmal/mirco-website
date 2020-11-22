const routes = [
    {
        path: "/",
        component: () => import ("layouts/MainLayout.vue"),
        children: [
            {
                path: "",
                component: () => import ("pages/Index.vue")
            }
        ]
    },
    {
        path: "/contact",
        component: () => import ("layouts/MainLayout.vue"),
        children: [
            {
                path: "",
                component: () => import ("pages/Contact.vue")
            }
        ]
    },
    {
        path: "/portfolio",
        component: () => import ("layouts/MainLayout.vue"),
        children: [
            {
                path: "",
                component: () => import ("pages/Portfolio.vue")
            }
        ]
    },
    {
        path: "/skills",
        component: () => import ("layouts/MainLayout.vue"),
        children: [
            {
                path: "",
                component: () => import ("pages/Skills.vue")
            }
        ]
    }, {
        path: "/login",
        component: () => import ("layouts/MainLayout.vue"),
        children: [
            {
                path: "",
                component: () => import ("pages/Login.vue")
            }
        ]
    }, {
        path: '/admin',
        component: () => import ('layouts/MainLayout.vue'),
        children: [
            {
                path: 'images',
                component: () => import ('pages/Admin/Images.vue')

            }, {
                path: 'messages',
                component: () => import ('pages/Admin/Messages.vue')

            }, {
                path: 'skills',
                component: () => import ('pages/Admin/Skills.vue')

            }, {
                path: 'portfolio_items',
                component: () => import ('pages/Admin/PortfolioItems.vue')

            }

        ]
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: "*",
        component: () => import ("pages/Error404.vue")
    }
];

export default routes;
