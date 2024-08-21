import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import {
  fetchRestaurants,
  deleteRestaurant,
} from "../redux/slices/restaurantSlice";
import { useNavigate } from "react-router-dom";
import { deleteAllMenus } from "../redux/slices/restaurantMenuSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { restaurants } = useSelector((state) => state.restaurants);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [restaurantToDelete, setRestaurantToDelete] = useState(null);
  const [restaurantMenuToDelete, setRestaurantMenuToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleDialogOpen = (id, menuId) => {
    setRestaurantToDelete(id);
    setRestaurantMenuToDelete(menuId);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setRestaurantToDelete(null);
    setRestaurantMenuToDelete(null);
  };

  const handleDeleteRestaurant = (id, menuId) => {
    dispatch(deleteRestaurant(id));
    dispatch(deleteAllMenus(menuId));
    setDialogOpen(false);
    setSnackbarMessage("Restaurant deleted successfully!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h5">Manage Restaurants</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/admin/add-restaurant")}
              style={{ marginBottom: "20px" }}
            >
              Add Restaurant
            </Button>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Rating</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Menu URL</TableCell>
                    <TableCell>Image URL</TableCell>
                    <TableCell>Owner Email</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {restaurants.map((restaurant) => (
                    <TableRow key={restaurant.id}>
                      <TableCell>{restaurant.id}</TableCell>
                      <TableCell>{restaurant.rating}</TableCell>
                      <TableCell>{restaurant.title}</TableCell>
                      <TableCell>
                        {restaurant.type ? restaurant.type.join(", ") : ""}
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          noWrap
                          style={{ maxWidth: "200px" }}
                        >
                          {restaurant.url_menucat}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <img
                          src={restaurant.image}
                          alt={restaurant.title}
                          width="50"
                        />
                      </TableCell>
                      <TableCell>{restaurant.restorantOwnerEmail}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() =>
                            navigate(
                              `/admin/edit-restaurant/${restaurant._id}`,
                              { state: { restaurantId: restaurant.id } }
                            )
                          }
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() =>
                            handleDialogOpen(restaurant._id, restaurant.id)
                          }
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this restaurant?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() =>
              handleDeleteRestaurant(restaurantToDelete, restaurantMenuToDelete)
            }
            color="primary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard;
