import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Icon } from 'antd';
import styled from 'styled-components';

const { Footer } = Layout;

const StyledFooter = styled(Footer)`
    color: ${({ theme }) => theme.defaultText};
    background: ${({ theme }) => theme.background};
    text-align: center;
    height: 90px;
    position: absolute;
    bottom: 0;
    width: 100%;
`;

const githubLink = "https://github.com/jwbaldwin/flowist";

export class AppFooter extends Component {

	render() {
		return (
		 <StyledFooter>
            <div>
                <a href={githubLink} style={{color: 'inherit'}}>
                    <Icon type='github' />
                </a>
            </div>
            <div>Flowist ©2019 Created by James Baldwin</div>
         </StyledFooter>
		);
	}
}

export default withRouter(AppFooter);
