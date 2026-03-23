import { useState } from "react"
import CategoryInterface from "./CategoryInterface"
import DisplayAll from "./DisplayAll"
export default function Category(){
    const[refresh,setRefresh]=useState(false)
    return(<div>
        <CategoryInterface refresh={refresh} setRefresh={setRefresh}/>
        <DisplayAll refresh={refresh} setRefresh={setRefresh}/>
    </div>)
}