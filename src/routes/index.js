import Home from '@/components/Home'
import Success from '@/components/Success'
import Static from '@/components/Static'

const routes = [
	{
		path: '/',
		component: Home
	},
	{
		path: '/success',
		component: Success
	},
  {
    path: '/static',
    component: Static
  },
  {
    path: '*',
    redirect: '/'
  }
]

export default routes
