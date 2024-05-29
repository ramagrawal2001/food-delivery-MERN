import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  addRestaurant,
  updateRestaurant,
  fetchRestaurants,
} from "../redux/slices/restaurantSlice";
import { deleteAllMenusByRestaurantId } from "../redux/slices/restaurantMenuSlice";

const AddEditRestaurant = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const { restaurants } = useSelector((state) => state.restaurants);
  const isEditMode = Boolean(id);

  const [restaurant, setRestaurant] = useState({
    id: "",
    rating: "",
    title: "",
    type: [],
    url_menucat: "",
    image: "",
    restorantOwnerEmail: "",
  });

  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    if (isEditMode) {
      const existingRestaurant = restaurants.find((r) => r._id === id);
      if (existingRestaurant) {
        setRestaurant(existingRestaurant);
      }
    } else {
      setRestaurant({
        id: "",
        rating: "",
        title: "",
        type: [],
        url_menucat: "",
        image: "",
        restorantOwnerEmail: "",
      });
    }
  }, [id, isEditMode, restaurants]);

  const handleTypeChange = (event) => {
    const value = event.target.value;
    setRestaurant({
      ...restaurant,
      type: typeof value === "string" ? value.split(",") : value,
    });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleSubmit = () => {
    let validationErrors = {};

    if (!restaurant.rating) validationErrors.rating = "Rating is required";
    if (!restaurant.title) validationErrors.title = "Title is required";
    if (restaurant.type.length === 0)
      validationErrors.type = "Type is required";
    if (!restaurant.image) validationErrors.image = "Image URL is required";
    if (!restaurant.restorantOwnerEmail)
      validationErrors.restorantOwnerEmail = "Owner Email is required";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setSnackbarMessage("Please correct the errors.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    if (isEditMode) {
      dispatch(deleteAllMenusByRestaurantId(state.restaurantId));
      dispatch(updateRestaurant({ id, updatedRestaurant: restaurant }));
      setSnackbarMessage("Restaurant updated successfully!");
    } else {
      const newId = new Date().toISOString();
      dispatch(addRestaurant({ ...restaurant, id: newId }));
      setSnackbarMessage("Restaurant added successfully!");
    }

    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    navigate("/admin");
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        {isEditMode ? "Edit Restaurant" : "Add Restaurant"}
      </Typography>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h5">
          {isEditMode ? "Edit Restaurant" : "Add New Restaurant"}
        </Typography>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={restaurant.title}
          onChange={(e) =>
            setRestaurant({ ...restaurant, title: e.target.value })
          }
          margin="normal"
          error={!!errors.title}
          helperText={errors.title}
        />
        <TextField
          label="Rating"
          variant="outlined"
          fullWidth
          value={restaurant.rating}
          onChange={(e) =>
            setRestaurant({ ...restaurant, rating: e.target.value })
          }
          margin="normal"
          error={!!errors.rating}
          helperText={errors.rating}
        />
        <FormControl
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!errors.type}
        >
          <InputLabel>Type</InputLabel>
          <Select
            label="Type"
            multiple
            value={restaurant.type}
            onChange={handleTypeChange}
          >
            {["Chicken", "Meat", "Vegetarian", "Vegan"].map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
          {errors.type && <Typography color="error">{errors.type}</Typography>}
        </FormControl>
        <TextField
          label="Menu URL"
          variant="outlined"
          fullWidth
          value={restaurant.url_menucat}
          onChange={(e) =>
            setRestaurant({ ...restaurant, url_menucat: e.target.value })
          }
          margin="normal"
        />
        <TextField
          label="Image URL"
          variant="outlined"
          fullWidth
          value={restaurant.image}
          onChange={(e) =>
            setRestaurant({ ...restaurant, image: e.target.value })
          }
          margin="normal"
          error={!!errors.image}
          helperText={errors.image}
        />
        <TextField
          label="Owner Email"
          variant="outlined"
          fullWidth
          value={restaurant.restorantOwnerEmail}
          onChange={(e) =>
            setRestaurant({
              ...restaurant,
              restorantOwnerEmail: e.target.value,
            })
          }
          margin="normal"
          error={!!errors.restorantOwnerEmail}
          helperText={errors.restorantOwnerEmail}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {isEditMode ? "Update Restaurant" : "Add Restaurant"}
        </Button>
      </Paper>
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
    </Container>
  );
};

export default AddEditRestaurant;
