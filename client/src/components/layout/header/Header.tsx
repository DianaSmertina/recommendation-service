import { Row, Navbar, Container, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <Row className="w-100 p-0 m-0">
            <header className="p-0">
                <Navbar data-bs-theme="light" className="bg-body-tertiary justify-content-between">
                    <Container>
                        <Navbar.Brand><NavLink to="/" className="text-decoration-none link-dark">Recommend!</NavLink></Navbar.Brand>
                        <Nav>
                            {localStorage.getItem("token") ? (
                                <>
                                    <Nav.Link>userimg</Nav.Link>
                                    <Button>Log out</Button>
                                </>
                            ) : (
                                <>
                                    <NavLink to="/sign-in"><Button>Sign in</Button></NavLink>
                                    <NavLink to="/sign-up"><Button>Sign up</Button></NavLink>
                                </>
                            )}
                            
                        </Nav>
                    </Container>
                </Navbar>
            </header>
        </Row>
    );
}

export default Header;
