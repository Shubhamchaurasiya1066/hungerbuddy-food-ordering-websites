"use client"
import Header from "../components/Header"
import SearchBar from "../components/SearchBar"
import CategoryComponent from "../components/CategoryComponent"
import FoodItemCard from "../components/FoodItemCard"
import DrinkComponent from "../components/DrinkComponent"
import SnacksComponent from "../components/SnacksComponent"
import AdvertisementComponent from "../components/AdvertisementComponent"
import FooterComponent from "../components/FooterComponent"
import { useState, useEffect, useRef } from "react"
import { getData, postData } from "../services/FetchNodeServices"
export default function HomePage() {

    const aboutref=useRef(null)
    const [categoryList, setCategoryList] = useState([])
    const [drinksList, setDrinksList] = useState([])
    const [snacksList, setSnacksList] = useState([])
    const [foodList, setFoodList] = useState([])

    const fetchAllCategory = async () => {
        var response = await getData('users/fetch_all_category')
        setCategoryList(response.data)

    }

    useEffect(function () {
        fetchAllCategory()
    }, [])

    const fetchAllFoodItems = async (cn) => {
        var response = await postData('users/fetch_all_fooditem_by_category', { categoryname: cn })
        if (cn == 'Snacks') {
            setSnacksList(response.data)
        }
        else if(cn == 'Drinks')
        {
            setDrinksList(response.data)
        }

    }
    useEffect(function () {
        fetchAllFoodItems('Snacks')
        fetchAllFoodItems('Drinks')
    }, [])

    const fetchAllFood = async (cn) => {
        var response = await getData('users/fetch_all_fooditem')
        setFoodList(response.data)

    }
    useEffect(function () {
        fetchAllFoodItems('Snacks')
        fetchAllFoodItems('Drinks')
        fetchAllFood()
    }, [])

        
    return (
        <div >
            <Header />
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40, alignItems: 'center', width: '100%' }}>
                <SearchBar foodList={foodList} setFoodList={setFoodList} dataref={aboutref}/>
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <CategoryComponent foodList={foodList} setFoodList={setFoodList} dataref={aboutref} data={categoryList} />

            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <SnacksComponent data={snacksList} />
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <DrinkComponent data={drinksList} />
            </div>
            <div ref={aboutref}>
                <FoodItemCard data={foodList}/>
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <AdvertisementComponent />
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <FooterComponent />
            </div>
        </div>
    )
}