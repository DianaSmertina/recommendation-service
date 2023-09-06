import { Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";

import Header from "./header/Header";
import Footer from "./footer/Footer";

function Layout() {
    return (
        <Container fluid className="p-0 vh-100">
            <Row className="flex-column" style={{ minHeight: "100vh" }}>
                <Header />
                <main>
                    <Outlet />
                </main>
                <Footer />
            </Row>
        </Container>
    );
}

export default Layout;
