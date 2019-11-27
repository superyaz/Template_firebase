import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUsers, addUser, removeUser } from "../../actions/usersactions";

function UserRow(props) {
  const user = props.user;
  const userLink = `#/users/${user.id}`;
  let deleteStyle = {
    color: "#20a8d8",
    cursor: "pointer"
  };
  return (
      <tr key={user.id.toString()}>
        <th scope="row">{user.id}</th>
        <td>{user.fullname}</td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
        <td>{user.type}</td>
        <td>
          <a href={userLink}>
            <i className="fa fa-edit fa-2x" aria-hidden="true"></i>
          </a>{" "}
          &nbsp;
          <i
            className="fa fa-remove fa-2x"
            aria-hidden="true"
            style={deleteStyle}
            onClick={props.onDelete}
            id={user.key}
          ></i>
        </td>
      </tr>
  );
}

class Users extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

  onDelete = e => {
    this.props.removeUser(e.target.id);
  };
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md={12}>
            <Card>
              <CardHeader>
                <i className=""></i> Lista usuarios{" "}
              </CardHeader>
              <CardBody>
                <Table responsive size="sm">
                  <thead>
                    <tr>
                      <th scope="col">id usuario</th>
                      <th scope="col">Nombre completo</th>
                      <th scope="col">Correo</th>
                      <th scope="col">Celular</th>
                      <th scope="col">Perfil</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.users.map((user, index) => (
                      <UserRow
                        key={index}
                        user={user}
                        onDelete={this.onDelete}
                      />
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    users: state.userReducer.users,
    isLoading: state.userReducer.isLoading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getUsers: bindActionCreators(getUsers, dispatch),
    addUser: bindActionCreators(addUser, dispatch),
    removeUser: bindActionCreators(removeUser, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
