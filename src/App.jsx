import React from 'react'
import StudentData from './Components/StudentData/StudentData'
import ViewData from './Components/ViewData/ViewData'
import EditEmp from './Components/EditEmploye/EditEmp'
import Home from './Components/Home/Home'
import { Route, Routes } from 'react-router'
import Header from './Components/Header/Header'
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/addstudent' element={<StudentData />}></Route>
        <Route path='/viewstudent' element={<ViewData />}></Route>
        <Route path='/edit' element={<EditEmp />}></Route>
      </Routes>
    </>
  )
}

export default App