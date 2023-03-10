import { useState, useRef } from 'react'
import './App.css'
import Table from './components/table'

function App() {
  
  const lists=[
    {name: 'Mac',
    price: 200,
    id: 1
  },
  {name: 'Lenovo',
  price: 100,
  id: 2
},
]
  
const [data, setData]=useState(lists)

  const nameRef=useRef()
  const priceRef=useRef()

  const handleSubmit=(event)=>{
    event.preventDefault()
    let newName=event.target.elements.name.value
    let newPrice=event.target.elements.price.value
    let newId=data.length+1
    const newList={name: newName, price: newPrice, id: newId}
    setData((prevList)=>{
      return prevList.concat(newList)
    })
    nameRef.current.value=""
    priceRef.current.value=""
    console.log(newList)

  }

  return (
    <div className="App">
      <h2>Shamil</h2>
      <form onSubmit={handleSubmit}>
        <input type='text' name='name' ref={nameRef} placeholder='name'/>
        <input type='text' name='price' ref={priceRef} placeholder='price'/>
        <button>Submit</button>
      </form>
      <Table lists={data} setLists={setData}/>
     
    </div>
  )
}

export default App
