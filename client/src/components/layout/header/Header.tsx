import { useState } from "react";
import { Row, Navbar, Container, Nav, Button, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { setUser } from "../../../redux/userSlice";
import UserApi from "../../../api/UserApi";
import { RootState } from "../../../redux/store";

function Header() {
    const dispatch = useDispatch();
    const currentUserId = useSelector((state: RootState) => state.user.id);
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const currentLang = localStorage.getItem("lang");
    const [language, setLanguage] = useState(currentLang || "ENG");

    const logOut = async () => {
        await UserApi.logout();
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch(setUser({ id: null, email: null, isAdmin: null }));
        navigate("/");
    };

    const clickLangHandler = () => {
        const toggledLanguage = language === "ENG" ? "RUS" : "ENG";
        localStorage.setItem("lang", toggledLanguage);
        setLanguage(toggledLanguage);
        i18n.changeLanguage(toggledLanguage);
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
                                    src="../../../public/logo.png"
                                    alt="review logo"
                                />
                            </NavLink>
                        </Navbar.Brand>
                        <Nav>
                            <Button variant="outline-secondary" className="me-2" onClick={clickLangHandler}>
                                {language}
                            </Button>
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
                                    <Button onClick={logOut}>{t("log-out")}</Button>
                                </>
                            ) : (
                                <>
                                    <NavLink to="/sign-in" className="me-2">
                                        <Button>{t("sign-in")}</Button>
                                    </NavLink>
                                    <NavLink to="/sign-up">
                                        <Button>{t("sign-up")}</Button>
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
