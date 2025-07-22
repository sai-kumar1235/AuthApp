import React, { useEffect } from 'react'
import { useFormik } from 'formik';
import Input from '../components/Input';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../authService/authService';
import { login } from '../redux/auth';

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }
  
  return errors;
};

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: async (values) => {
      try {
        const response = await authService.login(values);
        if (!response) {
          console.log("Error");
          return;
        }
        dispatch(login(response.user));
        console.log("Dispatch Completed");
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
  });
  
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p>Please sign in to your account</p>
        </div>
        
        <form onSubmit={formik.handleSubmit} className="auth-form">
          <div className="input-group">
            <Input 
              placeholder="Enter your email" 
              type="email" 
              label="Email" 
              name="email" 
              onChange={formik.handleChange} 
              value={formik.values.email} 
              onBlur={formik.handleBlur}
              className={formik.touched.email && formik.errors.email ? 'error' : ''}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="error-message">{formik.errors.email}</div>
            )}
          </div>
          
          <div className="input-group">
            <Input 
              placeholder="Enter your password" 
              label="Password" 
              type="password" 
              name="password" 
              onChange={formik.handleChange} 
              value={formik.values.password} 
              onBlur={formik.handleBlur}
              className={formik.touched.password && formik.errors.password ? 'error' : ''}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="error-message">{formik.errors.password}</div>
            )}
          </div>
          
          <button type="submit" className="auth-button" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>Don't have an account? <Link to="/signup" className="auth-link">Sign up</Link></p>
          <Link to="/" className="back-home">← Back to Home</Link>
        </div>
      </div>

    </div>
  )
}

export default Login