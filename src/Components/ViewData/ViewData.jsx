import React, { useState } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router';
import nodata from '../../../public/nodata.jpg'



function getData() {
    let data = localStorage.getItem("emp_data");
    if (data != null) {
        return JSON.parse(data);
    }
    else {
        return [];
    }
}

function ViewData() {

    const navigate = useNavigate();

    const [userdelete, setUserdelete] = useState(null); 

    const handleEdit = (id, index) => {
        // console.log("id index",id,index);
        let gdata = getData();

        let single_re = gdata.filter((d) => {
            return d.id == id;
        });

        console.log(single_re[0]);
        navigate('/edit', { state: { single: single_re[0], index: index } });

    }

    const handleDelete = (id) => {
        let gdata = getData();

        let record = gdata.filter((d) => {
            return d.id != id;
        })

        localStorage.setItem("emp_data", JSON.stringify(record));
        setUserdelete(record);
    }

    return (
        <div>
            <Container>
                <Row>
                    <Table responsive="sm">
                        {
                            getData().length != 0 ?
                                <>
                                    <thead>
                                        <tr>
                                            <th>Sr-no</th>
                                            <th>First name</th>
                                            <th>Last name</th>
                                            <th>Email</th>
                                            <th>Contact</th>
                                            <th>Address</th>
                                            <th>City</th>
                                            <th>Course</th>
                                            <th>Gender</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            getData().map((d, index) => {
                                                return (
                                                    <tr>
                                                        <td>
                                                            {d.id}
                                                        </td>
                                                        <td>{d.fname}</td>
                                                        <td>{d.lname}</td>
                                                        <td>{d.email}</td>
                                                        <td>{d.contact}</td>
                                                        <td>{d.address}</td>
                                                        <td>{d.city}</td>
                                                        <td>{d.course}</td>
                                                        <td>{d.gender}</td>
                                                        <td>
                                                            <Button className='me-2' onClick={() => { handleEdit(d.id, index) }}>Edit</Button>
                                                            <Button className='btn-danger' onClick={() => { handleDelete(d.id) }}>Delete</Button>
                                                        </td>
                                                    </tr>

                                                )
                                            })
                                        }
                                    </tbody>
                                </>
                                :
                                <div style={{ width: "50%", margin: "0 auto"}}>
                                    <img src={nodata} alt="nodata" style={{ width: "100%", height: "100%" }} />
                                </div>
                        }
                    </Table>
                </Row>
            </Container>
        </div>
    )
}

export default ViewData