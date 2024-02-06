import { useNavigate, Form, useActionData, redirect } from "react-router-dom"
import Formulario from "../components/Formulario"
import Error from "../components/Error"
import { agregarCliente } from "../data/clientes"

export async function action ({request}) {
  
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
    await agregarCliente(datos)
    
    return redirect("/");
}

function NuevoCliente() {
  const errores = useActionData()
  const navigate = useNavigate()
  
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900 ">Nuevo CLiente</h1>
      <p className="mt-3">Llena todos los campos, para registrar un nuevo cliente</p>


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
          <Formulario />
          <input 
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 uppercase text-white text-lg"
            value={"Registrar cliente"}
          />
        </Form>

      </div>
    </>
  )
}

export default NuevoCliente