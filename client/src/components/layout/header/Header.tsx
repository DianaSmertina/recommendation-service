import { Row, Navbar, Container, Nav, Button, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { setUser } from "../../../redux/userSlice";
import UserApi from "../../../api/UserApi";
import { RootState } from "../../../redux/store";

function Header() {
    const dispatch = useDispatch();
    const currentUserId = useSelector((state: RootState) => state.user.id);

    const logOut = async () => {
        await UserApi.logout();
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch(setUser({ id: null, email: null, isAdmin: null }));
    };

    return (
        <Row className="w-100 p-0 m-0">
            <header className="p-0">
                <Navbar
                    data-bs-theme="light"
                    className="bg-body-tertiary justify-content-between"
                >
                    <Container>
                        <Navbar.Brand>
                            <NavLink
                                to="/"
                                className="text-decoration-none link-dark"
                            >
                                Recommend!
                            </NavLink>
                        </Navbar.Brand>
                        <Nav>
                            {currentUserId ? (
                                <>
                                    <NavLink to={`/user/${currentUserId}`}>
                                        <Image
                                            src="../../../public/default.jpg"
                                            width={40}
                                            height={40}
                                            roundedCircle
                                            className="me-2"
                                        />
                                    </NavLink>
                                    <Button onClick={logOut}>Log out</Button>
                                </>
                            ) : (
                                <>
                                    <NavLink to="/sign-in" className="me-2">
                                        <Button>Sign in</Button>
                                    </NavLink>
                                    <NavLink to="/sign-up">
                                        <Button>Sign up</Button>
                                    </NavLink>
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
