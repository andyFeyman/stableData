import { Stack } from "react-bootstrap";
import Badge from 'react-bootstrap/Badge';

function StableText({daily,ath}){
    return(
        <div>
            <Stack>
                <h5>    
                    Stable ATH Data:
                </h5>
                <h6>
                    Stable ATH happened at <Badge bg="success">{ath.createdAt}</Badge>
                </h6>
                <h6>
                    The TVL are <Badge bg="success">{ath.volume}</Badge>USD
                </h6>
                <h6>
                    ATH TVL/CAP <Badge bg="success">{ath.volMarketCapRatio}</Badge>
                </h6>
            </Stack>
            <Stack gap={5} className="mt-5 pt-4">
                <h4>
                Updated Time: <Badge bg="success">{daily.createdAt}</Badge>
                </h4>
                <h4>
                    from ATH Date already Pass <Badge bg="success">{daily.daysFromATH}</Badge>Days
                </h4>
                <h4>
                    Stable TVL Today:<Badge bg="success">{daily.volume}</Badge>USD
                </h4>
                <h4>
                Stable  TVL/CAP Rate:  <Badge bg="success">{daily.volMarketCapRatio}</Badge>
                </h4>
                <h4>
                Today TVL / Tvl Of ATH Rate:  <Badge bg="success">{daily.dailyVolumeWithATH}</Badge>
                </h4>
                
            </Stack>
            
        </div>
    )

}

export default StableText;