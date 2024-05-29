import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router";

export default function RestaurantCard({ restaurantData }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/restaurant/${restaurantData.id}`);
  };

  const cardStyle = {
    position: "relative",
    width: 220,
    height: 350,
    "@media (min-width:600px)": {
      height: 380,
    },
    cursor: "pointer",
    backgroundColor: "#EEF7FF",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start", 
    padding: "16px",
  };
  const mediaStyle = {
    height: 140,
    width: "95%",
    objectFit: "contain",
    "@media (min-width:600px)": {
      height: 200,
    },
  };
  const headingStyle = {
    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    textOverflow: "ellipsis",
    WebkitLineClamp: 1,
    marginBottom: "5px",
  };
  const ratingStyle = {
    textAlign: "left",
    marginBottom: "5px",
  };
  const typeStyle = {
    textAlign: "left",
  };

  const buttonContainerStyle = {
    marginTop: "auto",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  };

  return (
    <Card sx={cardStyle}>
      <CardMedia
        component="img"
        sx={mediaStyle}
        image={restaurantData.image}
        alt={restaurantData.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={headingStyle}>
          {restaurantData.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={ratingStyle}>
          <b>Rating:</b> {restaurantData.rating}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={typeStyle}>
          <b>Type:</b> {restaurantData.type ? restaurantData.type.join(", ") : ""}
        </Typography>
      </CardContent>
      <IconButton
        onClick={handleClick}
        aria-label="show-menu"
        sx={{ marginTop: "auto" }}
      >
        Show Menu
      </IconButton>
    </Card>
  );
}
