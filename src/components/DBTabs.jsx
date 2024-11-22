import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import DashBoardCard from './DashBoardCard';

function DBTabs() {
  return (
    <Tabs
      defaultActiveKey="home"
      id="fill-tab-example"
      justify
    >
      <Tab eventKey="home" title="Home">
       <DashBoardCard />
       <DashBoardCard />
       <DashBoardCard />
      </Tab>
      <Tab eventKey="profile" title="Profile">
        <DashBoardCard />
        <DashBoardCard />
        <DashBoardCard />
      </Tab>
      <Tab eventKey="longer-tab" title="Loooonger Tab">
        <DashBoardCard />
        <DashBoardCard />
        <DashBoardCard />
      </Tab>
      <Tab eventKey="contact" title="Contact">
        <DashBoardCard />
        <DashBoardCard />
        <DashBoardCard />
      </Tab>
    </Tabs>
  );
}

export default DBTabs;