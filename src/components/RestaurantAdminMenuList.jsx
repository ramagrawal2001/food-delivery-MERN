import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMenusByRestaurantId } from "../redux/slices/restaurantMenuSlice";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MenuCard from "./MenuCard";

const RestaurantAdminMenuList = ({ restaurantId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menus = useSelector(
    (state) => state.restaurantMenu.menus[restaurantId] || []
  );
  const menuStatus = useSelector(
    (state) => state.restaurantMenu.status[restaurantId] || "idle"
  );

  useEffect(() => {
    if (restaurantId && menuStatus === "idle") {
      dispatch(fetchMenusByRestaurantId(restaurantId));
    }
  }, [restaurantId, dispatch, menuStatus]);

  const handleAddClick = () => {
    navigate(`/restaurant-admin/add-menu`, { state: { restaurantId } });
  };

  return (
    <div>
      <Button
        to={`/add-menu/${restaurantId}`}
        variant="contained"
        color="primary"
        style={{ width: "auto" }}
        onClick={handleAddClick}
      >
        Add Menu
      </Button>
      <div style={{ display: "flex", flexDirection: "Row", gap: "20px" }}>
        {menus.map((menu) => (
          <MenuCard key={menu.id} menuData={menu} restaurantId={restaurantId} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantAdminMenuList;
