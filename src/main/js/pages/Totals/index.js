import React, { Component } from "react";

const Table = require("react-bootstrap/Table")
const Tab = require("react-bootstrap/Tab")
const Row = require("react-bootstrap/Row")
const Tabs = require("react-bootstrap/Tabs")


import axios from 'axios'
import Wrapper from '../../common/wrapper';




class Total extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<tr>

				<td>{this.props.total.country}</td>
                <td>{this.props.total.total}</td>
			</tr>
		)
	}
}


class TotalList extends React.Component {

	constructor(props) {
		super(props);
    }

	render() {
		
		let totals;
		
		totals = this.props.totals.map(total =>
			<Total key={total.country} total={total}/>
		);

		
		return (
			<div>
				<Table>
					<tbody>
						<tr>
							<th>Country</th>
							<th>Total Users</th>
						</tr>
						
						{totals}
					</tbody>
				</Table>
			</div>
		)
	}
}





class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = { totals: [], mostra: false };    
	}
	
	loadFromServer(){

        this.setState({ mostra: true});

		axios.get('getTotalByCountry'
		).then((response) => {

            this.setState({ mostra: false });
			this.setState({ totals: response.data });

		}).catch(function (error) {
			console.log(error);
			if (error.response) {
				console.log("Upload error. HTTP error/status code=",error.response.status);
			} else {
			console.log("Upload error. HTTP error/status code=",error.message);
			}
		});
	}


	componentDidMount() {
		this.loadFromServer();
	}


	render() {

		const { mostra } = this.state;

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
							<li className="breadcrumb-item active">Total Users by Country</li>
							</ol>
						</div>
						</div> 
					</div> 
				</div>

				<div className="content">

					<div className="container">


						<Tabs defaultActiveKey="ativas" id="uncontrolled-tab-example">
							<Tab eventKey="ativas" title="Users">

					
								<TotalList totals={this.state.totals}/>

								

							
							</Tab>

						</Tabs>

						<Row> 
                                                
							<div className="col-md-5"> </div>


							<div  className="col-md-4" style={{display: mostra ? 'block' : 'none' }} > 
								
								<i className="fas fa-2x fa-sync-alt fa-spin"></i> Carregando...

							</div>

							<div className="col-md-3"> </div>

						</Row>
					</div>
				</div>
				
			</div>

		)
	}

}



class Totals extends Component {


  render() {
    return (
                <Wrapper>
                    <App/>
                </Wrapper>
    );
  }
}

export default Totals;