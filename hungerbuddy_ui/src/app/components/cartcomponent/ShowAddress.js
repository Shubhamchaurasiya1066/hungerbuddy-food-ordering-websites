"use client";

import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Divider } from "@mui/material";
import styles from "./ShowAddress.module.css";
import { useEffect, useState } from "react";
import { getData, postData } from "@/app/services/FetchNodeServices";

// Sample address data (will be replaced with real data from API/Redux)
const sampleAddress = {
  studentname: "Shubham Chaurasiya",
  mobileno: "+91-7354941066",
  current_address:
    "Gram Barai, Chaurasiya Mohalla District Gwalior",
  current_city: "Gwalior",
  current_pincode: "475330",
  current_state: "Madhya Pradesh",
};

export default function ShowAddress({
  address,
  drawerStatus, setDrawerStatus
}) {

  const[state,setState]=useState("")
  const[city,setCity]=useState("")

  const fetchAllCityState=async()=>{
    var id=address.enrollmentno
    var response=await postData('users/fetch_all_Statecity',{enrollmentno:id})
    var data=response.data[0]
    setCity(data.cityname)
    setState(data.statename)
  }
  useEffect(function(){
        fetchAllCityState()
  },[])
  

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Delivery Address</h2>
      </div>

      {/* Address Card */}
      <div className={styles.addressCard}>
        {/* Name and Type Row */}
        <div className={styles.nameRow}>
          <div className={styles.nameContainer}>
            <span className={styles.name}>{address.studentname}</span>
          </div>
          <IconButton
            onClick={()=>setDrawerStatus(true)}
            className={styles.editButton}
            sx={{
              backgroundColor: "#f5f5f5",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
          >
            <EditIcon   sx={{ fontSize: 18, color: "#333" }} />
          </IconButton>
        </div>

        {/* Divider */}
        <Divider sx={{ borderColor: "#e0e0e0" }} />

        {/* Address Details */}
        <div className={styles.addressDetails}>
          <p className={styles.addressText}>{address.current_address}</p>
          <p className={styles.addressText}>{city}</p>
          <p className={styles.addressText}>{state}</p>
          <p className={styles.addressText}>{address.current_pincode}</p>
          <p className={styles.phoneText}>Phone: {address.mobileno}</p>
        </div>
      </div>
    </div>
  );
}
