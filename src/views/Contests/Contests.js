import React, { Component } from "react";
import { Table,Row,Col,Card,CardHeader,CardBody } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getContests } from "../../actions/contestsactions";

function ContestRow(props) {
  const contest = props.contest;
  const contestLink = `·/contests/${contest.id}`;
  let deleteStyle = {
    color: "#20a8d8",
    cursor: "pointer"
  };


  return(
    <tr key={contest.id.toString()}>
    <th scope="row">{contest.id}</th>
    <td>{contest.imageMain}</td>
    <td>{contest.images}</td>
    <td>{contest.link}</td>
    <td>{contest.longDescription}</td>
    <td>{contest.shortDescription}</td>
    <td>{contest.title}</td>
    <td>
      <a href={contestLink}>
        <i className="fa fa-edit fa-2x" aria-hidden="true"></i>
      </a>{" "}
      &nbsp;
      <i
        className="fa fa-remove fa-2x"
        aria-hidden="true"
        style={deleteStyle}
        onClick={props.onDelete}
        id={contest.key}
      ></i>
    </td>
  </tr>
    )
}

class Contests extends Component {

  componentDidMount() {
    this.props.getContests();
  }
  render() {
    return (
<div className="animated fadeIn">
<Row>
          <Col md={12}>
            <Card>
              <CardHeader>
                <i className=""></i> Noticias{" "}
              </CardHeader>
              <CardBody>
                <Table responsive size="sm">
                  <thead>
                    <tr>
                      <th scope="col">Imagen principal</th>
                      <th scope="col">Imagen</th>
                      <th scope="col">Link</th>
                      <th scope="col">Descripción Larga</th>
                      <th scope="col">Descripción Corta</th>
                      <th scope="col">Titulo</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                        {this.props.contests.map((contest, index) => (
                          <ContestRow
                            key={index}
                            contest={contest}
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

const mapStateToProps = (state) => {
  return {
    contests: state.contestsReducer.contests,
    isLoading: state.contestsReducer.isLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getContests: bindActionCreators(getContests, dispatch)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Contests);