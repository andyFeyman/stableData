import "./L2Cards.scss"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function L2Cards({l2Item}) {

  return (

    <Card  className='cardBox'>
      <div className="top">
        <Card.Img className="cardImg" variant="top" src={l2Item.l2IconImg}/>
        <div className="topText">
          <Card.Title className="cardTitle" variant="top">{l2Item.l2Name}</Card.Title>
          {/* <Card.Text className="cardText" >Some quick </Card.Text> */}
        </div>
      </div>
      <Card.Body className="cardBody">
        <ListGroup >
          <ListGroup.Item className="cardListGroup">
            Transactions Of Yesterday: <h6>{l2Item.dailyTransaction}</h6>
            {/* <span>updated time:{l2Item.updateTime}</span> */}
          </ListGroup.Item>
          <ListGroup.Item className="cardListGroup">
            Current TPS:<h6>{l2Item.tpsNum}</h6>
            {/* <span>updated time:{l2Item.updateTime}</span> */}
          </ListGroup.Item>
          <ListGroup.Item className="cardListGroup">
            Average Gas Cost: <h6>{l2Item.gasCost} $USD</h6> 
            {/* <span>updated time:{l2Item.updateTime}</span> */}
          </ListGroup.Item>
        </ListGroup>
        <Button className="cardButton">
          <a href={l2Item.l2ExplorerLink} target="_blank" rel="noopener noreferrer"> Explorer</a>
     
        </Button>
      </Card.Body>
    </Card>
  );
}

export default L2Cards;

