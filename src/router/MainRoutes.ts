const MainRoutes = {
  path: '/',
  meta: {
    requiresAuth: true
  },
  redirect: '/dashboard',
  component: () => import('@/layouts/dashboard/DashboardLayout.vue'),
  children: [
    {
      name: 'Dashboard',
      path: '/dashboard',
      component: () => import('@/views/dashboard/DefaultDashboard.vue')
    },
    {
      name: 'Experiments',
      path: '/experiments',
      component: () => import('@/views/experiments/Experiments.vue')
    },
  ]
};

export default MainRoutes;
