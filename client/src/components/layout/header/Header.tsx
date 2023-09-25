import { useState } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { setUser } from "../../../redux/userSlice";
import UserApi from "../../../api/UserApi";
import { RootState } from "../../../redux/store";
import logo from "../../../assets/logo.png";

import styles from "./header.module.scss";

function Header() {
    const dispatch = useDispatch();
    const currentUserId = useSelector((state: RootState) => state.user.id);
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const currentLang = localStorage.getItem("lang");
    const [language, setLanguage] = useState(currentLang || "ENG");
    const [showNav, setShowNav] = useState(false);

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

    const toggleNav = () => {
        setShowNav(!showNav);
    };

    return (
        <Navbar expand="md" className="mb-4 w-100">
            <Container>
                <Navbar.Brand
                    as={NavLink}
                    to="/"
                    className="me-md-auto text-decoration-none link-dark"
                >
                    <img src={logo} alt="review logo" />
                </Navbar.Brand>
                <Navbar.Toggle
                    aria-controls="responsive-navbar-nav"
                    onClick={toggleNav}
                />
                <Navbar.Collapse
                    id="responsive-navbar-nav"
                    className={showNav ? "show" : ""}
                >
                    <Nav className="ms-auto">
                        <Button
                            variant="outline-primary"
                            className={`${styles.btn} my-2 ms-auto`}
                            onClick={clickLangHandler}
                        >
                            {language}
                        </Button>
                        {currentUserId ? (
                            <>
                                <Nav.Link as={NavLink} to={`/user/${currentUserId}`} className="ms-auto">
                                    <Button className={`${styles.btn}`}>
                                        {t("my-page")}
                                    </Button>
                                </Nav.Link>
                                <Button onClick={logOut} className={`${styles.btn } ms-auto my-2`}>
                                    {t("log-out")}
                                </Button>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={NavLink} to="/sign-in" className="ms-auto pe-0">
                                    <Button className={`${styles.btn}`}>
                                        {t("sign-in")}
                                    </Button>
                                </Nav.Link>
                                <Nav.Link as={NavLink} to="/sign-up" className="ms-auto">
                                    <Button className={styles.btn}>
                                        {t("sign-up")}
                                    </Button>
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
