import React, { useContext, useState }  from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";



const NavBarLink = () => {

  const { isAuthenticated, setIsAuthenticated, username, getUsername } = useContext(AuthContext)
  

  function logout(){
        localStorage.removeItem("access")
        setIsAuthenticated(false)
  }


  return (
          <div className='row'>
               <Navbar expand="lg" className="bg-body-tertiary col-10">
                <Container>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                      <Nav.Item>
                          <NavLink 
                          to ="/"
                            className={({ isActive }) => (isActive ? 'nav-link active border-bottom fw-bold' : 'nav-link' )}
                            > 
                            Home 
                          </NavLink> 
                      </Nav.Item>

                      <Nav.Item>
                          <NavLink 
                          to ="/about"
                            className={({ isActive }) => (isActive ? 'nav-link active border-bottom fw-bold' : 'nav-link' )}
                            > 
                            About
                          </NavLink> 
                      </Nav.Item>

                                  <Nav.Item>
                          <NavLink 
                          to ="/contact"
                          className={({ isActive }) => (isActive ? 'nav-link active border-bottom fw-bold' : 'nav-link' )}
                          > 
                            Contact 
                          </NavLink> 
                      </Nav.Item>

                      {
                        (isAuthenticated) ? (
                          
                          <>
                          <Nav.Item>
                            <NavLink 
                              to ="/profile"
                                className={({ isActive }) => (isActive ? 'nav-link border-bottom fw-bold py-2' : 'nav-link py-2' )}> 
                                { ` Hi ${username} `}
                            </NavLink> 
                          </Nav.Item>

                          </>
                        ):(
                      <></>
                      )
                      }
                    </Nav>
                  </Navbar.Collapse>
                </Container>
               </Navbar>

          
            <div className='col-2'>
              { (isAuthenticated) ? (
              <NavLink 
                   to ="/"
                   className='btn-sm btn btn-danger'> 
                  <FaLock /> Logout
              </NavLink> 
              ):(
              <NavLink 
                   to ="/login"
                   className='btn-sm btn btn-primary'> 
                  <FaLockOpen /> Login
              </NavLink> 
              )}
            </div>

         </div>
        )
}

export default NavBarLink