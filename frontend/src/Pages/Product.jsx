import React, { useContext } from 'react'
import { ShopContext } from '../Context/Context';
import {useParams}from 'react-router-dom'
import BreadCrums from '../Components/BreadCrums/BreadCrums';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import all_product from '../Components/Assets/all_product';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProduct/RelatedProducts';
 
function Product(props) {
  
  const {productId} =useParams();
  
  const product = all_product.find((e)=> e.id === Number(productId));
  // console.log(product);
  // console.log("hi");
  return (
    <div>
      <BreadCrums product = {product}/>
      <ProductDisplay product= {product} />
      <DescriptionBox/>
      <RelatedProducts/>
    </div> 
  )
}

export default Product