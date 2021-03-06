import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import logo from '../../../assets/images/flowist.png';
import styled from 'styled-components';
import './Sidebar.scss';

const { Sider } = Layout;

const StyledSider = styled(Sider)`
    color: ${({ theme }) => theme.defaultText};
    background: ${({ theme }) => theme.background};
    transiton: ${({ theme }) => theme.transiton};
`;

const StyledMenu = styled(Menu)`
    color: ${({ theme }) => theme.defaultText};
    background: ${({ theme }) => theme.background};
    transiton: ${({ theme }) => theme.transiton};
`;

const LogoText = styled.h1`
    color: ${({ theme }) => theme.defaultText};
`

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            width: 80
        };
    }

    onBreakpoint = (broken) => {
        if (broken) {
            this.setState({ width: 0 });
        } else {
            this.setState({ width: 80 });
        }
    };

    updateTheme = () => {
        this.props.settingsActions.updateSettings(
            Object.assign({}, this.props.settings, { theme: this.props.settings.theme === 'light' ? 'dark' : 'light' })
        );
    };

    render() {
        return (
            <StyledSider
				trigger={null}
				breakpoint="md"
				collapsedWidth={this.state.width}
				collapsible
				onCollapse={this.props.toggle}
				collapsed={this.props.collapsed}
				onBreakpoint={this.onBreakpoint}
                width={256}>
                <div id="app-sidebar-logo-div">
                    <Link to="/app">
                        <img src={logo} id="app-sidebar-logo" alt="Flowist Logo" />
                        <LogoText id="app-sidebar-logo-title">
                            {' '}
                            flowist
						</LogoText>
                    </Link>
                </div>
                <StyledMenu
                    theme={this.props.settings.theme}
                    defaultSelectedKeys={[this.props.location.pathname]}
                    mode="inline"
                >
					<Menu.Item key="/app">
						<Link to="/app">
							<i className="fas fa-coffee" />
							<span>Flows</span>
						</Link>
					</Menu.Item>
                    <Menu.Item key="/app/archive">
						<Link to="/app/archive">
							<i className="fas fa-box-open" />
							<span>Archive</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="/app/tags" disabled>
						<Link to="/app/tags">
							<Icon type="tags" theme="filled"/>
							<span>Tags (beta)</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="/app/settings" disabled>
						<Link to="/app/settings">
							<Icon type="share-alt" />
							<span>Insights (beta)</span>
						</Link>
					</Menu.Item>
				</StyledMenu>
            </StyledSider>
        );
    }
}

export default withRouter(Sidebar);
