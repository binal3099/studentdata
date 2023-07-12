import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <Navbar className='bg' data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <NavLink to="/" className={"li"}>Home</NavLink>
                        <NavLink to="/addstudent" className={"li"}>Add Emp</NavLink>
                        <NavLink to="/viewstudent" className={"li"}>View Emp</NavLink>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;