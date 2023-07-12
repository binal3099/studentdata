import React from 'react'
import { Container, Row, Toast } from 'react-bootstrap'


function getData() {
    let data = JSON.parse(localStorage.getItem("emp_data"));
    if (data != null) {
        return data.length;
    }
    else {
        return 0;
    }
}

function Home() {
    return (
        <>
            <Container>
                <Row>
                    <Toast>
                        <Toast.Header>
                            <strong className="me-auto">Total Employee</strong>
                        </Toast.Header>
                        <Toast.Body>{getData()}</Toast.Body>
                    </Toast>
                </Row>
            </Container>
        </>
    )
}

export default Home