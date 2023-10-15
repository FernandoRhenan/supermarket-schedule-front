import { Routes, BrowserRouter, Route } from 'react-router-dom'

const PrivatePages = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route element={''} path="/" />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default PrivatePages
