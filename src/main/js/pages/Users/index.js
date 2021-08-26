import React, { Component } from "react";

const Table = require("react-bootstrap/Table")
const Tab = require("react-bootstrap/Tab")
const Form = require("react-bootstrap/Form")
const Col = require("react-bootstrap/Col")
const Row = require("react-bootstrap/Row")

const Button = require("react-bootstrap/Button")
const ReactDOM = require('react-dom');


const Tabs = require("react-bootstrap/Tabs")


import axios from 'axios'

import follow from '../../follow';
import client from '../../client';
import Wrapper from '../../common/wrapper';




class User extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<tr>

				<td>{this.props.user.id}</td>
				<td>{this.props.user.email}</td>
				<td>{this.props.user.phone}</td>
				<td>{this.props.user.country}</td>
                <td>{this.props.user.parcelWeight}</td>
			</tr>
		)
	}
}


class UserList extends React.Component {

	constructor(props) {
		super(props);
    }

	render() {


		
		let users;
		
		users = this.props.users.map(user =>
			<User key={user.id} user={user}/>
		);

		
		return (
			<div>
				<Table>
					<tbody>
						<tr>
							<th>Id</th>
							<th>E-mail</th>
							<th>Phone</th>
							<th>Country</th>
							<th>Weight</th>
						</tr>
						
						{users}
					</tbody>
				</Table>
				

			</div>
		)
	}
}





class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = { users: [], validated: false, pageSize: 10, attributes: [], links: {}, mostra: false, numberPage: 0};    

		this.handleNavPrev = this.handleNavPrev.bind(this);
		this.handleNavNext = this.handleNavNext.bind(this);


	}
	
	handleNavPrev(e) {
		e.preventDefault();

		var newNumber = this.state.numberPage - 1;

		this.setState({ numberPage: newNumber});
		
		this.findByCountry( 
			ReactDOM.findDOMNode(this.refs['country']).value.trim(),
			newNumber);
	}
	
	handleNavNext(e) {
		e.preventDefault();

		var newNumber = this.state.numberPage + 1;

		this.setState({ numberPage: newNumber});
		
		if(newNumber)
		this.findByCountry( 
			ReactDOM.findDOMNode(this.refs['country']).value.trim(),
			newNumber);
	}
	



	findByCountry(country, numberPage){

		this.setState({ mostra: true});

		this.setState({ users: []});

		axios.get('findUsersByCountry?country='+country+'&numberPage='+numberPage
		).then((response) => {
			console.log(response);
			this.setState({ users: response.data });

            this.setState({ mostra: false });

		}).catch(function (error) {
			console.log(error);
			if (error.response) {
				console.log("Upload error. HTTP error/status code=",error.response.status);
			} else {
			console.log("Upload error. HTTP error/status code=",error.message);
			}
		});
	}

	loadFromServer(pageSize){

		console.log('teste');

		follow(client, '/api', [
			{rel: 'users', params: {size: pageSize}}]
		).then(userCollection => {
			return client({
				method: 'GET',
				path: userCollection.entity._links.profile.href,
				headers: {'Accept': 'application/schema+json'}
			}).then(schema => {
				this.schema = schema.entity;
				return userCollection;
			});
		}).done(userCollection => {
			this.setState({
				users: userCollection.entity._embedded.users,
				attributes: Object.keys(this.schema.properties),
				pageSize: pageSize,
				links: userCollection.entity._links});
		});
	}


	handleSubmit(e) {
		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
			this.setState({ validated: true });

		} else{
			e.preventDefault();
			var country = '';

			country = ReactDOM.findDOMNode(this.refs['country']).value.trim();
			
			this.setState({ numberPage: 0});


			this.findByCountry(country, 0);

			this.setState({ validated: false });


		}
	}

	componentDidMount() {
		this.loadFromServer(this.state.pageSize);
	}

	onNavigate(navUri) {
		client({method: 'GET', path: navUri}).done(userCollection => {
			this.setState({
				users: userCollection.entity._embedded.users,
				attributes: this.state.attributes,
				pageSize: this.state.pageSize,
				links: userCollection.entity._links
			});
		});
	}


	render() {

		const { mostra } = this.state;
		const { validated } = this.state;

		return (


			<div>

				<div className="content-header">
					<div className="container">
						<div className="row mb-2">
						<div className="col-sm-6">
						</div> 
						<div className="col-sm-6">
							<ol className="breadcrumb float-sm-right">
							<li className="breadcrumb-item"><a href="/">Home</a></li>
							<li className="breadcrumb-item active">Users by Country</li>
							</ol>
						</div>
						</div> 
					</div> 
				</div>

				<div className="content">

					<div className="container">

						<Form
						noValidate
						validated={validated}
						onSubmit={e => this.handleSubmit(e)} >

							<Form.Row>
										
										
								<Form.Group as={Col} md="7" controlId="1">
								
								</Form.Group>

								<Form.Group as={Col} md="4" controlId="2">

										<div key="country">

										<Form.Control as="select" required placeholder="Country"   ref="country">
											<option>Choose which country to filter...</option>
											<option>Cameroon</option>
											<option>Ethiopia</option>		
											<option>Morocco</option>
											<option>Mozambique</option>
											<option>Uganda</option>
										</Form.Control>							

										</div>
								</Form.Group>
										
								<Form.Group as={Col} md="1" controlId="2">
									<div key="botao">
											<Button variant="primary" type="submit">
												Buscar
											</Button>
									</div>
								</Form.Group>						
																

							</Form.Row>

						</Form>

						<Tabs defaultActiveKey="ativas" id="uncontrolled-tab-example">
							<Tab eventKey="ativas" title="Users">

					
								<UserList users={this.state.users}/>

							
							</Tab>

						</Tabs>
						
						<Row> 
                                                
							<div className="col-md-5"> </div>


							<div  className="col-md-4" style={{display: mostra ? 'block' : 'none' }} > 
								
								<i className="fas fa-2x fa-sync-alt fa-spin"></i> Carregando...

							</div>

							<div className="col-md-3"> </div>

						</Row>


						<Row>

								<Form.Group as={Col} md="9" controlId="1">
								
								</Form.Group>
										
								<Form.Group as={Col} md="3" controlId="2">
									<Row>
										<button className="page-link" key="prev" onClick={this.handleNavPrev}>&lt;&lt; Previous Page</button>
										<button className="page-link" key="next" onClick={this.handleNavNext}>  Next Page&gt;&gt;</button>
									</Row>

								</Form.Group>	

	
						</Row>
					</div>
				</div>
				
			</div>

		)
	}

}



class Users extends Component {


  render() {
    return (
                <Wrapper>
                    <App/>
                </Wrapper>
    );
  }
}

export default Users;