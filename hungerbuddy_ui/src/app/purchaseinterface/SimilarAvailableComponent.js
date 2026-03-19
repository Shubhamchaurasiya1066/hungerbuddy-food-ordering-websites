"use client"
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Divider } from "@mui/material";
import { serverURL } from "../services/FetchNodeServices";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useRef } from "react";
import ScrollProductList from "./ScrollProductList";
import { useRouter } from 'next/navigation';

export default function SimilarAvailableComponent({ data }) {

    var navigate = useRouter()
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true
    };
    const sliderRef = useRef()
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    const [hovered, setHovered] = useState(null)
    //const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || process.env.serverUrl

    const images = [
        `${serverURL}/images/minialoosev.png`,
        `${serverURL}/images/yellowsev.png`,
        `${serverURL}/images/ratlamisev.png`,
        `${serverURL}/images/yellowsev.png`,

    ]

    const handleFoodChange = (foodid) => {
        navigate.push(`/productdetailcomponent/${foodid}`)
    }

    const withoutSlider = () => {
        return data.map((item, index) => {
            return <img
                key={index}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => handleFoodChange(item.fooditemid)}
                style={{
                    border: hovered === index ? '0.8px solid grey' : '',
                    borderRadius: 15,
                    transform: hovered === index ? 'scale(1.0)' : 'scale(1)',
                    transition: '0.25s',
                    background: '#fff',
                    width: matches ? '100px' : '130px',
                    height: matches ? '100px' : '130px',
                    objectFit: 'cover'
                }}
                
                src={`${serverURL}/images/${item.picture}`}
                alt={`similar product ${index + 1}`}
            />
        })
    }



    return (
        <div style={{
            padding: matches ? "20px" : "0",
            marginLeft: matches ? '1%' : "2%",
            marginTop: matches ? "30%" : "0"
        }}>



            <div style={{
                display: 'flex',
                fontWeight: 500,
                fontSize: matches ? "16px" : "20px"
            }}>
                Liked it? Try these!
            </div>
            {data?.length >= 3 ?
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: matches ? 10 : 10,
                    cursor: 'pointer',
                    marginTop: matches ? 15 : 20,
                    marginLeft: matches ? -85 : '2%',
                    justifyContent: matches ? "center" : "flex-start",
                    flexWrap: matches ? "wrap" : "nowrap"
                }}>
                    {withoutSlider()}
                </div> : <div style={{ width: "75%" }} ><ScrollProductList data={data} /></div>}

            <div style={{
                display: 'flex',
                fontWeight: 400,
                fontSize: matches ? "14px" : "20px",
                marginTop: matches ? 30 : 40
            }}>
                Also available on*
            </div>




            <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: matches ? 15 : 20,
                marginTop: matches ? 15 : 22,
                height: matches ? '35px' : '40px',
                alignItems: 'center'
            }}>
                <img
                    style={{
                        cursor: 'pointer',
                        height: matches ? '30px' : '40px',
                        width: 'auto'
                    }}
                    src='https://www.balajiwafers.com/cdn/shop/files/Swiggy_logo_logo-1.svg?v=17403963'
                    alt="swiggy"
                />
                <img
                    style={{
                        cursor: 'pointer',
                        height: matches ? '30px' : '40px',
                        width: 'auto'
                    }}
                    src='https://www.balajiwafers.com/cdn/shop/files/Blinkit_logo-1.svg?v=1740396397'
                    alt="blinkit"
                />
                <img
                    style={{
                        cursor: 'pointer',
                        height: matches ? '30px' : '40px',
                        width: 'auto'
                    }}
                    src='https://www.balajiwafers.com/cdn/shop/files/Zepto_Logo_Vector-1.svg?v=1740396412'
                    alt="zepto"
                />
            </div>




            <div style={{
                display: 'flex',
                fontWeight: 400,
                fontSize: matches ? "11px" : "12px",
                marginTop: matches ? 15 : 15,
                color: '#666',
                fontStyle: 'poppins'
            }}>
                *Product availability may vary by location.
            </div>




            <Divider style={{
                display: 'flex',
                marginTop: matches ? 35 : 30,
                border: 'none',
                borderTop: '1px solid #cebdd8ff',
                width: matches ? "93%" : "40%",
                marginLeft: matches ? "0" : "-1%",
                position: 'absolute'
            }} />
        </div>
    )
}