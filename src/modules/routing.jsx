import React from 'react'
import Home from '../pages/Home'
import Accounts from '../pages/accounts/Accounts'
import Addpost from '../components/Addpost'
import Profile from '../pages/profile/Profile'
import Userprofile from '../pages/profile/Userprofile'
import Reports from '../components/Reports'
import Terms from '../pages/terms/Terms'
 
	const routes =[
		{
			path: '/',
			component : <Home/>
		},
		{
			path: '/accounts',
			component : <Accounts/>
		},
		{
			path: '/terms',
			component : <Terms/>
		},
		{
			path: '/create-post',
			component : <Addpost/>
		},
		{
			path: '/profile',
			component : <Profile/>
		},
		{
			path: '/reports',
			component : <Reports/>
		},
		{
			path: '/user-profile/:name/:id',
			component : <Userprofile/>
		}
	]

export default routes