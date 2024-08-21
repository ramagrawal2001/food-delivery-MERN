import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, useNavigate } from "react-router-dom";
const ProtectedRoute = (props) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const currentUser = useSelector((state) => state.user.currentUser)
    const checkCurrUser = () => {
        if (!currentUser || currentUser === 'undefined') {
            setIsLoggedIn(false);
            return navigate('/signin');
        }
        setIsLoggedIn(true);
    }
    useEffect(() => {
            checkCurrUser();
        }, [isLoggedIn]);
    return (
        <React.Fragment>
            {
                isLoggedIn ? props.children : null
            }
        </React.Fragment>
    );
}
export default ProtectedRoute;