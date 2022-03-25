import React, { Fragment, useState } from "react";
import "./Header.css";
import {
  SpeedDial,
  SpeedDialAction,
} from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { logOut } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";

const UserOptions = ({ user }) => {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const options = [
    {
      icon: (
        <ListAltIcon style={{ color: "rgba(0,0,0,0.7)" }} />
      ),
      name: "Orders",
      func: orders,
    },

    {
      icon: (
        <PersonIcon
          style={{
            color: "rgba(0,0,0,0.7)",
          }}
        />
      ),
      name: "Profile",
      func: account,
    },
    {
      icon: (
        <ShoppingCartIcon
          style={{
            color:
              cartItems.length > 0
                ? "#ffa41c"
                : "rgba(0,0,0,0.7)",
          }}
        />
      ),
      name: `Cart (${cartItems.length})`,
      func: cart,
    },
    {
      icon: (
        <ExitToAppIcon
          style={{ color: "rgba(0,0,0,0.7)" }}
        />
      ),
      name: "Logout",
      func: logoutUser,
    },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: (
        <DashboardIcon
          style={{ color: "rgba(0,0,0,0.7)" }}
        />
      ),
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    history.push("/dashboard");
  }

  function orders() {
    history.push("/orders");
  }

  function account() {
    history.push("/account");
  }
  function logoutUser() {
    dispatch(logOut());
    alert.success("Logged out successfully");
    history.push("/");
  }

  function cart() {
    history.push("/cart");
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel='SpeedDial basic example'
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction='down'
        className='speedDial'
        style={{ zIndex: "11" }}
        icon={
          <img
            className='speedDialIcon'
            src={
              user.avatar.url ? user.avatar.url : "/man.png"
            }
            alt='Profile'
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={
              window.innerWidth < 600 ? true : false
            }
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
