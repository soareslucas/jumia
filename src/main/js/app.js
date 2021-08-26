'use strict';
import React, { Component } from "react";
import { Link } from "react-router-dom";
const Container = require("react-bootstrap/Container")
const Row = require("react-bootstrap/Row")
const Col = require("react-bootstrap/Col")
const Form = require("react-bootstrap/Form")
const Button = require("react-bootstrap/Button")
const Alert = require("react-bootstrap/Alert")


import axios from 'axios'
import Wrapper from './common/wrapper';


class Index extends React.Component {


    constructor(props) {
        super(props);
        this.state = { validated: false, mostra: false, sucesso: false};

        this.handleUploadFile = this.handleUploadFile.bind(this);

    }

    handleUploadFile(e) {
        const data = new FormData();

        console.log("Uploading file", e.target.files[0]);
        data.append('file', e.target.files[0]);

        this.setState({ mostra: true});


		axios.post('upload', data, {
		    headers: {
		      'Content-Type': 'multipart/form-data'
		    }
		}).then((response) => {
            console.log(response);
            this.setState({ mostra: false });
            this.setState({ sucesso: true});
        }).catch(function (error) {
            console.log(error);
            if (error.response) {
                console.log("Upload error. HTTP error/status code=",error.response.status);
            } else {
               console.log("Upload error. HTTP error/status code=",error.message);
            }
        });
    };


    


    render() {

        const { validated } = this.state;
        const { mostra } = this.state;
        const { sucesso } = this.state;



        return (

            <div>


                <div className="content-header">
                    <div className="container">
                        <div className="row mb-2">
                        <div className="col-sm-6">
                            {/* <h1 className="m-0 text-dark"> Top Navigation <small>Example 3.0</small></h1> */}
                        </div> {/* /.col */}
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><a href="/">Home</a></li>
                            <li className="breadcrumb-item active">início</li>
                            </ol>
                        </div>{/* /.col */}
                        </div> {/* /.row */}
                    </div> {/* /.container-fluid */}
                </div>



                <div className="content">
                    <div className="container">


                        <div className="row">

                            <div className="col-lg-3">
                            </div>

                            <div className="col-lg-6">
                                    <Alert show={sucesso} variant="success">
                                    <p>
                                    Dados carregados com sucesso!
                                    </p>
                                    </Alert>
                            </div>

                            <div className="col-lg-3">
                            </div>
                        </div>


                        <div className="row">


                            <div className="col-lg-3">
                            </div>

                            <div className="col-lg-6">
                                <div className="card">
                                    <div className="card-header text-right">
                                        <h5 className="m-0">Importação de dados da Jumia! <i className="far fa-flag"> </i> </h5>
                                    </div>
                                    <div className="card-body">
                                        <h6 className="card-title">Início</h6>
                                        <p className="card-text">Seja bem vindo! Pressione o botão abaixo para iniciar a importação.</p>


       
                                        <div className="text-right">                                    
                                        <Form
                                            noValidate
                                            validated={validated}
                                            onSubmit={e => this.handleSubmit(e)} >


                                            <Row>
                                            
                                            <Form.Group as={Col}  md="6" controlId="file">
                                                <div key="file">
                                                    <Form.Control required type="file"  onChange={this.handleUploadFile}  />                                                                     
                                                    <Form.Control.Feedback type="invalid">
                                                        Por favor insira um arquivo para importação de dados.
                                                    </Form.Control.Feedback>   
                                                </div>


                                            </Form.Group>

                                            <Form.Group as={Col}  md="6" >
                                                    <Button className="btn btn-primary text-right"  to="/usersList" > Visualizar dados importados </Button>
                                            </Form.Group>


                                            
                                            </Row>


                                            </Form>



                                            <Row> 
                                                
                                                <div className="col-md-4"> </div>


                                                <div  className="col-md-4" style={{display: mostra ? 'block' : 'none' }} > 
                                                    <i className="fas fa-2x fa-sync-alt fa-spin"></i> Carregando...
                                                </div>

                                                <div className="col-md-4"> </div>

                                            </Row>
                                        </div>
                                       
                                       



                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3">
                            </div>

                        </div>

                    </div>
                </div>
            </div>




        )
    }
}


class App extends Component {


    render() {
        return (


            <Wrapper>
                <Index />
            </Wrapper>



        );
    }
}



export default App;

