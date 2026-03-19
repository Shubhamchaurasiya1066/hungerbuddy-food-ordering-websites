"use client";
import { useState,useEffect } from "react";
import Image from "next/image";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Divider } from "@mui/material";
import { useDispatch } from "react-redux";

export default function AddToCartComponent({data,refresh,setRefresh}) {
    var dispatch=useDispatch() 
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [hovered, setHovered] = useState(null);
  const [quantity, setQuantity] = useState(data.qty);
  const [weight, setWeight] = useState(data?.offerprice>0?data?.offerprice:data?.fullprice);

  const handleAddClick = () => {
   
    var q = quantity;
    q++;
     data['qty']=q
    setQuantity(q);
    dispatch({type:"ADD_CART",payload:[data.fooditemid,data]})
    setRefresh(!refresh)
  };

  const handleMinusClick = () => {
   var q = quantity;
    
    if(q==0)
   {
    dispatch({type:"DELETE_CART",payload:[data.fooditemid,data]})
    setQuantity(q);
     }
    else
      {
        q--
        data['qty']=q
        setQuantity(q)
        dispatch({type:"ADD_CART",payload:[data.fooditemid,data]})
      } 
   
    setRefresh(!refresh)
  };
  useEffect(function(){
   setQuantity(data?.qty)
  },[data.qty])

  const weightOptions = [data?.offerprice>0?data?.offerprice:data?.fullprice,data?.halfprice];

  return (
    <div style={{ padding: matches ? "20px" : "0" }}>
    
    
      
      <div
        style={{
          display: "flex",
          alignItems: matches ? "flex-start" : "center",
          justifyContent: matches ? "flex-start" : "space-between",
          width: "90%",
          maxWidth: matches ? "100%" : 500,
          marginTop: matches ?-20 : 10,
          // flexDirection: matches ? "row" : "row",
          flexDirection:'row',
          gap: matches ? 105 : 0,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: matches ? "flex-start" : "center",
            gap: matches ? 10 : 5,
            width: matches ? "100%" : "auto",
          }}
        >
          <span
            style={{
              fontWeight: 500,
               marginLeft: matches ? 0 :0,
              // marginTop: matches ? 0 : -20,
              fontSize: matches ? "16px" : "18px",
            }}
          >
            Price
          </span>
          <div style={{ display: "flex", gap: 10,marginTop:5 }}>
            {weightOptions.map((w) => (
              <div>
                {w>0?
              <div
                
                onClick={() => setWeight(w)}
                style={{
                  cursor: "pointer",
                  borderRadius: "50%",
                  background: weight === w ? "rgb(13, 156, 67)" : "#fff",
                  width: matches ? 45 : 50,
                  height: matches ? 45 : 50,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: weight === w ? "#fff" : "#000",
                  fontWeight: 400,
                  fontSize: matches ? 13 : 14,
                  transition: "0.2s",
                  border: "1px solid gray",
                }}
              >
               ₹{w} 
              </div>:<></>}
              </div>
            ))}
          </div>
        </div>

        {quantity==0?
      <div style={{ width: matches ? "100%" : "40%",display:'flex' }}>
          <button
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={handleAddClick}
            style={{
              display: "flex",
              marginLeft: matches ? "0" : "0",
              marginTop: matches ? 32 : 20,
              borderRadius: matches ? 10 : 25,
              backgroundColor: "transparent",
              border: "1px solid rgb(13, 156, 67)",
              color: "rgb(13, 156, 67)",
              width: matches ? "93%" : "200%",
              height: matches ? 45 : 50,
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 500,
              fontSize: matches ? "14px" : "16px",
              cursor: "pointer",
              transition: "0.2s",
              boxShadow: hovered ? "0 0 0 3px rgb(13, 156, 67)" : "none",
            }}
          >
            Add to Cart
          </button>
        </div>:
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: matches ? "flex-start" : "center",
            gap: matches ? 10 : 5,
            width: matches ? "100%" : "auto",
            marginLeft: matches ? 0 : 180,
            
          }}
        >
          <span
            style={{
              fontWeight: 500,
              fontSize: matches ? "16px" : "18px",
              marginLeft:matches ? 32 : 0
            }}
          >
            Quantity
          </span>
          <div style={{ display: "flex", gap: 10, alignItems: "center",marginTop:10 }}>
            <button
              onClick={handleMinusClick}
              style={{
                cursor: "pointer",
                borderRadius: "50%",
                background: "rgba(26,26,26,0.1)",
                width: matches ? 45 : 50,
                height: matches ? 45 : 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
              }}
            >
              <Image src="/images/minus.png" alt="minus" width={20} height={20} />
            </button>

            <span
              style={{
                fontWeight: 600,
                fontSize: matches ? 16 : 18,
                minWidth: 20,
                textAlign: "center",
              }}
            >
              {quantity}
            </span>

            <button
              onClick={handleAddClick}
              style={{
                cursor: "pointer",
                borderRadius: "50%",
                background: "rgba(26,26,26,0.1)",
                width: matches ? 45 : 50,
                height: matches ? 45 : 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
              }}
            >
              <Image src="/images/plus.png" alt="plus" width={20} height={20} />
            </button>
          </div>
        </div>
        }
      </div>



     
      <div
        style={{
          display: "flex",
          flexDirection: matches ? "column" : "row",
          // marginTop: matches ? 40 : 70,
          gap: matches ? 15 : 250,
          marginLeft: matches ? -35 : -80,
          width: "100%",
          marginTop:matches?'15%':'6%',
          position:'absolute',

        
        }}
      >
        
        <div style={{ width: matches ? "100%" : "100%" }}>
          <button
            style={{
              display: "flex",
              marginLeft: matches ? "0" : "38%",
              marginTop: matches ? 0 : 20,
              borderRadius: matches ? 10 : 25,
              backgroundColor: "rgb(13, 156, 67)",
              color: "#fff",
              width: matches ? "93%" : "50%",
              height: matches ? 45 : 50,
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 500,
              fontSize: matches ? "14px" : "16px",
              cursor: "pointer",
              border: "none",
            }}
          >
            Buy it Now
          </button>
        </div>
      </div>

    


    
      <Divider
        style={{
          display: "flex",
          marginTop: matches ? '40%' : '27%',
          color: "#cebdd8ff",
          width: matches?'93%':"100%",
          border: "none",
          borderTop: "1px solid #cebdd8ff",
          position:'absolute',
          marginLeft:matches?-35:'-1%'
        }}
      />
    </div>
  );
}

