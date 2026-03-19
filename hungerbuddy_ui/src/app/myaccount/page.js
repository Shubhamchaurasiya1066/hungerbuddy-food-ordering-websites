import styles from './my-account.module.css'
import Image from 'next/image'
import { Grid } from '@mui/material'
import MyAccountAccordion from './MyAccountAccordion'
export default function Profile(){
    
    return(<div>
        <h1 className={styles.header}>My Account</h1>
        <Grid container spacing={2} className={styles.maincontent}>
          <Grid size={12}>
            <div className={styles.profile}>
         <Image src={'/images/user.png'} width={35} height={35}/>
          <div>
            <p className={styles.name}>Shubham</p>
            <p className={styles.mobile}>Shubham@gmail.com</p>
            <p className={styles.mobile}>+91-7354941066</p>
          </div>
          </div>
          <div>
            <MyAccountAccordion/>
          </div>
          </Grid>
        </Grid>
    </div>)
}