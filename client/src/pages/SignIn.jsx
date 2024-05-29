import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
} from "@mui/material";

import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/slices/userSlice";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.user.loading);
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(signInStart()); 

    try {
      const response = await fetch("http://localhost:3003/auth/signin", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        dispatch(signInSuccess(data.user)); 
        navigate("/");
      } else {
        dispatch(signInFailure(data.message)); 
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error signing in:", error);
      dispatch(signInFailure("An error occurred"));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Sign In
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
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
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
        <Typography variant="body2" style={{ marginTop: "10px" }}>
          Don't have an account? <Link href="/signup">Sign Up</Link>
        </Typography>
        <Typography variant="body2" style={{ marginTop: "5px" }}>
          Forgot your password?{" "}
          <Link href="/forgotpassword">Reset Password</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default SignIn;
