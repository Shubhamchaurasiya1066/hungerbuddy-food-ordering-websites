import { useState } from "react";
import BatchInterface from "./batchInterface";
import DisplayBatch from "./DisplayBatch"
export default function Batch(){
const[refresh,setRefresh]=useState(false)
return(
    <div>
        <BatchInterface refresh={refresh} setRefresh={setRefresh}/>
        <DisplayBatch refresh={refresh} setRefresh={setRefresh}/>
    </div>
)
}