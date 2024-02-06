import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider  } from "react-router-dom"
import Layout from './components/Layout'
import NuevoCliente, {action as nuevoClienteAction} from './pages/NuevoCliente'
import Index , {loader as clientesLoader} from "./pages/Index"
import ErrorPage from './components/ErrorPage'
import EditarCliente, {loader as editarClienteLoader, action as editarClienteAction } from './pages/EditarCliente'
import { action as clienteActionEliminar } from "./components/Cliente"
// createBrowserRouter Me permite definir mis rutas por medio de un obj ppal
// RouterProvider pasa a ser el centro de la aplicacion en lugar del App(Desde el cual fluyen los datos hacia los otros componentes)
const router = createBrowserRouter([
  {

    path:"/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
        loader: clientesLoader,
        errorElement: <ErrorPage />
      },
      {
        path:"/clientes/nuevo",
        element:<NuevoCliente/>,
        action: nuevoClienteAction,
        errorElement: <ErrorPage />
      },
      {
        path: "/clientes/:clienteId/editar",
        element: <EditarCliente />,
        loader: editarClienteLoader,
        action: editarClienteAction,
        errorElement: <ErrorPage /> 

      },
      {
        path: "/clientes/clienteId/eliminar",
        action: "clienteActionEliminar"
        
      }
    ]
  },
 

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

