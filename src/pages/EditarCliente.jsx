import { useLoaderData, useActionData , Form, useNavigate, redirect } from "react-router-dom";
import { obtenerClienteId, actualizarCliente } from "../data/clientes"
import Formulario from "../components/Formulario";
import Error from "../components/Error";

export async function loader ({params}) {
    const cliente = await obtenerClienteId(params.clienteId);
    if(Object.values(cliente).length===0){
        throw new Response("", {
            status:404,
            statusText: "Cliente no encontrado"
        })
    }
    
    return cliente
}
export async function action ({request, params}) {

    const formData = await request.formData()
    const datos = Object.fromEntries(formData)
    const email = formData.get("email")
    // validacion
    const errores =[]
    const regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    if(!regex.test(email)) {
      errores.push("Email no válido")
    }
    if(Object.values(datos).includes("")){
      errores.push("Todos los campos son oblicagatorios")
    }
    // Retornar datos si hay errores
    if(errores.length > 0){
      return errores
    }

    // Actualizar 
    await actualizarCliente(params.clienteId, datos)
    // await agregarCliente(datos)
    
    return redirect("/");
}
function EditarCliente() {
    const cliente = useLoaderData()
    const navigate = useNavigate()
    const errores = useActionData()
    
    return (
        <>
        <h1 className="font-black text-4xl text-blue-900 ">Editar CLiente</h1>
        <p className="mt-3">Modifica los campos deseados, para editar un cliente</p>
  
  
        <div className="flex justify-end">
          <button
            className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
            onClick={()=>navigate("/")}
          >
            Volver
          </button>
        </div>
        <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
  
          {errores?.length && errores.map( (error, i)  => <Error key={i}>{error}</Error> ) }
          
          <Form
            method="post"
            noValidate
          >
            <Formulario cliente={cliente} />
            <input 
              type="submit"
              className="mt-5 w-full bg-blue-800 p-3 uppercase text-white text-lg"
              value={"Confirmar cambios"}
            />
          </Form>
  
        </div>
      </>
  )
}

export default EditarCliente