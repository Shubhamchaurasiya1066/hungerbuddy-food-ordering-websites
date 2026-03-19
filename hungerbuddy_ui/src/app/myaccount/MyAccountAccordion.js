"use client";

import * as React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Image from "next/image";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from "@mui/material";

export default function MyAccountAccordion() {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="my-account-content"
        id="my-account-header"
      >
        <Typography style={{fontWeight:600}} variant="h6">My Account</Typography>
      </AccordionSummary>

      <AccordionDetails>
        <div style={{display:'flex',cursor:'pointer',borderBottom:'1px solid #e0e0e0',paddingBottom:20}}>
        <Image src={'/images/box.png'} width={25} height={25}/>
        <p style={{display:'flex',justifyContent:'center',marginLeft:10,alignItems:'center',fontWeight:600,color:'gray'}}>My Orders</p>
        </div>
        <div style={{display:'flex',cursor:'pointer',borderBottom:'1px solid #e0e0e0',paddingBottom:20,paddingTop:20}}>
        <Image src={'/images/box.png'} width={25} height={25}/>
        <p style={{display:'flex',justifyContent:'center',marginLeft:10,alignItems:'center',fontWeight:600,color:'gray'}}>My List</p>
        </div>
        <div style={{display:'flex',marginLeft:-10,cursor:'pointer',marginTop:12}}>
        <Image src={'/images/power (1).png'} width={45} height={45}/>
        <p style={{display:'flex',justifyContent:'center',alignItems:'center',fontWeight:600,color:'gray'}}>Logout</p>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}