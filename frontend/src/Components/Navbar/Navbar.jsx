import React, { useContext, useRef, useState, useEffect } from 'react';
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cartIcon from "../Assets/cart_icon.png";
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/Context';
import nav_dropdown from '../Assets/drop_down_icon-removebg.png';

function Navbar() {
    const [menu, setMenu] = useState("shop");
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('auth-token')); // Track login status
    const menuRef = useRef();
    const { getTotalCartAmount, getTotalCartItems,setCartItems, all_product, cartItems, removeFromCart  } = useContext(ShopContext);

    useEffect(() => {
        // Update login status on component mount
        setIsLoggedIn(!!localStorage.getItem('auth-token'));
    }, []);

    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    };

    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        setIsLoggedIn(false); // Update the state to reflect the logged-out status
        setCartItems({});
    };

    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <img src={logo} alt="nav-logo" />
                <p>SHOPPER</p>
            </div>

            <img className="nav-dropdown" onClick={dropdown_toggle} src={nav_dropdown} alt="" />

            <ul ref={menuRef} className='nav-menu'>
                <li onClick={() => { setMenu("shop") }}> <Link style={{ textDecoration: 'none' }} to={"/"} >Shop</Link> {menu === "shop" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("men") }}>  <Link style={{ textDecoration: 'none' }} to={"/men"} >Men</Link>  {menu === "men" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("women") }}><Link style={{ textDecoration: 'none' }} to={"/women"} >Women</Link>  {menu === "women" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("kids") }}> <Link style={{ textDecoration: 'none' }} to={"/kids"} >Kids</Link>  {menu === "kids" ? <hr /> : <></>}</li>
            </ul>

            <div className='nav-login-cart'>
                {
                    isLoggedIn ? 
                    <button onClick={handleLogout}>Logout</button> : 
                    <Link to={"/login"}><button>Login</button></Link>
                }
                <Link to={"/cart"}><img src={cartIcon} alt="" /></Link>
                <div className='nav-cart-count'>{getTotalCartItems()}</div>
            </div>
        </div>
    );
}

export default Navbar;
