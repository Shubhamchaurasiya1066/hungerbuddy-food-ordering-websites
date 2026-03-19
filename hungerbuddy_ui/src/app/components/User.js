"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Avatar, Badge, Menu } from "@mui/material";
import { Person, ShoppingBag, Logout } from "@mui/icons-material";
import styles from "./Page.module.css";

export default function User({ totalItems }) {
  const navigate = useRouter();
  const [userData, setUserData] = useState("Not Login");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const storedUser = localStorage.getItem("USER");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user != null) {
          setUserData(Object.values(user)[0]);
        }
      } catch (e) {
        localStorage.removeItem("USER");
      }
    }
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("USER");
    setUserData("Not Login");
    handleClose();
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <Badge badgeContent={totalItems} color="error">
        <div
          onClick={() => navigate.push("/cart")}
          className={styles.iconButton}
        >
          <Image src="/images/cart.png" width={25} height={25} alt="" />
        </div>
      </Badge>

      <div className={styles.walletWrapper}>
        <div className={styles.iconButton}>
          <Image src="/images/wallet.png" width={25} height={25} alt="" />
        </div>
        <div className={styles.walletBadge}>
          <span className={styles.walletAmount}>&#8377;20</span>
        </div>
      </div>

      {userData === "Not Login" ? (
        <div
          onClick={() => navigate.push("/signin?from=HP")}
          className={styles.iconButton}
        >
          <Image src="/images/user.png" width={25} height={25} alt="" />
        </div>
      ) : (
        <div>
          <Avatar
            onClick={handleClick}
            sx={{ background: "orange", color: "#fff", cursor: "pointer" }}
          >
            {userData?.studentname[0]}
          </Avatar>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 4px 20px rgba(0,0,0,0.15))",
                  mt: 1.5,
                  minWidth: 200,
                  borderRadius: 3,
                  border: "1px solid rgba(0,0,0,0.08)",
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                    borderLeft: "1px solid rgba(0,0,0,0.08)",
                    borderTop: "1px solid rgba(0,0,0,0.08)",
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <div className={styles.menuHeader}>
              <p className={styles.userName}>{userData?.studentname}</p>
              <p className={styles.welcomeText}>Welcome back!</p>
            </div>
            <div className={styles.divider} />
            <div
              className={`${styles.menuItem} ${styles.menuItemProfile}`}
              onClick={() => { handleClose(); navigate.push("/profile"); }}
            >
              <Person className={styles.iconProfile} />
              <span className={styles.menuItemText}>Profile</span>
            </div>
            <div
              className={`${styles.menuItem} ${styles.menuItemOrders}`}
              onClick={() => { handleClose(); navigate.push("/orders"); }}
            >
              <ShoppingBag className={styles.iconOrders} />
              <span className={styles.menuItemText}>Orders</span>
            </div>
            <div className={styles.divider} />
            <div
              className={`${styles.menuItem} ${styles.menuItemLogout}`}
              onClick={handleLogout}
            >
              <Logout className={styles.iconLogout} />
              <span className={`${styles.menuItemText} ${styles.logoutText}`}>Logout</span>
            </div>
          </Menu>
        </div>
      )}
    </div>
  );
}
