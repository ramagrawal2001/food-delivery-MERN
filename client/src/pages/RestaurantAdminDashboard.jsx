import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchRestaurants,
  getRestaurantsByOwnerEmail,
} from "../redux/slices/restaurantSlice";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import RestaurantAdminMenuList from "../components/RestaurantAdminMenuList";

const RestaurantAdminDashboard = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const restaurants = useSelector((state) =>
    currentUser ? getRestaurantsByOwnerEmail(state, currentUser.email) : []
  );
  const status = useSelector((state) => state.restaurants.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchRestaurants());
    }
  }, [dispatch, status]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Restaurant Admin Dashboard
      </Typography>
      <Box mt={2}>
        <Typography variant="h5" gutterBottom>
          My Restaurants
        </Typography>
        {restaurants.length === 0 ? (
          <Typography>You haven't added any restaurants yet.</Typography>
        ) : (
          <Grid container spacing={2}>
            {restaurants.map((restaurant) => (
              <Grid item key={restaurant._id} xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {restaurant.title}
                    </Typography>
                    <Box mt={1}>
                      <div style={{ display: "flex", overflowX: "auto" }}>
                        <RestaurantAdminMenuList restaurantId={restaurant.id} />
                      </div>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default RestaurantAdminDashboard;
