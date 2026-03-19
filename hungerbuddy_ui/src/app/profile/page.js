"use client"; // Enable client-side rendering for this component

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Avatar, Divider, CircularProgress } from "@mui/material";
import { Email, Phone, LocationOn, ArrowBack } from "@mui/icons-material";
import styles from "./profile.module.css";
import { postData,serverURL } from "../../app/services/FetchNodeServices";

// ProfilePage component displays the user's profile information including avatar, name, email, phone, and address
export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState(null); // Store user profile data
  const [addressData, setAddressData] = useState(null); // Store user address data
  //const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? ""; // Server URL for fetching images

  // Fetch user data from localStorage and retrieve address information from server on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("USER");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user != null) {
          const data = Object.values(user)[0];
          setUserData(data);
          fetchAddress(data.enrollmentno);
        }
      } catch (e) {
        localStorage.removeItem("USER");
        router.push("/signin?from=profile");
      }
    } else {
      router.push("/signin?from=profile");
    }
  }, []);

  // Fetch address details for a given enrollment number
  const fetchAddress = async (enrollmentno) => {
    try {
      const response = await postData("users/fetch_all_Statecity", {
        enrollmentno,
      });
      if (response.data && response.data.length > 0) {
        setAddressData(response.data[0]);
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  // Extract initials from the user's name (e.g., "John Doe" becomes "JD")
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Combine address components into a single formatted string
  const formatAddress = () => {
    const parts = [];
    if (userData?.current_address) parts.push(userData.current_address);
    if (addressData?.cityname) parts.push(addressData.cityname);
    if (addressData?.statename) parts.push(addressData.statename);
    if (userData?.current_pincode) parts.push(userData.current_pincode);
    return parts.length > 0 ? parts.join(", ") : "No address available";
  };

  // Display loading spinner while user data is being fetched
  if (!userData) {
    return (
      <div className={styles.loading}>
        <CircularProgress sx={{ color: "#0078ad" }} />
      </div>
    );
  }

  // Render profile page with user information
  return (
    <div className={styles.container}>
      {/* Header section with back button and title */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => router.back()}>
          <ArrowBack />
        </button>
        <h1 className={styles.headerTitle}>My Profile</h1>
      </div>

      <div className={styles.content}>
        <div className={styles.profileCard}>
          {/* Avatar and user name section */}
          <div className={styles.avatarSection}>
            {userData?.student_picture ? (
              <img
                src={`${serverURL}/images/${userData.student_picture}`}
                alt={userData.studentname}
                className={styles.profileImage}
              />
            ) : (
              <Avatar className={styles.avatar}>
                {getInitials(userData?.studentname)}
              </Avatar>
            )}
            <h2 className={styles.userName}>{userData?.studentname}</h2>
            <span className={styles.enrollmentNo}>
              ID: {userData?.enrollmentno}
            </span>
          </div>

          <Divider />

          {/* User information section displaying email, phone, and address */}
          <div className={styles.infoSection}>
            {/* Email information */}
            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}>
                <Email className={styles.infoIcon} />
              </div>
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>Email</span>
                <span className={styles.infoValue}>
                  {userData?.emailid || "Not provided"}
                </span>
              </div>
            </div>

            {/* Phone number information */}
            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}>
                <Phone className={styles.infoIcon} />
              </div>
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>Mobile Number</span>
                <span className={styles.infoValue}>
                  +91-{userData?.mobileno || "Not provided"}
                </span>
              </div>
            </div>

            {/* Address information */}
            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}>
                <LocationOn className={styles.infoIcon} />
              </div>
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>Address</span>
                <span className={styles.infoValue}>{formatAddress()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
