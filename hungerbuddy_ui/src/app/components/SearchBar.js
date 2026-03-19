"use client"

import { useState, useEffect } from "react"
import handlestyle from "./Search.module.css"
import Image from "next/image"
import { postData } from "../services/FetchNodeServices"

export default function SearchBar({ setFoodList, dataref }) {

    const [search, setSearch] = useState("")

    const fetchFoodBySearch = async (text) => {
        try {
            var response = await postData(
                "users/fetch_all_fooditem_by_food_and_category",
                { categoryname: text }
            )

            setFoodList(response?.data)
            dataref?.current?.scrollIntoView({ behavior: "smooth" })

        } catch (error) {
            console.log("Search Error:", error)
        }
    }

    // Debounce (500ms delay)
    useEffect(() => {

        const timer = setTimeout(() => {
            if (search.trim() !== "") {
                fetchFoodBySearch(search)
            }
        }, 500)

        return () => clearTimeout(timer)

    }, [search])


    return (
        <div>
            <div className={handlestyle.maincontainer}>
                <div style={{
                    marginTop: 10,
                    position: 'relative',
                    display: 'flex',
                    width: '98%',
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 20,
                    border: '1px solid lightgray',
                    background: 'lightgray'
                }}>

                    <div style={{ paddingLeft: 10 }}>
                        <Image src='/images/search.png' width={25} height={25} alt="" />
                    </div>

                    <input
                        type="text"
                        placeholder='Search "food dishes"'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            width: '95%',
                            height: 40,
                            background: 'lightgray',
                            border: 'none',
                            outline: 'none',
                            paddingLeft: 10,
                            fontSize: 18
                        }}
                    />

                    <div style={{ paddingLeft: 10 }}>
                        <Image src='/images/line.png' width={25} height={25} alt="" />
                    </div>

                    <div style={{ paddingRight: 10 }}>
                        <Image src='/images/mic.png' width={25} height={25} alt="" />
                    </div>

                </div>
            </div>
        </div>
    )
}