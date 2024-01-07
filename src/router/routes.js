
const routes = [

  {
    path: '/',
    name: 'login',
    component: () => import('src/pages/Login.vue')
  },

  {
    path: '/register',
    name: 'register',
    component: () => import('src/pages/Register.vue')
  },

  {
    path: '/home',
    name: 'home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Home.vue') },
    ]
  },

  {
    path: '/quran',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Quran.vue') },
    ]
  },

  {
    path: '/qibla',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/QiblaCompass.vue') },
    ]
  },

  {
    path: '/GuidedMeditations',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/GuidedMeditations.vue') },
    ]
  },

  {
    path: '/Community',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Community.vue') },
    ]
  },

  {
    path: '/Dkhir',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Dkhir.vue') },
    ]
  }
]

export default routes
