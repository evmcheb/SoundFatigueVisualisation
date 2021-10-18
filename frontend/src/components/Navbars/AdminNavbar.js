import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";


// reactstrap components
import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Container,
  NavbarToggler,
} from "reactstrap";
import FetchData from "FetchData/FetchData";

function AdminNavbar(props) {
  const [collapseOpen, setcollapseOpen] = React.useState(false);
 // const [modalSearch, setmodalSearch] = React.useState(false);
  const [color, setcolor] = React.useState("navbar-transparent");
  React.useEffect(() => {
    window.addEventListener("resize", updateColor);
    // Specify how to clean up after this effect:
    return function cleanup() {
      window.removeEventListener("resize", updateColor);
    };
  });
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && collapseOpen) {
      setcolor("bg-white");
    } else {
      setcolor("navbar-transparent");
    }
  };
  // this function opens and closes the collapse on small devices
  const toggleCollapse = () => {
    if (collapseOpen) {
      setcolor("navbar-transparent");
    } else {
      setcolor("bg-white");
    }
    setcollapseOpen(!collapseOpen);
  };
  // this function is to open the Search modal
  //const toggleModalSearch = () => {
    //setmodalSearch(!modalSearch);
  //};



  //For handling fetching notification data
  var data = FetchData(`http://127.0.0.1:8000/notifications/`);
  var nots = data[0]['notifications'];
  var notifications = [];

  if (nots !== undefined){

    if(nots.length > 0){
      for(var i = nots.length-1; i > 0; i--){

        var start_time = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(nots[i]['start_time']*1000);
        
        notifications.push(
        <NavLink tag='li'>
          <DropdownItem className="nav-item">
          { nots[i]['msg'] } at { start_time }!
          </DropdownItem>
        </NavLink>)
      }
    }else{
      notifications.push(
        <NavLink tag='li'>
          <DropdownItem className="nav-item">
            No new notifications.
          </DropdownItem>
        </NavLink>)
    }
  }else{
    notifications.push(
      <NavLink tag='li'>
        <DropdownItem className="nav-item">
          No new notifications.
        </DropdownItem>
      </NavLink>)
  }

  return (
    <>
      <Navbar className={classNames("navbar-absolute", color)} expand="lg">
        <Container fluid>
          <div className="navbar-wrapper">
            <div
              className={classNames("navbar-toggle d-inline", {
                toggled: props.sidebarOpened,
              })}
            >
              <NavbarToggler onClick={props.toggleSidebar}>
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </NavbarToggler>
            </div>
            <NavbarBrand href="#pablo" onClick={(e) => e.preventDefault()}>
              {props.brandText}
            </NavbarBrand>
          </div>
          <NavbarToggler onClick={toggleCollapse}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          <Collapse navbar isOpen={collapseOpen}>
            <Nav className="ml-auto" navbar>
              {/* <InputGroup className="search-bar">
                <Button color="link" onClick={toggleModalSearch}>
                  <i className="tim-icons icon-zoom-split" />
                  <span className="d-lg-none d-md-block">Search</span>
                </Button>
              </InputGroup> */}
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  data-toggle="dropdown"
                  nav
                >
                  <div className="notification d-none d-lg-block d-xl-block" />
                  <i className="tim-icons icon-bell-55" />
                  <p className="d-lg-none">Notifications</p>
                </DropdownToggle>


                
                <DropdownMenu className="dropdown-navbar" right tag="ul">
                  {notifications}
                </DropdownMenu>



              </UncontrolledDropdown>
              <UncontrolledDropdown nav>
                {/* <DropdownToggle
                  caret
                  color="default"
                  nav
                  onClick={(e) => e.preventDefault()}
                >
                  <div className="photo">
                    <img
                      alt="..."
                      src={require("assets/img/anime3.png").default}
                    />
                  </div>
                  <b className="caret d-none d-lg-block d-xl-block" />
                  <p className="d-lg-none">Log out</p>
                </DropdownToggle> */}
                <DropdownMenu className="dropdown-navbar" right tag="ul">
                  <NavLink tag="li" onClick = {() => window.location.href = "Settings"} >
                    <DropdownItem className="nav-item">Settings</DropdownItem>
                  </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown>
              <li className="separator d-lg-none" />
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
      {/* <Modal
        modalClassName="modal-search"
        isOpen={modalSearch}
        toggle={toggleModalSearch}
      >
        <ModalHeader>
          <Input placeholder="SEARCH" type="text" />
          <button
            aria-label="Close"
            className="close"
            onClick={toggleModalSearch}
          >
            <i className="tim-icons icon-simple-remove" />
          </button>
        </ModalHeader>
      </Modal> */}
    </>
  );
}

export default AdminNavbar;
