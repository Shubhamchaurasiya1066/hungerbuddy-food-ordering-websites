"use client"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
import { useRef, useState } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { serverURL } from "../services/FetchNodeServices";
import { useRouter } from "next/navigation";

export default function SnacksComponent({data})
{  const theme = useTheme();
  var navigate=useRouter()
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: matches?5:7,
    slidesToScroll: 1,
    arrows:false
  };
   const sliderRef=useRef()
   const [index,setIndex]=useState(0)
  
   const handleCategoryClick=(fid)=>{
    setIndex(fid)
     navigate.push(`/productdetailcomponent/${fid}`)
   }
 function showCategory(){
  return data.map((item)=>{
    return(<div  >
     <div onClick={()=>handleCategoryClick(item.fooditemid)}  style={{cursor:'pointer', width:'100%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',borderBottom:item.fooditemid==index?'4px solid red':''}}>
     <div style={{display:'flex',alignItems:'center',justifyContent:'center',width:'70%',height:'70%',borderRadius:'50%'}}>
     <img style={{width:'100%'}} src={`${serverURL}/images/${item.picture}`}/>
     </div>
     <div style={{fontSize:matches?'0.7rem':'1rem'}}>{item.fooditemname}</div>
     </div>
  
   </div>)
 })

}
const handlePrevious=()=>{
sliderRef.current.slickPrev()
}
const handleNext=()=>{
  sliderRef.current.slickNext()
}
return(


<div style={{width:'90%', marginTop:40,position:'relative'}}>

    <div style={{fontSize:20,fontWeight:'bold',marginBottom:10,marginLeft:'4%'}}>Snacks & Biscuits</div>

{matches?<></>:<Image onClick={handlePrevious} style={{position:'absolute',top:'42%',zIndex:2,cursor:'pointer'}} src="/images/backword.png" width={35} height={35} alt="" />}
  <Slider ref={sliderRef} {...settings}>
   {showCategory()}
   </Slider>

     {matches?<></>:<Image onClick={handleNext} style={{position:'absolute',top:'42%',right:'-0.3%',zIndex:2,cursor:'pointer'}} src="/images/forword.png" width={35} height={35} alt="" />}
     </div>
)

}


