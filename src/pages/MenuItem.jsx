import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  CardMedia,
  Divider,
  Button,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MuiAlert from "@mui/material/Alert";
import { useLocation, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { getRestaurantById } from "../redux/slices/restaurantSlice";
import { addToCart } from "../redux/slices/cartSlice";
import { deleteMenu } from "../redux/slices/restaurantMenuSlice";
import { fetchReviewsByMenuId } from "../redux/slices/reviewSlice";
import ReviewCard from "../components/ReviewCard";
import AddReviewForm from "../components/AddReviewForm"; 

export default function MenuItem() {
  const { state } = useLocation();
  const { menuData, restaurantId } = state;
  const restaurant = useSelector((state) =>
    getRestaurantById(state, restaurantId)
  );
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const menuReviews = useSelector(
    (s) =>
      (s.review?.menuReviews[restaurantId]
        ? s.review?.menuReviews[restaurantId][menuData.id]
        : []) || []
  );
  const reviewsStatus = useSelector(
    (s) =>
      (s.review?.menuStatus[restaurantId]
        ? s.review?.menuStatus[restaurantId][menuData.id]
        : "idle") || "idle"
  );
  const reviewsError = useSelector((s) => s.reviews?.error);

  useEffect(() => {
    if (restaurantId && menuData?.id) {
      dispatch(fetchReviewsByMenuId({ restaurantId, menuId: menuData.id }));
    }
  }, [dispatch, restaurantId, menuData]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleAddToCart = () => {
    if (currentUser) {
      dispatch(
        addToCart({
          userId: currentUser._id,
          restaurantId,
          id: menuData.id,
          name: menuData.name,
          price: menuData.price,
          category: menuData.category,
          ingredients: menuData.ingredients,
          image: menuData.image,
          description: menuData.description,
          quantity: 1,
          restaurantName: restaurant.title,
        })
      );
      setSnackbarOpen(true);
    } else {
      setSnackbarOpen(true);
    }
  };

  const handleEditClick = () => {
    navigate(`/restaurant-admin/edit-menu/${menuData._id}`, {
      state: { restaurantId: restaurant.id },
    });
  };

  const handleDeleteClick = () => {
    dispatch(deleteMenu({ restaurantId, id: menuData.id }));
    setDialogOpen(false);
    navigate(-1);
  };

  const isOwner =
    currentUser != null &&
    currentUser?.email === restaurant?.restorantOwnerEmail;

  return (
    <Container maxWidth="md" sx={{ padding: 2 }}>
      {menuData && (
        <>
          <Typography variant="h4" gutterBottom>
            {menuData.name}
          </Typography>
          <CardMedia
            component="img"
            image={menuData.image}
            alt={menuData.name}
            sx={{
              height: 300,
              width: "100%",
              objectFit: "contain",
              marginBottom: 2,
              borderRadius: 2,
              boxShadow: 2,
            }}
          />
          <Typography variant="h6" gutterBottom>
            Category: {menuData.category}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <b>Ingredients:</b> {menuData.ingredients}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <b>Description:</b> {menuData.description}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <b>Price:</b> {menuData.price} Rs
          </Typography>
          <Divider sx={{ margin: "20px 0" }} />

          <Typography variant="h5" gutterBottom>
            Restaurant Name: {restaurant.title}
          </Typography>

          <Box
            sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
          >
            {isOwner ? (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={handleEditClick}
                  sx={{ padding: 1.5, borderRadius: 2, marginRight: 1 }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                  onClick={handleDialogOpen}
                  sx={{ padding: 1.5, borderRadius: 2 }}
                >
                  Delete
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddShoppingCartIcon />}
                onClick={handleAddToCart}
                sx={{ padding: 1.5, borderRadius: 2 }}
              >
                Add to Cart
              </Button>
            )}
          </Box>

          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
          >
            <MuiAlert
              onClose={handleSnackbarClose}
              severity={currentUser ? "success" : "error"}
              sx={{ width: "100%" }}
            >
              {currentUser
                ? "Item added to cart!"
                : "Please log in to add items to your cart!"}
            </MuiAlert>
          </Snackbar>

          <Dialog open={dialogOpen} onClose={handleDialogClose}>
            <DialogTitle>Confirm Delete</DialogTitle>

            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this Menu Item?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleDeleteClick} color="primary">
                Delete
              </Button>
            </DialogActions>
          </Dialog>

          <Box mt={4}>
            <Typography variant="h5" gutterBottom>
              Reviews
            </Typography>
            {reviewsStatus == "loading" && <CircularProgress />}
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              {menuReviews && menuReviews.length > 0 ? (
                menuReviews.map((review) => (
                  <ReviewCard
                    key={review._id}
                    review={review}
                    restaurantId={restaurantId}
                    menuId={menuData.id}
                    isOwner={isOwner}
                  />
                ))
              ) : (
                <Typography variant="body1">No reviews available.</Typography>
              )}
            </div>
            {currentUser && !isOwner && (
              <AddReviewForm restaurantId={restaurantId} menuId={menuData.id} />
            )}
          </Box>
        </>
      )}
    </Container>
  );
}
