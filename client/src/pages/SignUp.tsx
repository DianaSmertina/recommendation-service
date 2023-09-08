import { Row, Col } from "react-bootstrap";
import AuthForm from "../components/auth/AuthForm";

function SignUp() {
    return (
        <Row className="w-100 justify-content-center">
            <Col xs={12} md={10} lg={8} xl={4}>
                <main>
                    <AuthForm formType="signUp" />
                </main>
            </Col>
        </Row>
    );
}

export default SignUp;
