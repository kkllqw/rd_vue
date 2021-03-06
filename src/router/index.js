import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: ()=> import('@/components'),
			children:[
					  {
					  	path: '/basicWages',
					  	name: 'BasicWages',
					  	component: ()=> import('@/components/cashier/basicWages')
					  },
						{
							path: '/realWages',
							name: 'RealWages',
							component: ()=> import('@/components/cashier/realWages')
						}
			]
    }
  ]
})
