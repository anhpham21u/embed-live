import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { loggedContext } from "./../App";
import { useContext } from "react";

function MyNav() {
  const { isLogged, setIsLogged } = useContext(loggedContext);
  let username;

  if (isLogged) {
    // take data of user
    const user = JSON.parse(localStorage.getItem("user"));
    username = user.username;
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLogged(false);
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link to="/" className="navbar-brand">
          Live App
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="nav-link">
              Home
            </Link>
            {isLogged === false ? (
              <Link to="/login" className="nav-link">
                Login
              </Link>
            ) : (
              <NavDropdown title={`${username}`} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={handleLogout}>
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            )}
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNav;
