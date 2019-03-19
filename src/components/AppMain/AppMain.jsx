import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as settingsActions from '../../actions/settingsActions';
import * as flowActions from '../../actions/flowActions';
import * as userActions from '../../actions/userActions';
import SidebarWrapper from '../SidebarWrapper';
import AppFooter from '../AppFooter';
import HeaderNav from '../HeaderNav';
import Home from '../Home';
import Tags from '../Tags';
import Archive from '../Archive';
import Settings from '../Settings';
import Profile from '../Profile';
import { Layout } from 'antd';
import { isMobile } from "react-device-detect";

export class AppMain extends Component {
	state = {
		collapsed: false
	};

	componentWillMount() {
		this.props.settingsActions.fetchSettings();
		this.props.flowActions.fetchFlows();
	}

	toggleCollapse = () => {
		this.setState({
			collapsed: !this.state.collapsed
		});
	};

	render() {
           const archivedFlows = this.props.flows.filter(flow => flow.flowStatus === 'COMPLETED');
           const activeFlows = this.props.flows.filter(flow => flow.flowStatus !== 'COMPLETED');


		return (
			<Layout style={{ minHeight: '100vh' }}>
				<SidebarWrapper toggle={this.toggleCollapse} collapsed={this.state.collapsed} isMobile={ isMobile } {...this.props} />
				<Layout>
					<HeaderNav toggle={this.toggleCollapse} collapsed={this.state.collapsed} {...this.props}/>
					<Route exact path="/" component={() => <Home flows={activeFlows} />} />
					<Route exact path="/tags" component={Tags} />
					<Route exact path="/archive" component={() => <Archive flows={archivedFlows} />} />
					<Route exact path="/settings" component={Settings} />
                    <Route exact path="/profile" component={() => <Profile flows={this.props.flows} user={this.props.user.user} />} />
					<AppFooter />
				</Layout>
			</Layout>
		);
	}
}

AppMain.propTypes = {
	settingsActions: PropTypes.object,
    userActions: PropTypes.object,
    flows: PropTypes.array,
	settings: PropTypes.object,
    user: PropTypes.object,
};

function mapStateToProps(state) {
	return {
        flows: state.flow.data,
		settings: state.settings,
        user: state.user
	};
}

function mapDispatchToProps(dispatch) {
	return {
        flowActions: bindActionCreators(flowActions, dispatch),
		settingsActions: bindActionCreators(settingsActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AppMain));
