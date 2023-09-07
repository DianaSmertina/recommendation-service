import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

import Header from "./header/Header";
import Footer from "./footer/Footer";

function Layout() {
    return (
        <Container fluid className="vh-100 p-0 m-0 d-flex flex-column justify-content-between align-items-center">
            <Header />
            <Outlet />
            <Footer />
        </Container>
    );
}

export default Layout;
