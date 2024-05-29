import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Snackbar,
  Box,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { addQuery, fetchQueries } from "../redux/slices/contactUsSlice";

const ContactUs = () => {
  const dispatch = useDispatch();
  const queries = useSelector((state) => state.contactUs.queries);
  const status = useSelector((state) => state.contactUs.status);
  const currentUser = useSelector((state) => state.user.currentUser);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  useEffect(() => {
    if (currentUser && currentUser.isAdmin && status == "idle") {
      dispatch(fetchQueries());
    }
  }, [status, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addQuery(formData));
    handleSnackbarOpen();
    setFormData({ name: "", email: "", message: "" });
  };
  return (
    <Container>
      <Grid
        container
        justifyContent="center"
        style={{ height: "80vh" }}
      >
        {currentUser && currentUser.isAdmin ? (
          <Container padding={4} style={{ margin: "20px" }}>
            <Paper elevation={3} style={{ padding: "20px" }}>
              <Typography variant="h5" gutterBottom>
                Contact Queries
              </Typography>
              {queries.map((query) => (
                <div key={query.id}>
                  <Typography variant="subtitle1">{query.name}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    {query.email}
                  </Typography>
                  <Typography variant="body1" gutterBottom overflow={"auto"}>
                    {query.message}
                  </Typography>
                  <hr />
                </div>
              ))}
            </Paper>
          </Container>
        ) : (
          <Grid item xs={12} md={6} padding={10} >
            <Box
              elevation={3}
              style={{ padding: "20px", width: "100%", maxWidth: "500" }}
            >
              <Typography variant="h4" gutterBottom>
                Contact Us
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  id="name"
                  label="Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <TextField
                  id="message"
                  label="Message"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                  required
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                />
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </form>
            </Box>
          </Grid>
        )}
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        onClick={(event) => event.stopPropagation()}
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          severity={"success"}
          sx={{ width: "100%" }}
        >
          Query Sent!
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default ContactUs;
