import { useNavigate, Form, useActionData, redirect } from "react-router-dom"
import { useLoaderData } from "react-router-dom"
import Cliente from "../components/Cliente";
import { obtenerClientes } from "../data/clientes";
// $ json-server --watch db.json 
export function loader() {
 const clientes = obtenerClientes()

  return clientes
} 
export async function action ({request, params}) {
    const formData = await request.formData()
    // const datos = Object.fromEntries(formData)
    const planFiltro = formData.get("plan")

    return planFiltro
} 
function Index() {
  const clientes = useLoaderData()
  const filtro = useActionData()
  let clientesFiltrados;
  if(filtro){
    clientesFiltrados = clientes?.filter(cliente=> cliente.plan == filtro)
  }
  
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900 ">Clientes</h1>
      <div className="flex justify-between">
        <p className="my-auto">Administra tus clientes</p>
          <Form method="post"
                noValidate > 
            <div>
              <label
                className="uppercase"
                htmlFor="plan"
                          >Filtrar por plan
              </label>
              <select className="p-1 ml-2" name="plan" id="plan"  >
                  <option value="oro">Oro</option>
                  <option value="plata">Plata</option>
                  <option value="bronce" >Bronce</option>
              </select>
            </div> 
          <input 
                type="submit"
                className="mt-1 w-full bg-blue-800 p-1 uppercase text-white text-lg"
                value={"Filtrar"}
              />
          </Form>
       
      </div>
      { clientes ?  
                (
                    clientesFiltrados ? (
                      <table className="w-full bg-white shadow mt-5 table-auto">
                        <thead className="bg-blue-800 text-white">
                          <tr>
                            <th className="p-1">Cliente</th>
                            <th className="p-1">Contacto</th>
                            <th className="p-1">Plan</th>
                            <th className="p-1">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {clientesFiltrados.map(cliente => (
                            <Cliente cliente={cliente} key={cliente.id} />
                          ))}
                        </tbody>
                      </table>
                    ) 
                        : 
                    (
                      <table className="w-full bg-white shadow mt-5 table-auto">
                        <thead className="bg-blue-800 text-white">
                          <tr>
                            <th className="p-1">Cliente</th>
                            <th className="p-1">Contacto</th>
                            <th className="p-1">Plan</th>
                            <th className="p-1">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {clientes.map(cliente => (
                            <Cliente cliente={cliente} key={cliente.id} />
                          ))}
                        </tbody>
                      </table>
                    )
                ) 
                : 
                (<p className="text-center">No hay Clientes</p>) 
      }
    </>
  )

}

export default Index