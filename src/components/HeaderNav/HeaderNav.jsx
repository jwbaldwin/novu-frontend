import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon, Button } from 'antd';
import logo from '../../images/flowist.png';
import './HeaderNav.css';

const { Header } = Layout;

export class HeaderNav extends Component {
	constructor(props) {
		super(props);

		this.state = {
			theme: 'light'
		};
	}

	render() {
		return (
		    <Header style={{ background: '#fff', paddingLeft: '16px' }}>
                <Icon
                className="trigger"
                type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.props.toggle}
                />
            </Header>
		);
	}
}

export default withRouter(HeaderNav);
