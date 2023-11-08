import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import PrivateRoute from "./PrivateRoute"
import AdmSchedules from "../pages/AdmSchedules"

// eslint-disable-next-line react/prop-types
const AdminRoutes = ({ auth }) => {
	return (
		<BrowserRouter>
			<ToastContainer autoClose={3000} />

			<Routes>
				<Route
					path="/adm/schedules"
					element={
						<PrivateRoute auth={auth} >
							<AdmSchedules />
						</PrivateRoute>
					}
				/>

			</Routes>
		</BrowserRouter>
	)
}

export default AdminRoutes
