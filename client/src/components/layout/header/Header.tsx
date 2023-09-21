import { Row, Navbar, Container, Nav, Button, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import { setUser } from "../../../redux/userSlice";
import UserApi from "../../../api/UserApi";
import { RootState } from "../../../redux/store";
import logo from "../../../assets/logo.png";
import defaultImage from "../../../assets/default.jpg";

function Header() {
    const dispatch = useDispatch();
    const currentUserId = useSelector((state: RootState) => state.user.id);
    const navigate = useNavigate();

    const logOut = async () => {
        await UserApi.logout();
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch(setUser({ id: null, email: null, isAdmin: null }));
        navigate("/");
    };

    return (
        <Row className="w-100 p-0 m-0">
            <header className="p-0">
                <Navbar className="justify-content-between">
                    <Container>
                        <Navbar.Brand>
                            <NavLink
                                to="/"
                                className="text-decoration-none link-dark"
                            >
                                <img
                                    src={logo}
                                    alt="review logo"
                                />
                            </NavLink>
                        </Navbar.Brand>
                        <Nav>
                            {currentUserId ? (
                                <>
                                    <NavLink to={`/user/${currentUserId}`}>
                                        <Image
                                            src={defaultImage}
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
