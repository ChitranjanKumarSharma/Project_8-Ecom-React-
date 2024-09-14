import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/Context';

function ProductDisplay(props) {
  const { product } = props;
  const {addToCart} = useContext(ShopContext);
  return (
    <div className='productDisplay'>
      <div className="productDisplay-left">
        {/**========================================================================
           *                           left part
           *========================================================================**/}
        <div className="productDisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>

        <div className="productDisplay-img">
          <img className='productDisplay-main-img' src={product.image} />
        </div>
      </div>

      {/*-------------------------------- RIGHT PART STARTS ------------------------------*/}
      <div className="productDisplay-right">
        <h1>{product.name}</h1>
        <div className="productDisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(344)</p>
        </div>

        {/*================== PRICES PART =================*/}

        <div className="productDisplay-right-prices">
          <div className="productDisplay-right-price-old">${product.old_price}</div>
          <div className="productDisplay-right-price-new">${product.new_price}</div>
        </div>

        {/*================== DESCRIPTIONS =================*/}
        <div className="productDisplay-right-description">
          A lightWeight, usually knitte, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.
        </div>

        {/*------------------ SIZE CHART -----------------*/}
        <div className="productDisplay-right-size">
          <h1>Select Size</h1>
          <div className="productDisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
        <p className='productDisplay-right-category'><span>Category: </span> {product.category}</p>
        <p className='productDisplay-right-category'> <span>Tag: </span> Modern, Latest, Trending </p>

      </div>
    </div>
  )
}

export default ProductDisplay;