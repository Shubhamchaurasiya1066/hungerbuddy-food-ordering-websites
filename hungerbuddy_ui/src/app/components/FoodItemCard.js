'use client'
import Image from 'next/image';
import styles from './FoodItemCard.module.css';
import { serverURL } from '../services/FetchNodeServices';
import { useRouter } from 'next/navigation';
export default function FoodItemCard({data}) {
  var mycolor=["#81ecec","#a29bfe","#00b894","#dfe6e9","#fab1a0","#ffeaa7","#dff9fb","#f6e58d","#7ed6df","#badc58","#ff7979","#95afc0","#f8a5c2","#ea8685","#f3a683","#f7d794","#ffda79","#ccae62","#cc8e35","#9c88ff","#40739e"]
  var navigate=useRouter()

const showFood=()=>{
  return data.map((item)=>{
    var percent=(item.fullprice-item.offerprice)/item.fullprice*100
    return(
<div className={styles.card}  onClick={()=>navigate.push(`/productdetailcomponent/${item.fooditemid}`)}>
      <div className={styles.imageContainer} style={{background:`${mycolor[parseInt(Math.random()*21)]}`}}>
        <div className={styles.imageStyle}>
        <img
          src={`${serverURL}/images/${item.picture}`}
          alt=""
        style={{width:'100%',height:'100'}}
        />
        </div>
        <div className={styles.discountBadge}>
          {item.offerprice==0?<></>:<>{percent.toFixed(0)}% OFF UPTO ₹{item.fullprice-item.offerprice}</>} 
        </div>
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.name}>{item.fooditemtype=='Veg'?<img src={`${serverURL}/images/veg.png`} width='16'/>:<img style={{paddingTop:2}} src={`${serverURL}/images/nonveg.png`} width='13'/>} <span style={{marginLeft:'1.3%'}}> {item.fooditemname}</span><span style={{marginLeft:'4%'}}>{item.fooditemtaste=='Spicy'?<img src={`${serverURL}/images/spicy.png`} width={16}/>:<></>}</span></h3>
        
        <div className={styles.ratingContainer}>
          <img src={`${serverURL}/images/star.png`} alt='' width={20} height={20} />
          <span className={styles.rating}>{item.rating}</span>
          <span className={styles.separator}>•</span>
          <span className={styles.deliveryTime}>30-35 mins</span>
        </div>
        
        <p className={styles.location}>{item.offerprice==0?<span style={{fontWeight:'bold',color:'#000'}}>₹{item.fullprice}</span>:<><span style={{fontWeight:'bold',marginRight:'2%',color:'#000'}}>₹{item.offerprice}</span> <s>₹{item.fullprice}</s></>}</p>
         <p className={styles.cuisine}>North Indian</p>
      </div>
    </div>
    )
  })
}
  return (
    <div style={{width:'100%',marginTop:40}}>
      <div style={{fontSize:20,fontWeight:'bold',marginBottom:10,marginLeft:'2%'}}>
        Todays Menu
      </div>
      <div style={{display:'flex',justifyContent:'center',flexWrap:'wrap'}}>
{showFood()}
</div>
    </div>
  );
}

