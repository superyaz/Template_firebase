import React, {Component} from 'react';
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Row,
  Card,
  CardHeader,
  CardBody,
  
} from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {editNews} from '../../actions/newsactions';

class AddNews extends Component {
  constructor(props) {
    super(props);
    this.state = this.setInitialData();
  }
  setInitialData = () => {
    return {
      imageMain: '',
      link: '',
      longDescription: '',
      shortDescription: '',
      title: '',
      isedit: false,
      key: 0,
    };
  };

  componentDidMount() {
    let news = this.props.news;
    let findnews = news.find(p => p.id === this.props.match.params.id);
    if (typeof findnews != 'undefined') {
      this.setState({
        imageMain: findnews.imageMain,
        link: findnews.link,
        longDescription: findnews.longDescription,
        shortDescription: findnews.shortDescription,
        title: findnews.title,
        isedit: true,
      });
    }
  }
  handleChange = (e) => {
    const newState = this.state;
    newState[e.target.id] = e.target.value;
    this.setState(newState);
  };

  onSave = (e) => {
    let news = {
      imageMain: this.state.imageMain,
      link: this.state.link,
      longDescription: this.state.longDescription,
      shortDescription: this.state.shortDescription,
      title: this.state.title,
    };
    console.log(news);
    if (this.state.isedit) {
      news.key = this.state.key;
      this.props.addNew(news);
      this.props.history.push('/news');
    } else {
      this.onCancel();
    }
  };
  onCancel = (e) => {
    this.setState(this.setInitialData());
  };

  render() {
    return (
      <div className="animate fadeIn">
        <Row>
          <Col style={{display: 'flex', margin: 'auto'}} xs="12" md="6">
            <Card>
              <CardHeader>
                <strong>Editar Noticia</strong>
              </CardHeader>
              <CardBody style={{fontWeight: 'lighter'}}>
                <Form
                  action=""
                  method="post"
                  encType="multipart/form-data"
                  className="form-horizontal"
                >
                  <FormGroup row>
                    <Label htmlFor="name-input" sm={2}>
                      Imagen Principal
                    </Label>
                    <Col sm={10}>
                      <Input
                        type="text"
                        id="imageMain"
                        value={this.state.imageMain}
                        onChange={this.handleChange}
                        placeholder="Enter Image"
                        autoComplete="name"
                      />
                      <FormText className="help-block">
                        Ingrese la Imagen
                      </FormText>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Label htmlFor="name-input" sm={2}>
                      Ingrese Link
                    </Label>
                    <Col sm={10}>
                      <Input
                        type="text"
                        id="link"
                        value={this.state.link}
                        onChange={this.handleChange}
                        placeholder="Enter Link"
                        autoComplete="name"
                      />
                      <FormText className="help-block">Ingresa Link</FormText>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Label htmlFor="exampleText" sm={2}>
                      Descripción Larga
                    </Label>
                    <Col sm={10}>
                      <Input
                        type="text"
                        placeholder="Enter Long Description"
                        id="longDescription"
                        value={this.state.longDescription}
                        onChange={this.handleChange}
                        autoComplete="name"
                      />
                      <FormText className="help-block">
                        Ingrese Descripción Larga
                      </FormText>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Label for="exampleSelectMulti" sm={2}>
                      Descripción Corta
                    </Label>
                    <Col sm={10}>
                      <Input
                        type="text"
                        placeholder="Enter Short Description"
                        id="shortDescription"
                        value={this.state.shortDescription}
                        onChange={this.handleChange}
                        autoComplete="name"
                      />
                      <FormText className="help-block">
                        Ingrese Descripción Corta
                      </FormText>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Label htmlFor="name-input" sm={2}>
                      Titulo
                    </Label>
                    <Col sm={10}>
                        <Input
                          type="text"
                          id="title"
                          value={this.state.title}
                          onChange={this.handleChange}
                          placeholder="Enter Title"
                          autoComplete="name"
                      />
                      <FormText className="help-block">Enter Title</FormText>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Label for="exampleFile" sm={2}>
                      Archivo
                    </Label>
                    <Col sm={10}>
                      <Input type="file" name="file" id="exampleFile" />
                      <FormText color="muted">
                          This is some placeholder block-level help text for the
                          above input. It's a bit lighter and easily wraps to a
                          new line.
                      </FormText>
                    </Col>
                  </FormGroup>
                </Form>
                <Card>
                  <Button
                    type="submit"
                    size="sm"
                    color="primary"
                    onClick={this.onSave}
                  >Guardar</Button>
                  &nbsp;
                  <Button
                    type="reset"
                    size="sm"
                    color="danger"
                    onClick={this.onCancel}
                  >Cancelar</Button>
                </Card>
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
    isLoading: state.newsReducer.isLoading,
    news: state.newsReducer.news,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editUser: bindActionCreators(editNews,dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNews);
