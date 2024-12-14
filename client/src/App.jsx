import React from 'react';
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignOut from './pages/SignOut';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Listing from './pages/Listing';
import CreateListing from './pages/CreateListing';
import Search from './pages/Search';
  




export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
      <Route path='/' element={<Home/>} />  
      <Route path='/sign-in' element={<SignIn/>} />  
      <Route path='/sign-up' element={<SignOut/>} />  
      <Route path='/search' element={<Search/>} />  
      <Route path='/about' element={<About/>} />  
      <Route path='/listing/:listingId'  element={<Listing/>} />   
      <Route path='/create-listing'  element={<CreateListing/>} />  
      <Route path='/about' element={<About />} />  
      <Route element={<PrivateRoute/>}>
          <Route path='/profile' element={<Profile/>} />  
          </Route>
      </Routes>
    </BrowserRouter>
  )
}
