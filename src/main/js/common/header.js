import React, { Component, ReactComponent } from "react";
import { Link } from "react-router-dom";
import AuthenticationService from '../service/AuthenticationService';



class Header extends Component {
	constructor(props) {
		super(props);
		this.children = { validated: false };
		this.state = { logado: AuthenticationService.isUserLoggedIn() }

	}

	render() {
		return (

			<>
				<nav className="main-header navbar navbar-expand-md navbar-light navbar-white">
					<div className="container">
						<a href="/" className="navbar-brand">
							<span className="brand-text font-weight-light">Jumia</span>
						</a>
						
						<button className="navbar-toggler order-1" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>

						<div className="collapse navbar-collapse order-3" id="navbarCollapse">
							<ul className="navbar-nav">


								<li className="nav-item">
									<a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
								</li>
								<li className="nav-item">
									<a href="/" className="nav-link"> Home</a>
								</li>

							
							</ul>
						</div>

					</div>
				</nav>

		</>


		);
	}
}


export default Header;
