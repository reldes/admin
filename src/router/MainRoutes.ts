const MainRoutes = {
  path: '/',
  meta: {
    requiresAuth: true
  },
  redirect: '/experiments',
  component: () => import('@/layouts/dashboard/DashboardLayout.vue'),
  children: [
    {
      name: 'Experiments',
      path: '/experiments',
      component: () => import('@/views/experiments/Experiments.vue')
    },
    {
      name: 'Templates',
      path: '/templates',
      component: () => import('@/views/templates/Templates.vue')
    },
  ]
};

export default MainRoutes;
