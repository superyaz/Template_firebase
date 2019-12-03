import React, { Component } from "react";
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
  CardBody
} from "reactstrap";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addContests, editContests } from '../../actions/contestsactions';
import toastr from 'toastr';
import { storage } from '../../firebase/init';
// import { PropTypes } from 'prop-types';
// import { CKEditor } from 'ckeditor4-react';



class AddContests extends Component {
  constructor(props) {
    super(props);
    this.state = this.setInitialData();
  }
  setInitialData = () => {
    return {
      url: '',
      imageMain: [],
      images: [],
      link: '',
      longDescription: '',
      shortDescription: '',
      title: '',
      isedit: false,
      key: 0,
      progress: 0,
      data: '',
    };

  }

  componentDidMount() {
    let contests = this.props.contests;
    let findcontests = contests.find(p => p.id === this.props.match.params.id);
    if (typeof findcontests != 'undefined') {
      this.setState({
        imageMain: findcontests.imageMain,
        images: findcontests.images,
        link: findcontests.link,
        longDescription: findcontests.longDescription,
        shortDescription: findcontests.shortDescription,
        title: findcontests.title,
        isedit: false,
        key: 0,
      });
    }
  }

  handleChange = (e) => {
    const newState = this.state;
    newState[e.target.id] = e.target.value;
    this.setState(newState);
  }

  onEditorChange(evt) {
    this.setState({
      data: evt.editor.getData()
    });
  }

  textEdit(changeEvent) {
    this.setState({
      data: changeEvent.target.value
    });
  }

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
          toastr.error("Error al guardar la imagen " + error);
        },
        () => {
          // complete function ...
          storage
            .ref("images")
            .child(imageMain.name)
            .getDownloadURL()
            .then(url => {
              this.setState({ url });
              resolve(url);
              console.log(url);
            });
        }
      )
    });
  }

  //Se ejecuta por medio del evento Onclick 
  onSave = (e) => {
    if (this.state.imageMain !== undefined) {
      this.handleUpload().then(url => {
        let dataJSON = {
          date: new Date(),
          imageMain: url,
          images: this.state.images,
          link: this.state.link,
          longDescription: this.state.longDescription,
          shortDescription: this.state.shortDescription,
          title: this.state.title,
        };
        console.log(dataJSON);

        //Llama la función addConstest para almacenar los datos en la bd
        this.props.addContests(dataJSON);

        if (this.state.isedit) {
          dataJSON.key = this.state.key;
          this.props.editContests(dataJSON);
          this.props.push('/contests');
          console.log(dataJSON)
        } else {
          this.onCancel();
        }
      })
    }

  };
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
                      Imagen
                  </Label>
                    <Col sm={10}>
                      <Input
                        type="text"
                        id="images"
                        value={this.state.images}
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
    isLoading: state.contestsReducer.isLoading,
    contests: state.contestsReducer.contests,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addContests: bindActionCreators(addContests, dispatch),
    editUser: bindActionCreators(editContests, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddContests);
