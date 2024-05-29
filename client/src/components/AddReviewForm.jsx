import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, TextField, Button, Typography, Rating } from "@mui/material";
import {
  addReviewToMenu,
  addReviewToRestaurant,
} from "../redux/slices/reviewSlice";

const AddReviewForm = ({ restaurantId, menuId }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating || rating < 1 || rating > 5) {
      setError("Please provide a valid rating between 1 and 5.");
      return;
    }
    if (!comment.trim()) {
      setError("Please provide a comment.");
      return;
    }
    if (!menuId) {
      dispatch(
        addReviewToRestaurant({
          restaurantId,
          review: { user: currentUser.name, rating, comment },
        })
      );
    } else {
      dispatch(
        addReviewToMenu({
          restaurantId,
          menuId,
          review: { user: currentUser.name, rating, comment },
        })
      );
    }
    setRating(0);
    setComment("");
    setError("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} mt={4}>
      <Typography variant="h6" gutterBottom>
        Add a Review
      </Typography>
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        value={currentUser.name}
        disabled 
        sx={{ mb: 2 }}
      />
      <TextField
        label="Comment"
        variant="outlined"
        fullWidth
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        multiline
        rows={4}
        sx={{ mb: 2 }}
      />
      <Box sx={{ mb: 2 }}>
        <Typography component="legend">Rating</Typography>
        <Rating
          name="rating"
          value={rating}
          onChange={(e, newValue) => setRating(newValue)}
        />
      </Box>
      {error && (
        <Typography variant="body2" color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default AddReviewForm;
