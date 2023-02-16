import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Header from './components/Layout/Header/Header'
import Courses from './components/Courses/Courses';
import Footer from './components/Layout/footer/Footer';
import Login from './components/Auth/Login';
import ForgetPassword from './components/Auth/ForgetPassword';
import Register from './components/Auth/Register';
import ResetPassword from './components/Auth/ResetPassword';
import Contact from './components/Contact/Contact';
import Request from './components/Request/Request';
import About from './components/About/About';
import Subscribe from './components/Payments/Subscribe';
import NotFound from './components/Layout/NotFound/NotFound';
import PaymentFail from './components/Payments/PaymentFail';
import Profile from './components/Profile/Profile';
import ChangePassword from './components/Profile/ChangePassword';
import UpdateProfile from './components/Profile/UpdateProfile';
import PaymentSuccess from './components/Payments/PaymentSuccess';
import CoursePage from './components/CoursePage/CoursePage';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import CreateCourse from './components/Admin/CreateCourses/CreateCourse';
import User from './components/Admin/Users/User';
import AdminCourse from './components/Admin/AdminCourses/AdminCourse';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { loadUser } from './redux/actions/userAction';
import { ProtectedRoute } from 'protected-route-react';
import Loader from './components/Layout/Loader/Loader';



function App() {

  // window.addEventListener("contextmenu",(e)=>{
  //   e.preventDefault();
  // });

  const { isAuthenticated, user, message, error, loading } = useSelector(state => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (

    <Router>
      {
        loading ? (<Loader />) : (
          <>
            <Header isAuthenticated={isAuthenticated} user={user} />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/getallcourse' element={<Courses />} />
              <Route path='/request' element={<Request />} />
              <Route path='/login' element={
                <ProtectedRoute isAuthenticated={!isAuthenticated} redirect='/profile'>
                  <Login />
                </ProtectedRoute>} />
              <Route path='/about' element={<About />} />
              <Route
              path="/register"
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/profile"
                >
                  <Register />
                </ProtectedRoute>
              }
            />
              <Route path='/subscribe'
                element={<ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Subscribe user={user}/></ProtectedRoute>} />
              <Route path='/course/:id' 
                element={<ProtectedRoute isAuthenticated={isAuthenticated} >
                  <CoursePage user={user}/>
                  </ProtectedRoute>} 
              />
              <Route path='/paymentfail' element={<PaymentFail />} />
              <Route path='/paymentsuccess' element={<PaymentSuccess />} />
              <Route path='/forgetpassword' 
              element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile">
                <ForgetPassword />
              </ProtectedRoute>} 
              />
              <Route path='/resetpassword/:token' element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile">
                <ResetPassword />
              </ProtectedRoute>} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/profile'
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Profile user={user} />
                  </ProtectedRoute>
                } />
              <Route path='/changepassword'
                element={<ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ChangePassword /></ProtectedRoute>} />
              <Route path='/updateprofile'
                element={<ProtectedRoute isAuthenticated={isAuthenticated}>
                  <UpdateProfile user={user} />
                </ProtectedRoute>} />
              <Route path='*' element={<NotFound />} />



              {/* Admin Routes */}
              <Route path='/admin/dashboard'
                element={<ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  adminRouth={true} isAdmin={user && user.role === 'admin'}>
                  <Dashboard /></ProtectedRoute>} />
              <Route path='/admin/createcourse'
                element={<ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  adminRouth={true} isAdmin={user && user.role === 'admin'}>
                  <CreateCourse /></ProtectedRoute>} />
              <Route path='/admin/user'
                element={<ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  adminRouth={true} isAdmin={user && user.role === 'admin'}>
                  <User /></ProtectedRoute>} />
              <Route path='/admin/admincourse'
                element={<ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  adminRouth={true} isAdmin={user && user.role === 'admin'}>
                  <AdminCourse /></ProtectedRoute>} />


            </Routes>
            <Footer />
            <Toaster />
          </>
        )
      }
    </Router>
  );
}

export default App;
