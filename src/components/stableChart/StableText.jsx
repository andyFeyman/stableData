import { Stack } from "react-bootstrap";
import Badge from 'react-bootstrap/Badge';

function StableText(){
    return(
        <div>
            <Stack gap={5} className="mt-5 pt-4">
                <h4>
                <Badge bg="success">2024-11-2</Badge>的TVL 到达ATH 的 <Badge bg="success">10%</Badge>
                </h4>
                <h4>
                    距离ATH 已经过去  <Badge bg="success">622</Badge>天
                </h4>

                <h4>
                    今年的最高TVL是 <Badge bg="success">$ 2,323,123,123</Badge>
                    
                </h4>
                <h6>.......发生在<Badge bg="secondary">2024-2-1.</Badge></h6>
            </Stack>
        </div>
    )

}

export default StableText;