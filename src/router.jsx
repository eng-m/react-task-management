import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';

import Register from './pages/Register';
import Header from './components/Header';
import GuestLayout from './components/GuestLayout';
import Dashboard from './pages/Dashboard';

const router = createBrowserRouter([
	{
		path: '/',
		element: <GuestLayout />,
		children: [
			{
				path: '/',
				element: <Login />,
			},
			{
				path: '/register',
				element: <Register />,
			},
		],
	},
	{
		path: '/',
		element: <Header />,
		children: [
			
			{
				path: '/dashboard',
				element: <Dashboard />,
			},
		],
	},
]);

export default router;
