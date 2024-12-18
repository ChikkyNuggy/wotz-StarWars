import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue'),
      meta: {
        title: 'Home',
        description: 'This is the home page',
        showTeamBar: true,
        showHeaderContent: true,
      },
    },
    {
      path: '/character/:id',
      name: 'Character',
      props: true,
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: 'Character',
        description: 'This is the character page',
        showTeamBar: true,
        showHeaderContent: true,
      },
    },
    {
      path: '/team',
      name: 'Team',
      component: () => import('../views/TeamView.vue'),
      meta: {
        title: 'Team',
        description: 'This is the team page',
        showTeamBar: true,
        showHeaderContent: true,
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
      meta: {
        title: 'Not Found',
        description: 'This is the not found page',
        showTeamBar: false,
        showHeaderContent: false,
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  document.title = (to.meta.title as string) + ' | StarWars'
  if (document.querySelector('meta[name="description"]')) {
    ;(document.querySelector('meta[name="description"]') as HTMLMetaElement).content = to.meta
      .description as string
  } else {
    const meta = document.createElement('meta')
    meta.name = 'description'
    meta.content = to.meta.description as string
    document.getElementsByTagName('head')[0].appendChild(meta)
  }
  next()
})

export default router
