import React, { Component, ReactComponent } from "react";
import { Link } from "react-router-dom";
import AuthenticationService from '../service/AuthenticationService';


class SideBar extends Component {
	constructor(props) {
		super(props);
		this.children = { validated: false };    
	}


    componentDidMount() {

        if(AuthenticationService.isUserLoggedIn()){

            document.body.classList.remove('sidebar-collapse'); 

        } else{
            document.body.classList.remove('sidebar-collapse'); 
            document.body.classList.add('sidebar-collapse'); 

        }
        
    }

  render() {
    return (

        <>


            <aside className="main-sidebar sidebar-dark-primary elevation-4">
            {/* Brand Logo */}
            <a href="#" className="brand-link">
                <span className="brand-text font-weight-light">Jumia</span>
            </a>
            {/* Sidebar */}
            <div className="sidebar">
                {/* Sidebar Menu */}
                <nav className="mt-2">
                <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

                    <li className="nav-item">
                        <Link className="nav-link" to="/users" >
                            <i className="nav-icon fas fa-comments-dollar" />
                            <p>
                                Users
                            </p>
                        </Link>
                    </li>


                    <li className="nav-item">
                        <Link className="nav-link" to="/total" >
                            <i className="nav-icon fas fa-comments-dollar" />
                            <p>
                                Total Users By Country
                            </p>
                        </Link>
                    </li>

                </ul>
                </nav>
                {/* /.sidebar-menu */}
            </div>
            {/* /.sidebar */}
            </aside>


      

        </>



    );
  }
}


export default SideBar;





