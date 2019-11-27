import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getNews } from "../../actions/newsactions";

function NewRow(props) {
  const news = props.news;
  const newLink = `·/news/${news.id}`;
  let deleteStyle = {
    color: "#20a8d8",
    cursor: "pointer"
  };
  return (
    <tr key={news.id.toString()}>
      <th scope="row">{news.id}</th>
      <td>{news.imageMain}</td>
      {/* <td>{news.link}</td> */}
      {/* <td>{news.longDescription}</td> */}
      {/* <td>{news.shortDescription}</td> */}
      <td>{news.title}</td>
      <td>
        <a href={newLink}>
          <i className="fa fa-edit fa-2x" aria-hidden="true"></i>
        </a>{" "}
        &nbsp;
        <i
          className="fa fa-remove fa-2x"
          aria-hidden="true"
          style={deleteStyle}
          onClick={props.onDelete}
          id={news.key}
        ></i>
      </td>
    </tr>
  );
}

class News extends Component {
  componentDidMount() {
    this.props.getNews();
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
                      <th>Imagen</th>
                      {/* <th>Link</th> */}
                      {/* <th>Descripción Larga</th> */}
                      <th>Descripción Corta</th>
                      <th>Titulo</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                        {this.props.news.map((news, index) => (
                          <NewRow
                            key={index}
                            news={news}
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
    news: state.newsReducer.news,
    isLoading: state.newsReducer.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getNews: bindActionCreators(getNews, dispatch)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(News);
