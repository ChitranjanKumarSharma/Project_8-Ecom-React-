import React, { useState ,useEffect} from 'react'
import "./NewCollection.css"
import Item from '../Item/Item'

function NewCollection() {
  const [new_collections, setNew_collections]= useState([]);
  useEffect(() => {
    // http://localhost:4000/newcollections

    fetch('https://project-8-ecom-react-r0kh.onrender.com/newcollections')
      .then((response) =>  response.json() )
      .then((data) =>  setNew_collections(data) );
  }, [])

  return (
    <div className='new-collections'>
        <h1>NEW COLLECTIONS</h1>
        <hr />
        <div className="collections">
            {new_collections.map((item, index)=>{
                return <Item
                key={index} 
                id= {item.id} 
                name= {item.name} 
                image= {item.image} 
                new_price = {item.new_price} 
                old_price = {item.old_price}
                />
            })}
        </div>
    </div>
  )
}

export default NewCollection