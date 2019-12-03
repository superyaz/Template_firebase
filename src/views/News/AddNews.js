import React, { Component } from 'react';
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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { editNews, addNews } from '../../actions/newsactions';
import toastr from 'toastr';
import { storage } from '../../firebase/init';


class AddNews extends Component {
  constructor(props) {
    super(props);
    this.state = this.setInitialData();
  }
  setInitialData = () => {
    return {
      url: '',
      imageMain: [],
      link: '',
      longDescription: '',
      shortDescription: '',
      title: '',
      isedit: true,
      key: 0,
      progress: 0,
    }
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

  //Le paso el estado al campo file dentro del formulario
  fileCharge = (e) => {
    if (e.target.files[0]) {
      const imageFile = e.target.files[0];
      this.setState({
        imageMain: imageFile
      });
    }
  }

  handleUpload = () => {
    return new Promise((resolve, reject) => {
      const { imageMain } = this.state;
      const uploadTask = storage.ref(`images/${imageMain.name}`).put(imageMain);
      uploadTask.on(
        "state_changed",
        snapshot => {
          // progress function ...
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          this.setState({ progress });
        },
        error => {
          // Error function ...
          toastr.error("Error al guardar la imagen " + error)
        },
        () => {
          // complete function ...
          storage
            .ref("images")
            .child(imageMain.name)
            .getDownloadURL()
            .then(url => {
              this.setState({ url });
              resolve(url)
              console.log(url);
            });
        }
      );
    });
  }

  //Se ejecuta por medio del evento Onclick 
  onSave = (e) => {
    if (this.state.imageMain !== undefined) {
      this.handleUpload().then(url => {
        let dataJSON = {
          date: new Date(),
          imageMain: url,
          link: this.state.link,
          longDescription: this.state.longDescription,
          shortDescription: this.state.shortDescription,
          title: this.state.title,
        };
        console.log(dataJSON);

        //Llama la función addNews para almacenar los datos en la bd
        this.props.addNews(dataJSON);

        if (this.state.isedit) {
          dataJSON.key = this.state.key;
          this.props.editNews(dataJSON);
          this.props.push('/news');
          console.log(dataJSON)
        } else {
          this.onCancel();
        }
      });
    };
  }

  onCancel = (e) => {
    this.setState(this.setInitialData());
  };


  render() {
    return (
      <div className="animate fadeIn">
        <Row>
          <Col style={{ display: 'flex', margin: 'auto' }} xs="12" md="6">
            <Card>
              <CardHeader>
                <strong>Editar Noticia</strong>
              </CardHeader>
              <CardBody style={{ fontWeight: 'lighter' }}>
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
                        type="file"
                        id="imageMain"
                        onChange={this.fileCharge}
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

                </Form>
                <Card>
                  <Button
                    type="submit"
                    size="sm"
                    color="primary"
                    onClick={this.onSave.bind(this)}
                  >Guardar</Button>
                  &nbsp;
                  <Button
                    type="reset"
                    size="sm"
                    color="danger"
                    onClick={this.onCancel.bind(this)}
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


const mapStateToProps = (state) => {
  return {
    isLoading: state.newsReducer.isLoading,
    news: state.newsReducer.news,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNews: bindActionCreators(addNews, dispatch),
    editUser: bindActionCreators(editNews, dispatch),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNews);
