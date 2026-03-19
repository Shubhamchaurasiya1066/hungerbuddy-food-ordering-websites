"use client";

import MyOrderComponent from "./MyOrderComponent";
import User from "../../app/components/User";
import Styles from "../components/Header.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { postData } from "../../app/services/FetchNodeServices";
import { useRouter } from "next/navigation";
export default function MyOrderPage() {
  var user = JSON.parse(localStorage.getItem("USER"));
  var cart = useSelector((state) => state.cart);
  var totalItems = Object.keys(cart);
  var total = totalItems?.length;
  var products = Object.values(cart);
  const [refresh, setRefresh] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const navigate = useRouter()

  // console.log("mobileno:", Object.keys(user));

  const fetchAllOrderDetails = async () => {
    var response = await postData("users/fetch_all_order_details", {
      mobileno: Object.keys(user)[0],
    
    });
    // console.log("orders", response.data);

    setOrderData(response.data);
  };

  useEffect(function () {
    fetchAllOrderDetails();
  }, []);

  return (
    <div>
      <div className={Styles.maincontainer}>
        <div className={Styles.stylebar}>
          <div onClick={()=>navigate.push('/homepage')} className={Styles.styletext}>
            <div className={Styles.styleone}>HungerBuddy in</div>

            <div className={Styles.styletwo}>20 minutes</div>

            <div>
              <span className={Styles.stylethree}>Home -</span>{" "}
              <span className={Styles.stylename}>Jackei chan</span>
            </div>
          </div>
          <User totalItems={total} />
        </div>
        <div>
          <MyOrderComponent
            items={orderData}
            refresh={refresh}
            setRefresh={setRefresh}
          />
          {/* <ShowCartComponent
              items={products}
              refresh={refresh}
              setRefresh={setRefresh}
              
            /> */}
        </div>
      </div>
    </div>
  );
}
