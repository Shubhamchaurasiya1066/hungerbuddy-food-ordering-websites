"use client"
import { serverURL } from "../services/FetchNodeServices";
import style from "./AdvertisementComponent.module.css";

export default function AdvertisementComponent() {

  return (
    <div className={style.adparent}>
      <div className={style.adleft}>
        <img src={`${serverURL}/images/groupeat.png`}
          className={style.adimage}
        />
      </div>

      <div className={style.adright}>
        <div className={style.adcontent}>
          <div className={style.adheading}>Our gift to you</div>

          <div className={style.addesc}>
            Make the season merrier with a 
            <b> free handcrafted drink with purchase.</b>
            It’s our treat during your first week as a 
            Starbucks® Rewards member.*
          </div>

          <div>
            <button className={style.adbtn}>Join Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
