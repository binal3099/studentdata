import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import img1 from '../../../public/img-1.jpg'
import { useNavigate } from 'react-router';
import { useState } from 'react';


function getData() {
    let data = localStorage.getItem("emp_data");
    if (data != null) {
        return JSON.parse(data);
    }
    else {
        return [];
    }
}


function StudentData() {

   const navigate = useNavigate();

    const [inputList, setinputList] = useState({
        fname: '',
        lname: '',
        email: '',
        contact: '',
        address: '',
        city: '',
        course: '',
        gender: ''
    });

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value

        setinputList({ ...inputList, [name]: value })
        // console.log("name",name);

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let gdata = getData();
        let uid = Math.floor(Math.random()*100);

        // let uid = gdata.length > 0 ? 
        //             gdata[gdata.length -1].id + 1 
        //         : 101;

        console.log(uid,"uidd");

        let ndata = ({ ...inputList, id: uid });

        let new_data = ([...gdata, ndata]);

        localStorage.setItem("emp_data", JSON.stringify(new_data));
        navigate("/viewstudent");
    }

    return (
        <>
            <Container>
                <div className="d-flex mt-4">
                    <div className="col-6">
                        <Form onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group className='col-6 mb-3'>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" placeholder="enter first Name" name='fname' value={inputList.fname} onChange={handleChange}/>
                                </Form.Group>
                                <Form.Group className='col-6 mb-3'>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" placeholder="enter last Name" name='lname' value={inputList.lname} onChange={handleChange}/>
                                </Form.Group>
                                <Form.Group className='col-6 mb-3'>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="enter email" name='email' value={inputList.email} onChange={handleChange}/>
                                </Form.Group>
                                <Form.Group className='col-6 mb-3'>
                                    <Form.Label>Contact</Form.Label>
                                    <Form.Control type="number" placeholder="enter number" name='contact' value={inputList.contact} onChange={handleChange}/>
                                </Form.Group>
                                <Form.Group className="col-6 mb-3">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control placeholder="enter address" name='address' value={inputList.address} onChange={handleChange}/>
                                </Form.Group>
                                <Form.Group className='col-6 mb-3'>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control type="text" placeholder="enter city" name='city' value={inputList.city} onChange={handleChange}/>
                                </Form.Group>
                                <Form.Group className='col-6 mb-3'>
                                    <Form.Label>Course</Form.Label>
                                    <Form.Control type="text" placeholder="enter course" name='course' value={inputList.course} onChange={handleChange}/>
                                </Form.Group>
                            </Row>
                            <Form.Group className="mb-3">
                            <Form.Label>Gender</Form.Label>
                                {
                                    ['Male','Female'].map((label)=>{
                                        return(
                                            <Form.Check type="radio" label={label} name = "gender" value={label} onChange={handleChange}/>
                                        )
                                    })

                                }
                               
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>
                    <div className="col-6">
                        <img src={img1} alt="img-1" style={{ width: "100%", height: "100%" }} />
                    </div>

                </div>
            </Container>

        </>

    );
}

export default StudentData;