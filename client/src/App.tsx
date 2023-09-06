import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/userSlice";

import MainPage from "./pages/MainPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Layout from "./components/layout/Layout";

function App() {
    const dispatch = useDispatch();
    dispatch(setUser("User"));

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<MainPage />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
            </Route>
        </Routes>
    );
}

export default App;
