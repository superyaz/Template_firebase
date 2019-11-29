import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Col, Row, Table, Button} from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getNews, editNews} from '../../actions/newsactions';
import {Link} from 'react-router-dom';

function NewRow(props) {
  const news = props.news;
  const newLink = `#/news/:id ${news.id}`; //${news.id} Lo quite ya que no me dejaba ingresar a la ruta news/add
  let deleteStyle = {
    color: '#20a8d8',
    cursor: 'pointer',
  };
  return (
    <tr key={news.id.toString()}>
      <th scope="row">{news.id}</th>
      <td>{news.imageMain}</td>
      <td>{news.link}</td>
      <td>{news.longDescription}</td>
      <td>{news.shortDescription}</td>
      <td>{news.title}</td>
      <td style={{display: 'flex'}}>
        <a href={newLink}>
          <i
            className="fa fa-edit fa-2x"
            aria-hidden="true"
            onClick={props.onEdit}
            id={news.key}
          ></i>
        </a>{' '}
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
  onEdit() {
    this.props.editNews();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md={12}>
            <Card>
              <CardHeader style={{display: 'flex', alignItems: 'center'}}>
                <i className=""></i> Noticias{' '}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    width: '100%',
                    marginLeft: '85%',
                  }}
                  className="container"
                >
                  <Link to="/news/:id">
                    <Button style={{textAlign: 'left'}} color="success">
                      +
                    </Button>{' '}
                  </Link>
                </div>
              </CardHeader>
              <CardBody>
                <Table responsive size="sm">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Imagen</th>
                      <th>Link</th>
                      <th>Descripción Larga</th>
                      <th>Descripción Corta</th>
                      <th>Titulo</th>
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
    isLoading: state.newsReducer.isLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getNews: bindActionCreators(getNews, dispatch),
    editNews: bindActionCreators(editNews, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(News);
