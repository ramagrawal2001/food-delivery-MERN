import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { updateUserProfile } from "../redux/slices/userSlice";

const EditProfile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  const { _id, name, username, email, address, gender, phoneNumber } =
    currentUser;

  const [street, setStreet] = useState(address ? address.street : "");
  const [city, setCity] = useState(address ? address.city : "");
  const [state, setState] = useState(address ? address.state : "");
  const [country, setCountry] = useState(address ? address.country : "");
  const [postalCode, setPostalCode] = useState(
    address ? address.postalCode : ""
  );
  const [selectedGender, setSelectedGender] = useState(gender || ""); 
  const [phone, setPhone] = useState(phoneNumber || "");

  const [streetError, setStreetError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [stateError, setStateError] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [postalCodeError, setPostalCodeError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setStreetError(false);
    setCityError(false);
    setStateError(false);
    setCountryError(false);
    setPostalCodeError(false);
    setGenderError(false);
    setPhoneError(false);

    if (!street) setStreetError(true);
    if (!city) setCityError(true);
    if (!state) setStateError(true);
    if (!country) setCountryError(true);
    if (!postalCode) setPostalCodeError(true);
    if (!selectedGender) setGenderError(true);
    if (!phone || !/^\d{10}$/.test(phone)) setPhoneError(true);

    if (
      !street ||
      !city ||
      !state ||
      !country ||
      !postalCode ||
      !selectedGender ||
      !phone ||
      phoneError
    ) {
      return;
    }

    dispatch(
      updateUserProfile({
        userId: _id,
        userData: {
          name,
          username,
          email,
          address: { street, city, state, country, postalCode },
          gender: selectedGender,
          phoneNumber: phone,
        },
      })
    );

    window.location.href = "/profile";
  };

  return (
    <Container>
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Edit Profile
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            disabled 
            margin="normal"
          />
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            disabled
            margin="normal"
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            disabled
            margin="normal"
          />
          <TextField
            label="Street"
            variant="outlined"
            fullWidth
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            error={streetError}
            helperText={streetError ? "Street is required" : ""}
            margin="normal"
          />
          <TextField
            label="City"
            variant="outlined"
            fullWidth
            value={city}
            onChange={(e) => setCity(e.target.value)}
            error={cityError}
            helperText={cityError ? "City is required" : ""}
            margin="normal"
          />
          <TextField
            label="State"
            variant="outlined"
            fullWidth
            value={state}
            onChange={(e) => setState(e.target.value)}
            error={stateError}
            helperText={stateError ? "State is required" : ""}
            margin="normal"
          />
          <TextField
            label="Country"
            variant="outlined"
            fullWidth
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            error={countryError}
            helperText={countryError ? "Country is required" : ""}
            margin="normal"
          />
          <TextField
            label="Postal Code"
            variant="outlined"
            fullWidth
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            error={postalCodeError}
            helperText={postalCodeError ? "Postal Code is required" : ""}
            margin="normal"
          />
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Gender *</InputLabel>
            <Select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              error={genderError}
              label="Gender *"
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
            {genderError && (
              <FormHelperText error>Gender is required</FormHelperText>
            )}
          </FormControl>
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={phoneError}
            helperText={phoneError ? "Phone number is invalid" : ""}
            margin="normal"
          />
          <Button variant="contained" color="primary" type="submit">
            Save Changes
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default EditProfile;
