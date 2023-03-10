import React, { useState } from 'react';
import './table.css'

function EditList({index, list, lists, setLists}){
    function handleInput(event){
        const value=event.target.value
        const newList=lists.map(li=>(
            li.id===list.id ? {...li, name: value} : li
        ))
        setLists(newList)
    }
    function handleInputPrice(event){
        const value=event.target.value
        const newList=lists.map(li=>(
            li.id===list.id ? {...li, price: value} : li
        ))
        setLists(newList)
    }

    return(
        <tr key={index}>
        <td><input type='text' onChange={handleInput} name='name' placeholder='name' value={list.name}/></td>
        <td><input type='text' onChange={handleInputPrice} name='price' placeholder='price' value={list.price}/></td>
        <td><button>Update</button></td>
        </tr>
    )
    
}

export default function Table({lists, setLists}){

    const [editState, setEditState]=useState(-1)

    const handleEdit=(id)=>{
        setEditState(id)
        console.log(id)
    }
    const handleDelete=(id)=>{
        const newList=lists.filter(li=> li.id!==id)
        setLists(newList)
    }

    const handleSubmit=(event)=>{
        event.preventDefault()
        const  name=event.target.elements.name.value
        const price=event.target.elements.price.value
        const newList=lists.map(li=>(
            li.id===editState ? {...li, name: name, price: price} : li
        ))
        setLists(newList)
        setEditState(-1)
    }
  
    return(<>
        <form onSubmit={handleSubmit}>
        <table>
            <tbody>
            {
                lists.map((list, index)=>(
                    editState===list.id ? <EditList key={index} list={list} lists={lists} setLists={setLists}/> :
                    <tr key={index}>
                    <td>{list.name}</td>
                    <td>{list.price}</td>
                    <td><button id={list.id} onClick={()=>handleEdit(list.id)}>Edit</button></td>
                    <td><button onClick={()=>handleDelete(list.id)}>Delete</button></td>
                    </tr>
                ))
            }
            </tbody>
            
        </table>
        </form>
    </>)
}
