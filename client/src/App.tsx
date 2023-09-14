import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/userSlice";
import { setGroups } from "./redux/reviewGroupsSlice";

import MainPage from "./pages/MainPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Layout from "./components/layout/Layout";
import { IUser } from "./types/types";
import UserPage from "./pages/UserPage";
import ReviewsApi from "./api/ReviewsApi";
import { useEffect } from "react";

function App() {
    const dispatch = useDispatch();
    const currentUser: IUser | null = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    useEffect(() => {
        if (currentUser) {
            dispatch(
                setUser({
                    id: currentUser.id,
                    email: currentUser.email,
                    isAdmin: currentUser.isAdmin,
                })
            );
        }
        (async function() {
            const groups = await ReviewsApi.getGroups();
            console.log(groups.data)
            dispatch(setGroups(groups.data));
        })();
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<MainPage />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/user/:userId" element={<UserPage />} />
            </Route>
        </Routes>
    );
}

export default App;
