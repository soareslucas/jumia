import React, { Component, ReactComponent } from "react";
import Header from './header';
import Footer from './footer';
import SideBar from './sidebar';




import AuthenticationService from '../service/AuthenticationService';



class Wrapper extends Component {
	constructor(props) {
		super(props);
		this.children = { validated: false };    
		this.state = { logado: AuthenticationService.isUserLoggedIn()}

	}

  render() {
    return (

        <div className="wrapper">

            <Header/>

            <SideBar/>


            <div className="content-wrapper">

                {this.props.children}

            </div>

            <Footer/>


        </div>






    );
  }
}


export default Wrapper;





