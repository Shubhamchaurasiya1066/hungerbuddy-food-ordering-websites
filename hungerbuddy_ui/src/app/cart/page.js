"use client";
import { useState } from "react";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ShowCart from "../components/cartcomponent/ShowCart";
import PaymentDetails from "../components/cartcomponent/PaymentDetails";
import CouponComponent from "../components/cartcomponent/CouponComponent";
import CounterComponent from "../components/cartcomponent/CounterComponent";
import styles from "./cart.module.css";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
export default function CartPage() {
  const theme = useTheme();
  var navigate=useRouter()
  var cart=useSelector((state)=>state.cart)
  var products=Object.values(cart)
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const[refresh,setRefresh]=useState(false)

  return (
    <div>
   {products.length==0?<h1>Cart is Empty</h1>:
    
    <div
      className={styles.pageContainer}
      style={{ padding: isSmallMobile ? "12px" : isMobile ? "16px" : "24px" }}
    >
      {/* Page Header */}
      <h1
        className={styles.pageTitle}
        style={{
          fontSize: isMobile ? "20px" : "24px",
          marginBottom: isMobile ? "16px" : "24px",
        }}
      >
        My Cart
      </h1>

      {/* Main Content using MUI Grid */}
      <Grid container spacing={isMobile ? 2 : 3} className={styles.mainContent}>
        {/* Left Section - Cart Items */}
        <Grid size={{ xs: 12, md: 8 }}>
          <ShowCart refresh={refresh} setRefresh={setRefresh}  items={products} />
        </Grid>

        {/* Right Section - Stepper, Payment & Coupon */}
        <Grid size={{ xs: 12, md: 4 }}>
          <div className={styles.rightSection}>
            {/* Stepper */}
            <CounterComponent/>
            <PaymentDetails items={products}  />
            <CouponComponent />
            <Button
              variant="contained"
              fullWidth
              className={styles.placeOrderBtn}
              onClick={()=>navigate.push("/order-review")}
            >
              Place Order
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>}
    </div>
  );
}
