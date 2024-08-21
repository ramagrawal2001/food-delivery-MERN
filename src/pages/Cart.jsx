import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Modal,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  removeFromCart,
  fetchCartItems,
  resetCart,
  checkoutCart,
} from "../redux/slices/cartSlice";

const PopupModal = ({ open, onClose, message }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Checkout
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {message}
        </Typography>
        <Button onClick={onClose} sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

const Cart = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const cartProducts = useSelector((state) => state.cart.menus);
  const cartStatus = useSelector((state) => state.cart.status);
  const cartError = useSelector((state) => state.cart.error);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  useEffect(() => {
    if (cartStatus === "idle" && currentUser) {
      dispatch(fetchCartItems(currentUser._id));
    }
  }, [dispatch, cartStatus, currentUser]);

  const handleRemoveItem = (itemId, restId) => {
    dispatch(
      removeFromCart({
        userId: currentUser._id,
        restaurantId: restId,
        id: itemId,
      })
    );
  };

  const handleCheckout = () => {
    dispatch(checkoutCart(currentUser._id));
    setCheckoutModalOpen(true);
  };

  const handleCheckoutModalClose = () => {
    setCheckoutModalOpen(false);
  };

  const calculateTotals = () => {
    let totalQuantity = 0;
    let totalPrice = 0;
    if (cartProducts)
      for (var i = 0; i < cartProducts.length; i++) {
        totalQuantity += cartProducts[i].quantity;
        totalPrice += cartProducts[i].price * cartProducts[i].quantity;
      }
    return { totalQuantity, totalPrice };
  };

  if (cartStatus === "loading") {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          bgcolor: "#EEF7FF",
        }}
      >
        <CircularProgress />
      </Container>
    );
  } else if (cartStatus === "failed") {
    return (
      <Container>
        <Typography variant="h6" color="error">
          Error loading cart: {cartError}
        </Typography>
      </Container>
    );
  }

  const { totalQuantity, totalPrice } = calculateTotals();

  return (
    <Container sx={{ mt: 4, bgcolor: "#EEF7FF", borderRadius: 2, p: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "center", color: "#4D869C" }}
      >
        Cart
      </Typography>
      {cartProducts.length > 0 && (
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            bgcolor: "#CDE8E5",
            borderRadius: 2,
            p: 2,
            mb: 4,
          }}
        >
          <Typography variant="h6" sx={{ color: "#7AB2B2" }}>
            Total Products: {totalQuantity}
          </Typography>
          <Typography variant="h6" sx={{ color: "#7AB2B2" }}>
            Total Price:{" "}
            {totalPrice.toLocaleString(undefined, { maximumFractionDigits: 3 })}{" "}
            Rs
          </Typography>
        </Container>
      )}
      {cartProducts.length > 0 ? (
        <Grid container spacing={2}>
          {cartProducts.map((menuItem) => (
            <Grid
              item
              key={menuItem.id + menuItem.restaurantId}
              xs={12}
              sm={6}
              md={4}
              lg={3}
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  bgcolor: "#CDE8E5",
                  borderRadius: 2,
                  border: "1px solid #7AB2B2",
                }}
              >
                <CardMedia
                  component="img"
                  alt="Menu Item Image"
                  height="200"
                  image={menuItem.image}
                  sx={{
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                />
                <CardContent>
                  <Typography variant="h5" sx={{ color: "#4D869C" }}>
                    {menuItem.name}
                  </Typography>
                  <Typography sx={{ color: "#4D869C" }}>
                    Price: {menuItem.price} Rs
                  </Typography>
                  <Typography sx={{ color: "#4D869C" }}>
                    Quantity: {menuItem.quantity}
                  </Typography>
                  <Typography sx={{ color: "#4D869C" }}>
                    Total Price:{" "}
                    {(menuItem.price * menuItem.quantity).toLocaleString(
                      undefined,
                      { maximumFractionDigits: 3 }
                    )}{" "}
                    Rs
                  </Typography>
                  <Typography sx={{ color: "#4D869C" }}>
                    Restaurant: {menuItem.restaurantName}
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    color="error"
                    onClick={() =>
                      handleRemoveItem(menuItem.id, menuItem.restaurantId)
                    }
                    sx={{ mt: 2 }}
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography
          variant="h6"
          sx={{ mt: 4, textAlign: "center", color: "#4D869C" }}
        >
          No items in the cart
        </Typography>
      )}
      {cartProducts.length > 0 && (
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 4,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleCheckout}
            sx={{ bgcolor: "#7AB2B2", color: "#fff" }}
          >
            Checkout
          </Button>
        </Container>
      )}
      <PopupModal
        open={checkoutModalOpen}
        onClose={handleCheckoutModalClose}
        message="Your order will be delivered soon."
      />
    </Container>
  );
};

export default Cart;
