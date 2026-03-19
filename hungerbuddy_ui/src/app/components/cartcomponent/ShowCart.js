"use client";
import React from "react";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import styles from "./ShowCart.module.css";
import { serverURL } from "@/app/services/FetchNodeServices";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import QuantityCounter from "./QuantityCounter";
import { usePathname } from "next/navigation";
const MINIMUM_ORDER_AMOUNT = 99;

export default function ShowCart({ items,refresh,setRefresh }) {
  const theme = useTheme();
  var path=usePathname()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const totalItems = items.length;

  const total_amount = items.reduce((sum, item) => {
    const offer = Number(item.offerprice || 0);
    const full = Number(item.fullprice || 0);
    const qty = Number(item.qty || 0);
    return sum + (offer > 0 ? offer : full) * qty;
  }, 0);

  const totalPrice = items.reduce(
    (sum, item) => sum + Number(item.offerprice || 0),
    0
  );

  const isBelowMinimum = totalPrice < MINIMUM_ORDER_AMOUNT;
  const amountNeeded = MINIMUM_ORDER_AMOUNT - totalPrice;

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.basketTitle}>
          Quick Basket <span className={styles.itemCount}>({totalItems})</span>
        </h2>
        <span className={styles.totalPrice}>
          ₹{total_amount.toFixed(2)}
        </span>
      </div>

      {/* Delivery Banner */}
      {isBelowMinimum ? (
        <div className={styles.warningBanner}></div>
      ) : (
        <div className={styles.deliveryBanner}>
          <span className={styles.bannerText}>
            Yay! You get Free delivery with this Basket
          </span>
        </div>
      )}

      <div className={styles.cartCard}>
        {/* Quick Header */}
        <div className={styles.quickHeader}>
          <div className={styles.quickBadge}>
            <FlashOnIcon className={styles.flashIcon} />
            <span className={styles.quickText}>Quick</span>
          </div>
          <span className={styles.deliveryTime}>Delivery in 10 to 30 min</span>
        </div>

        {/* Minimum Order Warning */}
        {isBelowMinimum && (
          <div className={styles.minimumOrderBanner}>
            <div className={styles.minimumOrderHeader}>
              <WarningAmberIcon className={styles.warningIcon} />
              <span className={styles.minimumOrderText}>
                Minimum purchase amount is ₹{MINIMUM_ORDER_AMOUNT.toFixed(2)}
              </span>
            </div>
            <div className={styles.minimumOrderAction}>
              <div className={styles.addItemsText}>
                Add items worth ₹{amountNeeded.toFixed(2)} from Inventory
              </div>
              <Button
                variant="contained"
                className={styles.addItemsBtn}
                size="small"
              >
                Add Items
              </Button>
            </div>
          </div>
        )}

        {/* Cart Items */}
        {items.map((item, index) => {
          const fullprice = Number(item.fullprice || 0);
          const offerprice = Number(item.offerprice || 0);
          const qty = Number(item.qty || 0);

          const savings = (fullprice - offerprice)*item.qty;
          const amt = (offerprice > 0 ? offerprice : fullprice) * qty;

          return (
            <div key={item.fooditemid}>
              {index > 0 && <div className={styles.itemDivider} />}

              <div
                className={styles.cartItem}
                style={{ flexWrap: isSmallMobile ? "wrap" : "nowrap" }}
              >
                <div
                  className={styles.itemImage}
                  style={{
                    width: isSmallMobile ? "60px" : "100px",
                    height: isSmallMobile ? "60px" : "100px",
                  }}
                >
                  <img
                    src={`${serverURL}/images/${item.picture}`}
                    alt={item.fooditemname}
                    className={styles.productImg}
                  />
                </div>

                <div className={styles.itemDetails}>
                  <span className={styles.itemName}>
                    {item.fooditemname}
                  </span>

                  <div className={styles.priceRow}>
                    {offerprice === 0 ? (
                      <div style={{ display: "flex", width: "95%" }}>
                        <span className={styles.currentPrice}>
                          ₹{fullprice.toFixed(2)}/unit
                        </span>

                        <span
                          className={styles.currentPrice}
                          style={{ marginLeft: "auto" }}
                        >
                          ₹{amt.toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <div style={{ display: "flex", width: "95%" }}>
                        <span className={styles.currentPrice}>
                          ₹{offerprice.toFixed(2)}/unit
                        </span>

                        <span className={styles.originalPrice}>
                          ₹{fullprice.toFixed(2)}/unit
                        </span>

                        <span
                          className={styles.currentPrice}
                          style={{ marginLeft: "auto" }}
                        >
                          ₹{amt.toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>

                  {offerprice > 0 && savings > 0 && (
                    <div className={styles.quickBadge}>
                      <div className={styles.quickText}>
                        You Save ₹{savings.toFixed(2)}
                      </div>
                    </div>
                  )}

                  <span className={styles.sellerText}>
                    Sold by:{" "}
                    <span className={styles.sellerName}>
                      HungerBuddy Foods
                    </span>
                  </span>
                  <div style={{display:'flex'}}>
                  <span className={styles.sizeText}>
                    Qty: <span className={styles.sizeValue}>{qty}</span>
                  </span>
                  {path=="/order-review"?<div></div>:
                  <div style={{marginLeft:'auto'}}>
                  <QuantityCounter refresh={refresh} setRefresh={setRefresh} data={item}/>
                  </div>
                  }
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
