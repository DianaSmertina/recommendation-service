import { Row } from "react-bootstrap";
import AuthForm from "../components/auth/AuthForm";

function SignUp() {
    return (
        <Row>
            <main>
                <AuthForm formType="signUp" />
            </main>
        </Row>
    );
}

export default SignUp;
