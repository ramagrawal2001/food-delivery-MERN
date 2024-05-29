import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getRestaurantsByOwnerEmail,
  fetchRestaurants,
} from "../redux/slices/restaurantSlice";

const ProtectedRestorantOwnerRoute = (props) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const restaurantStatus = useSelector((state) => state.restaurants.status);
  const restaurants = useSelector((state) =>
    currentUser ? getRestaurantsByOwnerEmail(state, currentUser.email) : []
  );
  const dispatch = useDispatch();

  const checkCurrUser = async () => {
    if (!currentUser || currentUser === "undefined") {
      setIsLoggedIn(false);
      return navigate("/signin");
    } else {
      if (restaurantStatus === "idle") {
        await dispatch(fetchRestaurants());
      }
      if (restaurants && restaurants.length > 0) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        return navigate("/");
      }
    }
  };

  useEffect(() => {
    checkCurrUser();
  }, [currentUser, navigate, restaurantStatus, dispatch]);

  return <React.Fragment>{isLoggedIn ? props.children : null}</React.Fragment>;
};

export default ProtectedRestorantOwnerRoute;
