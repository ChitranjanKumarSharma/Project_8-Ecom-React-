import React, { useContext } from 'react'
import "./item.css"
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/Context'

function Item(props) {
  const {addToCart} = useContext(ShopContext);
  return (
    <div className='item'>
      <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0, 0)} src={props.image} alt="" /></Link>
      <p>{props.name}</p>
      <div className="item-description">
        <div className='item-prices'>
          <div className='item-price-new'>${props.new_price}</div>
          <div className="item-price-old">${props.old_price}</div>
        </div>
        <div className="addToCart-button">
          <button onClick={() => { addToCart(props.id) }}>ADD TO CART</button>
        </div>
      </div>

    </div>
  )
}

export default Item