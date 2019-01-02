import Home from '@/components/Home'
import Gopro from '@/components/Gopro'

const routes = [
	{
		path: '/',
		component: Home
	},
	{
		path: '/gopro',
		component: Gopro
	},
  {
    path: '*',
    redirect: '/'
  }
]

export default routes
