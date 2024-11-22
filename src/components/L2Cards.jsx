import "./L2Cards.scss"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

function L2Cards() {

  return (

    <Card  className='cardBox'>
      <div className="top">
        <Card.Img className="cardImg" variant="top" src="https://www.0xdh.vip/wp-content/uploads/2023/08/base.png"/>
        <div className="topText">
          <Card.Title className="cardTitle" variant="top">Base</Card.Title>
          <Card.Text className="cardText" >Some quick </Card.Text>
        </div>
      </div>
      <Card.Body className="cardBody">
        <ListGroup >
          <ListGroup.Item className="cardListGroup">
            Transactions: <h6>{232232993}</h6>
            <span>updated time:{"  2024-11-11"}</span>
          </ListGroup.Item>
          <ListGroup.Item className="cardListGroup">
            Current TPS:<h6>{2323}</h6>
            <span>updated time:{"  2024-11-11"}</span>
          </ListGroup.Item>
          <ListGroup.Item className="cardListGroup">
            Average Gas Cost: <h6>{0.000002} $USD</h6> 
            <span>updated time:{"  2024-11-11"}</span>
          </ListGroup.Item>
        </ListGroup>
        <Button className="cardButton"><a> Explorer</a><OpenInNewIcon className="OpenInNewIcon"/></Button>
      </Card.Body>
    </Card>
  );
}

export default L2Cards;

