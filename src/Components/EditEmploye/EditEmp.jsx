import React, { useState } from 'react'
import { Button, Container, Form, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router';


function getData(){
    let data = localStorage.getItem("emp_data");
    if(data != null){
        return JSON.parse(data);
    }
    else{
        return [];
    }
}


function EditEmp() {

    const navigate = useNavigate();

    const location = useLocation();

    console.log("Location>>>", location.state);

    const [inputList, setinputList] = useState(location.state.single);



    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value

        setinputList({ ...inputList, [name]: value })
    }

    const handleSubmit = (e) => {

        e.preventDefault();

        let gdata = getData();

        gdata[location.state.index] = inputList;
        localStorage.setItem("emp_data", JSON.stringify(gdata));

        console.log("gdata", gdata);
        navigate("/viewstudent");
    }

    return (
        <>
            <Container>
            <h1>Edit Employees Details</h1>
                <div className="d-flex mt-4">
                    <div className="col-6">
                        <Form onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group className='col-6 mb-3'>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" placeholder="enter first Name" name='fname' value={inputList.fname} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className='col-6 mb-3'>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" placeholder="enter last Name" name='lname' value={inputList.lname} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className='col-6 mb-3'>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="enter email" name='email' value={inputList.email} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className='col-6 mb-3'>
                                    <Form.Label>Contact</Form.Label>
                                    <Form.Control type="number" placeholder="enter number" name='contact' value={inputList.contact} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className="col-6 mb-3">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control placeholder="enter address" name='address' value={inputList.address} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className='col-6 mb-3'>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control type="text" placeholder="enter city" name='city' value={inputList.city} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className='col-6 mb-3'>
                                    <Form.Label>Course</Form.Label>
                                    <Form.Control type="text" placeholder="enter course" name='course' value={inputList.course} onChange={handleChange} />
                                </Form.Group>
                            </Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Gender</Form.Label>
                                {
                                    ['Male', 'Female'].map((label) => {
                                        return (
                                            <Form.Check type="radio" label={label} name="gender" value={label} onChange={handleChange} checked={label == inputList.gender}/>
                                        )
                                    })

                                }

                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>


                </div>
            </Container>
        </>
    )
}

export default EditEmp;