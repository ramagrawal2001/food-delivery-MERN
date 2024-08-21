import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Box,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import MuiAlert from "@mui/material/Alert";
import { getRestaurantById } from "../redux/slices/restaurantSlice";
import { deleteMenu } from "../redux/slices/restaurantMenuSlice";

export default function MenuCard({ menuData, restaurantId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const restaurant = useSelector((state) =>
    getRestaurantById(state, restaurantId)
  );
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleViewDetailsClick = () => {
    navigate(`/menuitem/${menuData.id}`, {
      state: {
        menuData,
        restaurantId,
      },
    });
  };

  const handleAddToCartClick = (event) => {
    event.stopPropagation();

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
    }
    handleSnackbarOpen();
  };

  const handleEditClick = (event) => {
    event.stopPropagation();
    navigate(`/restaurant-admin/edit-menu/${menuData._id}`, {
      state: { restaurantId: restaurant.id },
    });
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDeleteClick = () => {
    dispatch(deleteMenu({ restaurantId, id: menuData.id }));
    setDialogOpen(false);
  };

  const isOwner =
    currentUser != null &&
    currentUser?.email === restaurant?.restorantOwnerEmail;

  const cardStyle = {
    position: "relative",
    width: 220,
    height: 350,
    "@media (min-width:600px)": {
      height: 380,
    },
    cursor: "pointer",
    backgroundColor: "#EEF7FF",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "16px",
  };
  const mediaStyle = {
    height: 140,
    width: "95%",
    objectFit: "contain",
    "@media (min-width:600px)": {
      height: 200,
    },
  };
  const headingStyle = {
    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    textOverflow: "ellipsis",
    WebkitLineClamp: 1,
    marginBottom: "5px",
  };
  const descriptionStyle = {
    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    textOverflow: "ellipsis",
    WebkitLineClamp: 3,
    marginBottom: "5px",
  };

  return (
    <Card sx={cardStyle}>
      <CardMedia
        component="img"
        sx={mediaStyle}
        image={menuData.image}
        alt={menuData.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={headingStyle}>
          {menuData.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={descriptionStyle}
        >
          <b>Ingredients:</b> {menuData.ingredients}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Price:</b> {menuData.price} Rs
        </Typography>
      </CardContent>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px",
        }}
      >
        <IconButton onClick={handleViewDetailsClick} aria-label="show-details">
          View Details
        </IconButton>
        {isOwner ? (
          <>
            <IconButton onClick={handleEditClick} aria-label="edit-item">
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleDialogOpen} aria-label="delete-item">
              <DeleteIcon />
            </IconButton>
          </>
        ) : (
          <IconButton onClick={handleAddToCartClick} aria-label="add-to-cart">
            <AddShoppingCart />
          </IconButton>
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
          {currentUser ? "Item added to cart!" : "Sign in to save your items!"}
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
    </Card>
  );
}
