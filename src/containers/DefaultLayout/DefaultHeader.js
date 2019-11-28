import React, { Component } from 'react';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/QPLogo1.png'


const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {
  
};

class DefaultHeader extends Component {

    // constructor(props){
    //   super(props);
    //   this.DropdownToggle = this.DropdownToggle.bind(this);
    //   this.state = {
    //     activeTab:'1'
    //   }; 
    // }

    // DropdownToggle(tab){
    //   if(this.state.activeTab !==tab){
    //     this.setState({
    //       activeTab:tab
    //     })
    //   }
    // }

  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none responsive" display="md" mobile/>
        <AppNavbarBrand
        style={{backgroundColor:'#267DC9', display:'flex', justifyContent:'unset'}}
          full={{ src: logo, width: 100, height: 45, alt: 'Quintero&Partners', marginLeft: 15 }}
          minimized={{ src: logo, width: 100, height: 45, alt: 'Quintero&Partners', marginLeft: 15 }}
        />
        {/* <AppSidebarToggler className="d-md-down-none" display="lg" style={{backgroundColor:'#FFFFFF'}}/> */}
        {/* <Nav className="d-md-down-none" navbar>
        </Nav> */}
        <Nav className="ml-auto" navbar >
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <div>
                <p style={{color: "#FFF", marginBottom: 0, marginRight: 10}}>Administrador</p>
              </div>
            {/* <img src={'assets/img/avatars/6.jpg'} className="img-avatar" alt="administrador" /> */}
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              <DropdownItem><i className="fa fa-bell-o"></i> Updates<Badge color="info">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-envelope-o"></i> Messages<Badge color="success">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-tasks"></i> Tasks<Badge color="danger">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-comments"></i> Comments<Badge color="warning">42</Badge></DropdownItem>
              <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
              <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
              <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
              <DropdownItem><i className="fa fa-usd"></i> Payments<Badge color="secondary">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge></DropdownItem>
              <DropdownItem divider />
              <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem>
              <DropdownItem><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
        {/* <AppAsideToggler className="d-md-down-none" style={{backgroundColor:'#FFFFFF'}}/> */}
        {/* <AppAsideToggler className="d-lg-none" mobile /> */}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
