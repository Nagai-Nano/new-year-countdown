import Home from '@/components/Home'
import Success from '@/components/Success'

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
    path: '*',
    redirect: '/'
  }
]

export default routes
