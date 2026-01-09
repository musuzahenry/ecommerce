import React from 'react';
import { FaCartShopping } from 'react-icons/fa6';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './NavBar.module.css';
import NavBarLink from './NavBarLink';

const NavBar = ({numCartItems}) => {
  return (
    <nav className={`navbar navbar-expand-lg`}>
        <div className='container'>

            <Link to="/"><FaHome /> SHOOPIT</Link>
            <NavBarLink />
            <div className='col-md-1 col-12 p-1'>
              <div className='w-100 d-flex justify-content-center'>              
                <Link to="/cart"      
                  type='button'
                  data-bs-toggle = 'collapse'
                  data-bs-target = '#navbarContent'
                  aria-expanded = 'false'
                  aria-label = 'Toggle navigation'
                  className='btn btn-dark text-white border-circle'
                >
                <span>{numCartItems == 0 || numCartItems }</span>
                <FaCartShopping /> 
              </Link>
              </div>

            </div>         
        </div>

    </nav>
  )
}

export default NavBar