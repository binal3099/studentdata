import React, { useState } from 'react'
import { Button, Container, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap'
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router';
import nodata from '../../../public/nodata.jpg'
import { IoEllipsisVertical } from "react-icons/io5";


function getData() {
    let data = localStorage.getItem("emp_data");
    if (data != null) {
        return JSON.parse(data);
    }
    else {
        return [];
    }
}

const filterdata = () => {
    const newfildata = getData();
    const newdatafilter = newfildata.map((f) => {
        return f.course
    })
    // console.log("newdatafilter",newdatafilter);
    const filter_data = newdatafilter.filter((f, index) => {
        // console.log("f",f);
        return newdatafilter.indexOf(f) == index;
    })
    return filter_data;
    // console.log("filter_data",filter_data);
}

function ViewData() {

    const navigate = useNavigate();
    const [userview, setuserView] = useState(getData());

    const [inputList, setInputList] = useState({
        search: ""
    })

    const [sID, setSId] = useState({
        id:'',
        isToggle: false
    });

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
        // console.log("id",id);
        let gdata = getData();

        let record = gdata.filter((d) => {
            return d.id != id;
        })

        localStorage.setItem("emp_data", JSON.stringify(record));
        setuserView(record);
    }

    const handlefilter = (e) => {
        // console.log(e.target.value);
        let value = e.target.value;

        if (value != -1) {
            let f_data = getData();
            // console.log("f_data",f_data);

            let fil_data = f_data.filter((f) => {
                return f.course == value;
            })
            // console.log("val",fil_data);
            setuserView(fil_data);
        }
        else {
            setuserView(getData());
        }
    }

    const handleSearch = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setInputList({ [name]: value })

        let s_data = getData();

        let set_data = s_data.filter((s) => {
            return s.fname.toLowerCase().indexOf(value.toLowerCase()) > -1;
        })
        // console.log("se",set_data);
        setuserView(set_data);
    }

    const handleSort = (type) => {
        let so_data = getData()

        if (type == "aec") {
            let sort_data = so_data.sort((stuA, stuB) => {
                // console.log("stu",stuA.fname,stuB.fname);
                return stuA["fname"].localeCompare(stuB["fname"]);
            })
            // console.log("sort_data",sort_data);
            setuserView(sort_data);
        }
        else {
            let sort_data = so_data.sort((stuA, stuB) => {
                // console.log("stu",stuA.fname,stuB.fname);
                return stuB["fname"].localeCompare(stuA["fname"]);
            })
            // console.log("sort_data",sort_data);
            setuserView(sort_data);
        }

    }


    const handleView = (d) =>{
        // // console.log("d",d);
        
        navigate('/view', {state : d})

    }

    const handleDropmenu = (id)=>{
        console.log("handleDropmenu",id);

        if(sID.id == id){
            setSId({
             id:id,
             isToggle: false
            })
        }
        else{
            setSId({
                id:id,
                isToggle: true
               })
        }
        // let drop = document.getElementById("drop");
        // drop.classList.toggle("view");
    }

    const handleDropRemove = () =>{
        console.log("Blur....");
        setSId({
            id:'',
            isToggle: false
        });
    }

    return (
        <div>
            <Container>
                <Row>
                    <div className='d-flex mt-2'>
                        <div className='col-4 mb-3'>
                            <select onChange={(e) => { handlefilter(e) }}>
                                <option value={"-1"}>ALL</option>
                                {
                                    filterdata().map((fi) => {
                                        console.log("fi", fi);
                                        return (
                                            <option value={fi}>{fi}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='col-4'>
                            <Button className='btn btn-primary me-2' onClick={() => handleSort("aec")}>
                                A-Z
                            </Button>
                            <Button className='btn btn-primary' onClick={() => handleSort("dec")}>
                                Z-A
                            </Button>
                        </div>
                        <div className='col-4'>
                            <Form>
                                <Form.Group className='mb-3'>
                                    <Form.Control type="text" placeholder="search" name='city' value={inputList.search} onChange={handleSearch} />
                                </Form.Group>
                            </Form>
                        </div>
                    </div>
                    <Table responsive="sm">
                        {
                            userview.length != 0 ?
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
                                            userview.map((d, index) => {
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
                                                        <td className='position-relative' ><button className='btn' id='dropmenu' onClick={() => handleDropmenu(d.id)} ><IoEllipsisVertical /></button>
                                                        {
                                                            sID.id === d.id && sID.isToggle ?
                                                            <div id='drop' className='view'>
                                                                <button className='btn' onClick={() => { handleEdit(d.id, index) }}>Edit</button>
                                                                <button className='btn' onClick={() => { handleDelete(d.id) }}>Delete</button>
                                                                <button className='btn' onClick={() => {handleView(d)}}>View</button>
                                                            </div>
                                                            :
                                                            ''

                                                        }
                                                        </td>
        
                                                        {/* <td>
                                                            <DropdownButton id="dropdown-basic-button">
                                                                
                                                                <Dropdown.Item onClick={() => { handleEdit(d.id, index) }}>Edit</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => { handleDelete(d.id) }}>Delete</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => {handleView(d)}}>View</Dropdown.Item>
                                                            </DropdownButton>
                                                        </td> */}
                                                        {/* <td>
                                                            <Button className='me-2' onClick={() => { handleEdit(d.id, index) }}>Edit</Button>
                                                            <Button className='btn-danger' onClick={() => { handleDelete(d.id) }}>Delete</Button>
                                                        </td> */}
                                                    </tr>

                                                )
                                            })
                                        }
                                    </tbody>
                                </>
                                :
                                <div style={{ width: "50%", margin: "0 auto" }}>
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