import React from "react";
import { useSelector } from "react-redux";
import { Container, Paper, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  return (
    currentUser && (
      <Container>
        <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
          <Typography variant="h4" gutterBottom>
            User Profile
          </Typography>
          <Box component="div" sx={{ mb: 2 }}>
            <Typography variant="subtitle1">
              <strong>Name:</strong> {currentUser.name}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Username:</strong> {currentUser.username}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Email:</strong> {currentUser.email}
            </Typography>
            {currentUser.address && (
              <>
                {currentUser.address.street && (
                  <Typography variant="subtitle1">
                    <strong>Street:</strong> {currentUser.address.street}
                  </Typography>
                )}
                {currentUser.address.city && (
                  <Typography variant="subtitle1">
                    <strong>City:</strong> {currentUser.address.city}
                  </Typography>
                )}
                {currentUser.address.state && (
                  <Typography variant="subtitle1">
                    <strong>State:</strong> {currentUser.address.state}
                  </Typography>
                )}
                {currentUser.address.country && (
                  <Typography variant="subtitle1">
                    <strong>Country:</strong> {currentUser.address.country}
                  </Typography>
                )}
                {currentUser.address.postalCode && (
                  <Typography variant="subtitle1">
                    <strong>Postal Code:</strong>{" "}
                    {currentUser.address.postalCode}
                  </Typography>
                )}
              </>
            )}
            {currentUser.gender && (
              <Typography variant="subtitle1">
                <strong>Gender:</strong> {currentUser.gender}
              </Typography>
            )}
            {currentUser.phoneNumber && (
              <Typography variant="subtitle1">
                <strong>Phone Number:</strong> {currentUser.phoneNumber}
              </Typography>
            )}
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditProfile}
            sx={{ marginTop: 3 }}
          >
            Edit Profile
          </Button>
        </Paper>
      </Container>
    )
  );
};

export default Profile;
