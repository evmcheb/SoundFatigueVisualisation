
import React from "react";
import FetchData from "FetchData/FetchData";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

function Users() { 
  
  var u = FetchData(`http://127.0.0.1:8000/users/`);

  var users = u[0]["users"];

  var userElements = [];

  if(users !== undefined && users.length > 0){
    for(var i = 0; i < users.length; i++){
      userElements.push(
        <Row>
        <Col className="pr-md-1" md="1">
          <div>
            {users[i]["ID"]}
          </div>
        </Col>
        <Col className="px-md-1" md="4">
          <div>
            {users[i]["FName"]}
          </div>
        </Col>
        <Col className="pl-md-1" md="4">
          <div>
            {users[i]["SName"]}
          </div>
        </Col>
        <Col className="pl-md-1" md="1">
          <Button type="submit">
            Edit
          </Button>
        </Col>
      </Row>
      )
    }
  }else{
    userElements.push(
      <span>
        No users found.
      </span>
    )

  }

  return (
    <>
      <div className="content">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <h5 className="title">Create New User</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-md-1" md="5">
                      <FormGroup>
                        <label>Company (disabled)</label>
                        <Input
                          defaultValue="Royal Australian Navy"
                          disabled
                          placeholder="Company"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>Username</label>
                        <Input
                          defaultValue="michael23"
                          placeholder="Username"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Input placeholder="mike@email.com" type="email" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>First Name</label>
                        <Input
                          defaultValue="Mike"
                          placeholder="Company"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label>Last Name</label>
                        <Input
                          defaultValue="Andrew"
                          placeholder="Last Name"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Address</label>
                        <Input
                          defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                          placeholder="Home Address"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>City</label>
                        <Input
                          defaultValue="Mike"
                          placeholder="City"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>Country</label>
                        <Input
                          defaultValue="Andrew"
                          placeholder="Country"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label>Postal Code</label>
                        <Input placeholder="ZIP Code" type="number" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>About Employee</label>
                        <Input
                          cols="80"
                          defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec arcu cursus, placerat magna vel, eleifend eros. Cras commodo risus at magna vestibulum, id tristique ipsum lobortis. Nullam ac magna ex. Suspendisse et condimentum sem. Nam blandit nisi ut lacus tempor scelerisque. Ut placerat sem quis orci bibendum blandit. Sed vel ante malesuada, faucibus est ac, ultrices nulla."
                          placeholder="Here can be your description"
                          rows="4"
                          type="textarea"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Button className="btn-fill" color="primary" type="submit">
                  Create User
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <h5 className="title">Existing Users</h5>
              </CardHeader>
              <CardBody>
              <Row>
                <Col className="pr-md-1" md="2">
                  <label>ID</label>
                </Col>
                <Col className="px-md-1" md="5">
                  <label>First Name</label>
                </Col>
                <Col className="pl-md-1" md="5">
                  <label>Surname</label>
                </Col>
              </Row>
                { userElements }
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Users;
