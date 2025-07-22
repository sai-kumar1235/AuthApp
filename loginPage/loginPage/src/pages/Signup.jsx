import React from 'react';
import { useFormik } from 'formik';
import Input from '../components/Input';
import authService from '../authService/authService';
import { Link, useNavigate } from 'react-router-dom';

const validate = values => {
  const errors = {};
  
  if (!values.name) {
    errors.name = 'Name is required';
  } else if (values.name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }
  
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }
  
  return errors;
};

const SignupForm = () => {
  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    validate,
    onSubmit: async (values) => {
      try {
        const res = await authService.signup(values);
        console.log(res);
        if (res.success) {
          navigate('/login');
        }
      } catch (error) {
        console.error("Signup failed:", error);
      }
    },
  });

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Create Account</h1>
          <p>Join us today! Please fill in your information</p>
        </div>
        
        <form onSubmit={formik.handleSubmit} className="auth-form">
          <div className="input-group">
            <Input
              id="name"
              name="name"
              type="text"
              label="Full Name"
              placeholder="Enter your full name"
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
              className={formik.touched.name && formik.errors.name ? 'error' : ''}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="error-message">{formik.errors.name}</div>
            )}
          </div>

          <div className="input-group">
            <Input
              id="email"
              name="email"
              type="email"
              label="Email Address"
              placeholder="Enter your email"
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
              id="password"
              name="password"
              type="password"
              label="Password"
              placeholder="Create a password"
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
            {formik.isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>Already have an account? <Link to="/login" className="auth-link">Sign in</Link></p>
          <Link to="/" className="back-home">← Back to Home</Link>
        </div>
      </div>

    
    </div>
  );
};

export default SignupForm;