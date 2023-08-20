
const routes = [
  {
    path: '/',
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
  }
]

export default routes
