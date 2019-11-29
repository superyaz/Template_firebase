import React, { Component } from "react";
import { Table, Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getDailyReports} from "../../actions/dailyreportsaction";



function DailyRow(props) {
  console.log(props.dailyReport)
  const dailyReport = props.dailyReport;
  const dailyReportsLink = `#/dailyreports/${dailyReport.id}`;
  let deleteStyle = {
    color: "#20a8d8",
    cursor: "pointer"
  };
  return(
    <tr key={dailyReport.id.toString()}>
    <th scope="row">{dailyReport.id}</th>
    <td>{dailyReport.alp}</td>
    <td>{dailyReport.appointments}</td>
    <td>{dailyReport.comments}</td>
    <td>{dailyReport.lead}</td>
    <td>{dailyReport.presentations}</td>
    <td>{dailyReport.referrals}</td>
    <td>{dailyReport.sales}</td>
    <td>{dailyReport.user}</td>
    <td style={{display:"flex"}}>
      <a href={dailyReportsLink}>
        <i className="fa fa-edit fa-2x" aria-hidden="true"></i>
      </a>{" "}
      &nbsp;
      <i
        className="fa fa-remove fa-2x"
        aria-hidden="true"
        style={deleteStyle}
        onClick={props.onDelete}
        id={dailyReport.key}
      ></i>
    </td>
  </tr>
    );
}

class DailyReports extends Component {
  componentDidMount() {
    this.props.getDailyReports();
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md={12}>
            <Card>
              <CardHeader>
                <i className=""></i> Reportes{" "}
              </CardHeader>
              <CardBody>
                <Table responsive size="sm">
                <thead>
                    <tr>
                      <th>Id</th>
                      <th>Alp</th>
                      <th>Appoiments</th> 
                      <th>Comments</th>
                      <th>Lead</th>
                      <th>Presentations</th>
                      <th>Referrals</th>
                      <th>Sales</th>
                      <th>Usuario</th>
                    </tr>
                  </thead>
                  <tbody>
                        {this.props.dailyReports.map((dailyReport, index) => (
                          <DailyRow
                            key={index}
                            dailyReport={dailyReport}
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

const mapStateToProps = (state) =>{
  return{
    dailyReports:state.dailyreportsReducer.dailyReports,
    isLoading:state.dailyreportsReducer.isLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDailyReports: bindActionCreators(getDailyReports, dispatch)
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(DailyReports);
