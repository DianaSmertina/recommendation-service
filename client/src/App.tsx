import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/userSlice";

import AuthForm from "./components/auth/AuthForm";

function App() {
    const dispatch = useDispatch();
    dispatch(setUser("User"));

    return (
        <Routes>
            <Route path="/" element={<AuthForm />} />
        </Routes>
    );
}

export default App;
