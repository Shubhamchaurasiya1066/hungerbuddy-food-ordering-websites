"use client"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
import { useRef, useState } from "react";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { postData, serverURL } from "../services/FetchNodeServices";
import { usePathname, useRouter } from "next/navigation";
export default function CategoryComponent({data,dataref,foodList,setFoodList}) {
    const theme = useTheme();
    var navigate=useRouter()
    var path=usePathname()
    const matches = useMediaQuery(theme.breakpoints.up('md'));

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow:matches?6:4,
        slidesToScroll: 1,
        arrows: false
    };

    const sliderRef = useRef()

    const [index, setIndex] = useState(0)

    
   const fetchAllFoodByCategory=async(cid)=>{
       var response= await postData("users/fetch_all_fooditem_by_category_id",{foodcategoryid:cid})
       setFoodList(response?.data)
   }
    const handleCategoryClick = (cid) => {
        if(path=="/homepage")
        {
        fetchAllFoodByCategory(cid)
        setIndex(cid)
        dataref?.current?.scrollIntoView({behavior:"smooth"})
        }
        else{
            
            navigate.push('/homepage')
        }
    }

    function showcategory() {
        return data?.map((item) => {
            return (<div>
                <div onClick={() => handleCategoryClick(item.categoryid)} style={{ cursor: 'pointer', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', borderBottom: item.categoryid == index ? '4px solid red' : '' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: "center", width: '70%', height: '70%', borderRadius: '50%' }}>
                        <img style={{ width: '100%' }} src={`${serverURL}/images/${item.categoryicon}`} />
                    </div>
                    <div style={{ fontSize:matches?'1rem': '0.7rem', cursor: 'pointer', }}>{item.categoryname}</div>
                </div>
            </div>)
        })
    }

    const handlePrevious = () => {

        sliderRef.current.slickPrev()

    }
    const handleNext = () => {

        sliderRef.current.slickNext()

    }

    return (<div style={{ width: '90%', position: 'relative' }}>
        
       {matches&&(<Image onClick={handlePrevious} style={{ position: 'absolute', top: '40%',zIndex:2, left: '-0.75%', cursor: 'pointer' }} src='/images/backword.png' width={35} height={35} alt="" />)}
        <Slider ref={sliderRef} {...settings}>
            {showcategory()}
        </Slider>
       {matches&&(<Image onClick={handleNext} style={{ position: 'absolute', top: '40%', right: '-0.75%', cursor: 'pointer' }} src='/images/forword.png' width={35} height={35} alt="" />)}

    </div>)
}