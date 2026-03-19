"use client";
import { serverURL } from "../../app/services/FetchNodeServices";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function MyOrderComponent({ items, refresh, setRefresh }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div style={{ width: "100%" }}>
      {items?.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
    
          <div
            style={{
              width: matches ? "90%" : "20%",
              // minHeight: "7px",
              height:'250px',
              borderRadius: 20,
              border: "2px solid grey",
              padding: 20,
              display: "flex",
              flexDirection: "column",
              gap: 15,
            }}
          >
        
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <div
                style={{
                  // padding: "6px 12px",
                  borderRadius: 10,
                  border: "1px solid #ccc",
                  fontWeight: "bold",
                }}
              >
                {item.orderdate}
              </div>
            </div>

          
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <div
                style={{
                  // padding: "8px 12px",
                  borderRadius: 10,
                  // background: "red",
                  color: "#000",
                }}
              >
                fooditem : {item.fooditemname}
              </div>

              <div
                style={{
                  // padding: "8px 12px",
                  borderRadius: 10,
                  // background: "red",
                  color: "#000",
                  width: "fit-content",
                }}
              >
                qty : {item.qty}
              </div>
            </div>

            
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <div
                style={{
                  // background: "green",
                  // padding: 10,
                  borderRadius: 12,
                  width: "fit-content",
                }}
              >
                <img
                  style={{
                    width: 100,
                    height: 100,
                    objectFit: "cover",
                    borderRadius: 10,
                  }}
                  src={`${serverURL}/images/${item.picture}`}
                  alt="order"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
