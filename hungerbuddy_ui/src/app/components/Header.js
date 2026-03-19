import CategoryComponent from "./CategoryComponent"
import styles from "./Header.module.css"
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar"
import User from "./User"
export default function Header() {
  var cart=useSelector((state)=>state.cart)
  var totalItems=Object.keys(cart)
  var total=totalItems?.length
  console.log("Total:",total)
  return (
    <div className={styles.maincontainer}>
      <div className={styles.stylebar}>
        <div className={styles.styletext}>
          <div className={styles.styleone}>
            HungerBuddy in
            
          </div>
          <div className={styles.styletwo}>
            20 minutes
          </div>
          <div>
            <span className={styles.stylethree}>Home</span> - <span className={styles.stylename}>Jackie Thomas</span>
          </div>
          
        </div>
          <User totalItems={total}/>
      </div>
    </div>

  )
}