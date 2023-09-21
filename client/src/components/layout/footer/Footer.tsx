import { Container, Row, Image } from "react-bootstrap";

function Footer() {
    return (
        <Row className="w-100 p-0 m-0 bg-dark">
            <footer className="p-0">
                <Container className="py-1">
                    <a
                        href="https://github.com/DianaSmertina"
                        className="d-flex text-decoration-none align-items-center text-white"
                    >
                        <Image
                            src={"./git-logo.png"}
                            alt="git logo"
                            width={35}
                            height={35}
                        />
                        <p style={{ margin: "0 10px" }}>Diana Smertina</p>
                    </a>
                </Container>
            </footer>
        </Row>
    );
}

export default Footer;
