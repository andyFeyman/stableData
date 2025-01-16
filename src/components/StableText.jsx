import React from "react";
import "./StableText.scss";

function StableText({daily,ath}){
    return(
            <div className="w-full">
                <h2 className="card-title my-3">USD Current Data</h2>
                <div className="stats shadow flex flex-row md:flex-row ">

                    <div className="stat">
                        <div className="stat-title">Current TVL</div>
                        <div className="stat-value text-primary text-xl">{Number(daily?.volume).toLocaleString()}</div>
                    </div>

                    <div className="stat">
                        <div className="stat-title">Updated Time</div>
                        <div className="stat-value text-primary text-xl">
                            {new Date(daily?.createdAt).toLocaleString()} 
                        </div>
                    </div>

                    <div className="stat">
                        <div className="stat-title">Current TVL/MC</div>
                        <div className="stat-value text-primary">{daily?.volMarketCapRatio}</div>
                    </div>
                    
                
                    
                    <div className="stat">                  
                        <div className="stat-title">                           
                            Today TVL/ATH Rate
                            <span className="tooltip">if above 100% then is a sigal to sell</span>               
                        </div>
                        <div className="stat-value text-primary text-warning">
                            {daily?.dailyVolumeWithATH}
                        </div>
                    </div>
                    
                </div>
                <h2 className="card-title my-3">USD ATH Data</h2>
                <div className="stats shadow flex flex-row md:flex-row ">
                    <div className="stat">
                        <div className="stat-title">TVL at ATH</div>
                        <div className="stat-value text-primary text-xl">{Number(ath?.volume).toLocaleString()}</div>
                    </div>

                    <div className="stat">
                        <div className="stat-title">ATH Happened At</div>
                        <div className="stat-value text-primary text-xl">
                            {new Date(ath?.createdAt).toLocaleString()} 
                        </div>
                    </div>
                    
                    <div className="stat">
                        <div className="stat-title">ATH TVL/MC</div>
                        <div className="stat-value text-primary">{ath?.volMarketCapRatio}</div>
                    </div>
                    
                    <div className="stat">
                        <div className="stat-title">Days Since ATH</div>
                        <div className="stat-value text-primary">
                        {daily?.daysFromATH}
                        </div>
                    </div>
                </div>
                
            </div>
   
       
    )

}

export default StableText;