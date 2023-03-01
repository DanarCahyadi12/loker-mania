import { Button, Form, Input, Nav, Container, Navbar, NavDropdown } from "react-bootstrap"
const NavigationBar = () => {
    return (
        <Navbar bg=""  expand="lg">
            <Container >
                <Navbar.Brand href="#home" className=" fw-bold">E-Commerce</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto ">
                        <Nav.Link href="#home" className="fw-bold">Home</Nav.Link>
                        <Nav.Link href="#link" className="fw-bold">Contact</Nav.Link>
                        <Nav.Link href="#link" className="fw-bold">About</Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}


export default NavigationBar