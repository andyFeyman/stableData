import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavScrollHeader() {
  
  return (
    <Navbar expand="lg" className="bg-body-tertiary sticky-top" >
      <Container fluid className='py-1 fs-6  bg-opacity-75 bg-custom-green'>
        <Navbar.Brand className='me-4' href="#">Crypto Smithy</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 custom-nav"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link  href="/l2explorer">L2 Explorer</Nav.Link>
            <Nav.Link href="/stablecoin">StableCoin ATH</Nav.Link>
            <NavDropdown title="Indicator" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">BTC Signal</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                L1 Signal
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Meme Signal
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollHeader;