import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { replyToReview } from "../redux/slices/reviewSlice";

const ReviewCard = ({ review, restaurantId, menuId, isOwner }) => {
  const dispatch = useDispatch();
  const [reply, setReply] = useState("");

  const handleReply = () => {
    dispatch(replyToReview({ reviewId: review._id, adminReply: reply })).then(
      () => {
        setReply("");
      }
    );
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{review.user}</Typography>
        <Typography variant="body2" sx={{ maxHeight: 100, overflowY: "auto" }}>
          {review.comment}
        </Typography>
        {isOwner && (
          <Typography variant="subtitle2">Rating: {review.rating}</Typography>
        )}
        {review.adminReply && (
          <Box mt={2}>
            <Typography variant="body2" color="primary">
              Admin Reply: {review.adminReply}
            </Typography>
          </Box>
        )}
        {isOwner && (
          <Box mt={2}>
            <TextField
              label="Reply as Admin"
              variant="outlined"
              fullWidth
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              rows={1}
            />
            <Button
              sx={{ mt: 1 }}
              variant="contained"
              color="primary"
              onClick={handleReply}
            >
              Reply
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
