import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { editMenu, deleteMenu, addMenu } from "../redux/slices/restaurantMenuSlice";

const AddEditMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const menus = useSelector(
    (s) => s.restaurantMenu.menus[state.restaurantId] || []
  );
  const isEditMode = Boolean(id);

  const [menu, setMenu] = useState({
    name: "",
    category: "",
    ingredients: "",
    image: "",
    description: "",
    price: "",
  });

  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    if (isEditMode) {
      const existingMenu = menus.find((m) => m._id === id);
      if (existingMenu) {
        setMenu(existingMenu);
      }
    } else {
      setMenu({
        name: "",
        category: "",
        ingredients: "",
        image: "",
        description: "",
        price: "",
      });
    }
  }, [id, isEditMode, menus]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleSubmit = () => {
    let validationErrors = {};

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setSnackbarMessage("Please correct the errors.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    if (isEditMode) {
      dispatch(
        editMenu({
          restaurantId: state.restaurantId,
          id: menu.id,
          updatedMenu: menu,
        })
      );
      setSnackbarMessage("Menu item updated successfully!");
    } else {
      dispatch(addMenu({restaurantId: state.restaurantId,menu}));
      setSnackbarMessage("Menu item added successfully!");
    }

    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    navigate("/restaurant-admin"); 
  };

  const handleDelete = () => {
    dispatch(deleteMenu({ restaurantId: state.restaurantId, id }));
    setSnackbarMessage("Menu item deleted successfully!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    navigate("/restaurant-admin");
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        {isEditMode ? "Edit Menu Item" : "Add Menu Item"}
      </Typography>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <TextField
          label="Name"
          fullWidth
          value={menu.name}
          onChange={(e) => setMenu({ ...menu, name: e.target.value })}
          margin="normal"
        />
        <TextField
          label="Category"
          fullWidth
          value={menu.category}
          onChange={(e) => setMenu({ ...menu, category: e.target.value })}
          margin="normal"
        />
        <TextField
          label="Ingredients"
          fullWidth
          value={menu.ingredients}
          onChange={(e) => setMenu({ ...menu, ingredients: e.target.value })}
          margin="normal"
        />
        <TextField
          label="Image URL"
          fullWidth
          value={menu.image}
          onChange={(e) => setMenu({ ...menu, image: e.target.value })}
          margin="normal"
        />
        <TextField
          label="Description"
          fullWidth
          value={menu.description}
          onChange={(e) => setMenu({ ...menu, description: e.target.value })}
          margin="normal"
        />
        <TextField
          label="Price"
          fullWidth
          value={menu.price}
          onChange={(e) => setMenu({ ...menu, price: e.target.value })}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {isEditMode ? "Update Menu Item" : "Add Menu Item"}
        </Button>
        {isEditMode && (
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </Button>
        )}
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

export default AddEditMenu;
