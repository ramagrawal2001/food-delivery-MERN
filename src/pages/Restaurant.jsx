import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Divider,
  Grid,
  Card,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import MenuCard from "../components/MenuCard";
import ReviewCard from "../components/ReviewCard";
import { getRestaurantById } from "../redux/slices/restaurantSlice";
import AddReviewForm from "../components/AddReviewForm";
import { fetchMenusByRestaurantId } from "../redux/slices/restaurantMenuSlice";
import { fetchReviewsByRestaurantId } from "../redux/slices/reviewSlice";

function Restaurant() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const restaurant = useSelector((state) => getRestaurantById(state, id));
  const menus = useSelector((state) => state.restaurantMenu.menus[id] || []);
  const menuStatus = useSelector(
    (state) => state.restaurantMenu.status[id] || "idle"
  );
  const menuError = useSelector((state) => state.restaurantMenu.error);
  const restaurantReviews = useSelector(
    (state) => state.review?.restaurantReviews[id] || []
  );
  const reviewsStatus = useSelector(
    (state) => state.review?.status[id] || "idle"
  );
  const reviewsError = useSelector((state) => state.reviews?.error);
  const currentUser = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    if (id) {
      if (menuStatus === "idle") {
        dispatch(fetchMenusByRestaurantId(id));
      }
      if (reviewsStatus === "idle") {
        dispatch(fetchReviewsByRestaurantId(id));
      }
    }
  }, [id, dispatch, menuStatus, reviewsStatus]);
  const isOwner =
    currentUser != null &&
    currentUser?.email === restaurant?.restorantOwnerEmail;
  return (
    <Container>
      {restaurant && (
        <>
          <Card sx={{ mb: 2 }}>
            <CardMedia
              component="img"
              height="200"
              image={restaurant.image}
              alt={restaurant.title}
            />
          </Card>
          <Typography variant="h4" gutterBottom>
            {restaurant.title}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Rating: {restaurant.rating}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Type: {restaurant.type.join(", ")}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Delivery Time: {restaurant.deliveryTime} minutes
          </Typography>
          <Divider />
        </>
      )}
      <Box mt={2} mb={4}>
        <Typography variant="h5" gutterBottom>
          Reviews
        </Typography>
        {reviewsStatus === "loading" && <CircularProgress />}
        {reviewsStatus === "failed" && (
          <Typography variant="body1" color="error">
            Error loading reviews: {reviewsError}
          </Typography>
        )}
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          {restaurantReviews.length > 0 ? (
            restaurantReviews.map((review) => (
              <ReviewCard
                key={review._id}
                review={review}
                restaurantId={id}
                menuId={review.menuId}
                isOwner={isOwner}
              />
            ))
          ) : (
            <Typography variant="body1">No reviews available.</Typography>
          )}
        </div>
        {currentUser && !isOwner && <AddReviewForm restaurantId={id} />}
      </Box>

      <Divider />
      <Box mt={2} mb={4}>
        <Typography variant="h5" gutterBottom>
          Menu
        </Typography>
        {menuStatus === "loading" && <CircularProgress />}
        {menuStatus === "failed" && (
          <Typography variant="body1" color="error">
            Error loading menu: {menuError}
          </Typography>
        )}
        {menus.length > 0 ? (
          <Grid container spacing={2}>
            {menus.map((item) => (
              <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                <MenuCard menuData={item} restaurantId={restaurant.id} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1">No menu items available.</Typography>
        )}
      </Box>
    </Container>
  );
}

export default Restaurant;
