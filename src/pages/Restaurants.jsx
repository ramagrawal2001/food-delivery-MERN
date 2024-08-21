import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurants } from "../redux/slices/restaurantSlice";
import RestaurantCard from "../components/RestaurantCard";
import { Button, Container, Grid, CircularProgress } from "@mui/material"; 
import { useNavigate } from "react-router";

export default function Restaurants() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const restaurantsData = useSelector((state) => state.restaurants.restaurants);
  const status = useSelector((state) => state.restaurants.status);
  const error = useSelector((state) => state.restaurants.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchRestaurants());
    } else if (status === "failed") {
      setTimeout(() => {
        dispatch(fetchRestaurants());
      }, 3000);
    }
  }, [status, dispatch]);

  return (
    <div
      style={{
        backgroundColor: "#CDE8E5",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {status === "loading" && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </div>
      )}

      {status === "failed" && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Error: {error}
        </div>
      )}

      {status !== "loading" && status !== "failed" && (
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "20px",
          }}
        >
          <Grid container spacing={6}>
            {restaurantsData.map((restaurant) => (
              <Grid
                item
                key={restaurant.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                justifyContent="center"
              >
                <RestaurantCard restaurantData={restaurant} />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </div>
  );
}