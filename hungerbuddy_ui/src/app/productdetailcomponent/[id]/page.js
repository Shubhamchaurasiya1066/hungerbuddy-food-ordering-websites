"use client";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddToCartComponent from "../../purchaseinterface/AddToCartComponent";
import ProductImageComponent from "../../purchaseinterface/ProductImageComponent";
import ProductInfoComponent from "../../purchaseinterface/ProductInfoComponent";
import ProductRateComponent from "../../purchaseinterface/ProductRateComponent";
import SimilarAvailableComponent from "../../purchaseinterface/SimilarAvailableComponent";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { postData, getData } from "@/app/services/FetchNodeServices";
import FooterComponent from "@/app/components/FooterComponent";
import Header from "@/app/components/Header";
import SearchBar from "@/app/components/SearchBar";
import CategoryComponent from "@/app/components/CategoryComponent";
import { useSelector } from "react-redux";
export default function ProductDetailComponent({ aboutref }) {
  var params = useParams()
  const { id } = useParams()
  var cart = useSelector((state) => state.cart)
  const [foodItem, setFoodItem] = useState({})
  const [pictureList, setPictureList] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [categoryComponentList, setCategoryComponentList] = useState([])
  const [refresh, setRefresh] = useState(false)
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const fetchAllCategory = async () => {
    var response = await getData('users/fetch_all_category')
    setCategoryComponentList(response.data)

  }

  useEffect(function () {
    fetchAllCategory()
  }, [])

  const fetchFoodDetails = async () => {

    var cartkeys = Object.keys(cart)
    var data = {}
    if (cartkeys.includes(id)) {
      data = cart[id]
      setFoodItem(data)
      //alert("cart m h")

    }
    else {
      //alert('nahi h')
      var response = await postData('users/fetch_all_fooditem_by_id', { fooditemid: id })
      data = response.data[0]
      data['qty'] = 0
      setFoodItem(data)
    }
    await fetchAllFoodByCategoryId(data?.foodcategoryid)
  }

  const fetchAllFoodByCategoryId = async (cn) => {
    var response = await postData("users/fetch_all_fooditem_by_category_id", { foodcategoryid: cn });
    //alert(JSON.stringify(response.data))
    setCategoryList(response.data)
  };

  const fetchAllFoodPicture = async () => {
    var response = await postData("picture/fetch_all_picture", { fooditemid: id });
    //alert(JSON.stringify(response.data))
    setPictureList(response.data)
  };

  useEffect(function () {
    fetchFoodDetails()
    fetchAllFoodPicture()
  }, [id])


  return (
    <div>
      <Header />
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40, alignItems: 'center', width: '100%' }}>
        <SearchBar />
      </div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <CategoryComponent dataref={aboutref} data={categoryComponentList} />

      </div>
      <div
        style={{
          background: "#F3ECF7",
          minHeight: "100vh",
          width: matches ? "100%" : "95%",
          borderRadius: matches ? 0 : 20,
          marginLeft: matches ? "0" : "2%",
          marginTop: matches ? 0 : 20,
        }}
      >
        {matches ? (

          <div style={{ padding: "15px" }}>

            <ProductImageComponent data={foodItem} pictures={pictureList} />


            <div
              style={{
                background: "white",
                borderRadius: 15,
                padding: "20px",
                marginTop: "20px",
                background: 'transparent'
              }}
            >
              <ProductRateComponent data={foodItem} />
            </div>


            <div
              style={{
                background: "white",
                borderRadius: 15,
                padding: "20px",
                marginTop: "15px",
              }}
            >
              <AddToCartComponent data={foodItem} refresh={refresh} setRefresh={setRefresh} />
            </div>


            <div
              style={{
                background: "white",
                borderRadius: 15,
                padding: "20px",
                marginTop: "15px",
                background: 'transparent'
              }}
            >
              <SimilarAvailableComponent data={categoryList} />
            </div>


            <div
              style={{
                background: "white",
                borderRadius: 15,
                padding: "20px",
                marginTop: "15px",
                marginBottom: "30px",
                background: 'transparent'
              }}
            >
              <ProductInfoComponent data={foodItem} />
            </div>
          </div>
        ) : (


          <div style={{ position: "relative", minHeight: "100vh" }}>

            <div style={{ display: 'flex', marginTop: '5%', position: 'relative' }}>
              <ProductImageComponent data={foodItem} pictures={pictureList} />
            </div>


            <div style={{ display: "flex", marginTop: "-65%", marginLeft: "58%" }}>
              <ProductRateComponent data={foodItem} />
            </div>


            <div
              style={{
                background: "white",
                borderRadius: 20,
                padding: 20,
                width: "39%",
                marginTop: 22,
                marginLeft: "59%",
                position: 'relative'
              }}
            >
              <AddToCartComponent data={foodItem} refresh={refresh} setRefresh={setRefresh} />
            </div>


            <div style={{ display: 'flex', marginLeft: '59%', marginTop: "11%" }}>
              <SimilarAvailableComponent data={categoryList} />
            </div>


            <div>
              <ProductInfoComponent data={foodItem} />
            </div>
            <div>
              <FooterComponent />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}