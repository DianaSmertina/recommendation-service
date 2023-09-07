import { Row, Navbar, Container, Nav } from "react-bootstrap";

function Header() {
    return (
        <Row className="w-100 p-0 m-0">
            <header className="p-0">
                <Navbar bg="light" data-bs-theme="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="/">Recommend!</Navbar.Brand>
                        <Nav>

                        </Nav>
                    </Container>
                </Navbar>
            </header>
        </Row>
    );
}

export default Header;
