import { useState, useEffect } from 'react'
import securityimg from "../src/security.gif"

function App() {

  const [todo, settodo] = useState("")
  const [alltodo, setalltodo] = useState([])
  const [showall,setshowall] = useState(true)

  useEffect(() => {
    let x=JSON.parse(localStorage.getItem("todos"))
    if(x){
      setalltodo(x)
    }
  }, [])

  const savetolocal = ()=>{
    localStorage.setItem("todos",JSON.stringify(alltodo))
  }

  const handleAdd = () => {
    setalltodo([...alltodo, { todo, complete: false }])
    settodo("")
    savetolocal()
  }

  const handleChange = (e) => {
    settodo(e.target.value)
  }

  const handleDelete = (tilda)=>{
    let newtodo=alltodo.filter(item=>{
      return item.todo!==tilda
    })
    setalltodo(newtodo)
    savetolocal()
  }

  const handleEdit = (tilda)=>{
    handleDelete(tilda)
    settodo(tilda)
    savetolocal()
  }

  const handleShowall = ()=>{
    setshowall(!showall)
  }

  const handleCheck = (e)=>{
    let done=e;
    let x=alltodo.findIndex(item=>{
      return item.todo===done
    })
    let newtodo=[...alltodo]
    newtodo[x].complete=!newtodo[x].complete
    setalltodo(newtodo)
    savetolocal()

    //Or this will work as well

    // const done = e.target.name;
    // const updatedTodos = alltodo.map(todoItem => {
    //   if (todoItem.todo === done) {
    //     return { ...todoItem, complete: !todoItem.complete }; // Toggle the complete property
    //   } else {
    //     return todoItem;
    //   }
    // });
    // setalltodo(updatedTodos);
  }

  return (
    <>

      <main className='mx-[4%]'>
        <div className='text-center my-5 bg-purple-400 rounded-lg text-green-900 py-3 text-3xl font-bold flex justify-center items-center gap-5'>

           <span className='w-10'><img src={securityimg} alt="" /></span> Pro-Pass
        </div>
        <div className="top flex justify-around bg-purple-300 my-3 py-2 rounded-md">
          <input type="text" onChange={handleChange} value={todo} className='border border-red-300 w-2/5 rounded-sm' />
          <button onClick={handleAdd} className='bg-purple-800 py-[0.5px] px-3 rounded-md text-amber-50 text-sm'>Add</button>
          <div className='flex gap-2'>
            <input onClick={handleShowall} type="checkbox" checked={showall} name="" id="" />
            <span>Show All</span>
          </div>
        </div>

        <div className="bottom h-[400px] bg-purple-100 rounded-lg overflow-y-scroll">

          {alltodo.map(item => {
            return (showall || !item.complete)&&(<div key={item.todo} className="todos flex justify-between sm:w-2/3 py-3 px-3">
              <div className="todotext flex gap-2">
                <input type="checkbox" onClick={()=>handleCheck(item.todo)} checked={item.complete} id="" />
                <span className={item.complete?"line-through":" "} >{item.todo}</span>
              </div>
              <div className="todobuttons flex gap-3">
                <button onClick={()=>handleEdit(item.todo)} className="edit text-sm bg-pink-700 p-1 rounded-md text-amber-50">Edit</button>
                <button onClick={()=>handleDelete(item.todo)} className="delete text-sm bg-pink-700 p-1 rounded-md text-amber-50">Delete</button>
              </div>
            </div>)
          })}
        </div >

      </main >

    </>
  )
}

export default App