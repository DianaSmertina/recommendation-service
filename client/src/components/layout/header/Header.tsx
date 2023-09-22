import { useState } from "react";
import { Row, Navbar, Container, Nav, Button } from "react-bootstrap";
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
                                    src={logo}
                                    alt="review logo"
                                />
                            </NavLink>
                        </Navbar.Brand>
                        <Nav>
                            <Button
                                variant="outline-primary"
                                className="mx-2 me-1"
                                onClick={clickLangHandler}
                            >
                                {language}
                            </Button>
                            {currentUserId ? (
                                <>
                                    <NavLink to={`/user/${currentUserId}`}>
                                        <Button className={styles.btn}>{t("my-page")}</Button>
                                    </NavLink>
                                    <Button onClick={logOut} className={styles.btn}>
                                        {t("log-out")}
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <NavLink to="/sign-in" >
                                        <Button className={styles.btn}>{t("sign-in")}</Button>
                                    </NavLink>
                                    <NavLink to="/sign-up">
                                        <Button className={styles.btn}>{t("sign-up")}</Button>
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
