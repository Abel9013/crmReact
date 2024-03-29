import { useNavigate, Form, redirect }  from "react-router-dom"
import { eliminarCliente } from "../data/clientes"

export async function action ({params}) {

    await eliminarCliente(params.clienteId)

  return redirect("/") 
}

const Cliente = ({cliente}) => {

    const navigate = useNavigate()
    const {nombre, empresa , email, id, plan} = cliente

  return (
    <>
      <tr className='border-b'>
        <td className="p-6 space-y-2">
            <p className='text-2xl text text-gray-800'>{nombre}</p>
            <p>{empresa}</p>
        </td>
        <td className='p-6'>
            <p className="text-gray-600"><span className='text-gray-800 uppercase font-bold'>Email: </span>{email}</p>
        </td>
        <td className='p-6'>
            <p className="text-gray-600"><span className='text-gray-800 uppercase font-bold'>{plan}</span></p>
        </td>
        <td className='p-6 flex gap-3'>
            <button
                type='button'
                className=' text-xs text-blue-600 hover:text-blue-700 uppercase font-bold'
                onClick={()=> navigate(`/clientes/${id}/editar`) }
            >Editar
            </button>
            <Form 
                method="post"
                action={`/clientes/${id}/eliminar`}
                onSubmit={(e)=>{
                  if(!confirm("Eliminar cliente?")){
                    e.preventDefault()
                  }
                  
                }}
            >
              <button
                  type='submit'
                  className=' text-xs text-red-600 hover:text-red-700 uppercase font-bold'
              >Borrar
              </button>
            </Form>
        </td>
      </tr>
    
    </>
  )
}

export default Cliente