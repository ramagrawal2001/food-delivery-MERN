import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  Snackbar,
} from "@mui/material";

const SignUp = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }
    if (passwordError != "") {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3003/auth/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        navigate("/signin");
      } else {
        if (data.message === "Username already exists") {
          alert("Username already exists. Please choose a different username.");
        } else if (data.message === "Email already exists") {
          alert("Email already exists. Please use a different email address.");
        } else {
          alert(`Error: ${data.message}`);
        }
      }
    } catch (error) {
      console.error("Error signing up:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    if (name === "password") {

      if (value.length < 8) {
        setPasswordError("Password must be at least 8 characters long");
      } else {
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        if (!hasUpperCase || !hasLowerCase) {
          setPasswordError(
            "Password must contain both uppercase and lowercase letters"
          );
        } else {
          const hasSpecialCharacter =
            /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);
          if (!hasSpecialCharacter) {
            setPasswordError(
              "Password must contain at least one special character"
            );
          } else {
            setPasswordError("");
          }
        }
      }
    } else if (name === "confirmPassword") {
      if (value !== formData.password) {
        setConfirmPasswordError("Passwords do not match");
      } else {
        setConfirmPasswordError("");
      }
    }
  };

  return (
    <Container>
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
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
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
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
            error={!!passwordError}
            helperText={passwordError}
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!confirmPasswordError}
            helperText={confirmPasswordError}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>
        <Typography variant="body2" style={{ marginTop: "10px" }}>
          Already have an account? <Link href="/signin">Sign In</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default SignUp;
