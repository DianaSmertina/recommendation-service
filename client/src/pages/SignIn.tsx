import { Row, Col } from "react-bootstrap";
import AuthForm from "../components/auth/AuthForm";

function SignIn() {
    return (
        <Row className="w-100 justify-content-center">
            <Col xs={12} md={10} lg={8} xl={4}>
                <main>
                    <AuthForm formType="signIn" />
                </main>
            </Col>
        </Row>
    );
}

export default SignIn;
