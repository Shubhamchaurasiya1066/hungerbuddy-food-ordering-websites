import { useState } from "react";
import BranchInterface from "./branchinterface";
import DisplayBranch from "./DisplayBranch";
export default function Branch(){
    const[refresh,setRefresh]=useState(false)
    return(<div>
        <BranchInterface refresh={refresh} setRefresh={setRefresh}/>
        <DisplayBranch refresh={refresh} setRefresh={setRefresh}/>
    </div>)
}