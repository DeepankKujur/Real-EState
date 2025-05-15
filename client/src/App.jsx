import React from 'react';
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignOut from './pages/SignOut';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import Chatbot from './components/Chatbot';
import PrivateRoute from './components/PrivateRoute';
import Listing from './pages/Listing';
import CreateListing from './pages/CreateListing';
import Search from './pages/Search';
import Footer from './components/Footer';
import TermsAndCondition from './pages/TermsAndCondition';
import UpdateListing from './pages/UpdateListing';
import ConnectUs from './pages/ConnectUs';
  


TermsAndCondition

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
      <Route path='/connectus' element={<ConnectUs/>} /> 
      <Route path='/listing/:listingId'  element={<Listing/>} />   
      <Route path='/about' element={<About />} />  
      <Route path='/termsandcondition' element={<TermsAndCondition/>} />  
      <Route element={<PrivateRoute/>}>
          <Route path='/profile' element={<Profile/>} /> 
          <Route path='/create-listing'  element={<CreateListing/>} />  
          <Route path='/update-listing/:listingId'  element={<UpdateListing/>} />   
          </Route>
      </Routes>
      <Chatbot/>
      <Footer/>
    </BrowserRouter>
  )
}
