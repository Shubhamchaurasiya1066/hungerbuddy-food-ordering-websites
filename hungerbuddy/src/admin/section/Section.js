import { useState } from "react";
import SectionInterface from "./SectionInterface";
import DisplaySection from "./DisplaySection";
export default function Branch(){
    const[refresh,setRefresh]=useState(false)
    return(<div>
        <SectionInterface refresh={refresh} setRefresh={setRefresh}/>
        <DisplaySection refresh={refresh} setRefresh={setRefresh}/>
    </div>)
}