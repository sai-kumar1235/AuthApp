import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({ children, authentication = false }) {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.isAuthenticated)

    useEffect(() => {
        console.log('Auth Status:', authStatus, 'Required Auth:', authentication);
        
        // If authentication is required but user is not authenticated
        if (authentication && !authStatus) {
            navigate("/login")
        } 
        // If authentication is not required but user is authenticated
        else if (!authentication && authStatus) {
            navigate("/home")
        }
        
        setLoader(false)
    }, [authStatus, navigate, authentication])

    return loader ? <h1>Loading...</h1> : <>{children}</>
}