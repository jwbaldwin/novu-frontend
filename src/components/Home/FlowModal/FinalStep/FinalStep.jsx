import React, { Component } from 'react';
import { Icon, Input, Tag, Tooltip } from 'antd';
import './FinalStep.css';

export class FinalStep extends Component {
	constructor(props) {
		super(props)

		this.state = {
			tags: [],
			inputVisible: false,
			inputValue: ''
		};
	}

	handleClose = (removedTag) => {
		const tags = this.state.tags.filter((tag) => tag !== removedTag);
		this.setState({ tags });
	};

	showInput = () => {
		this.setState({ inputVisible: true }, () => this.input.focus());
	};

	handleInputChange = (e) => {
		this.setState({ inputValue: e.target.value });
	};

	handleInputConfirm = () => {
		const state = this.state;
		const inputValue = "#" + state.inputValue;
		let tags = state.tags;
		if (inputValue && tags.indexOf(inputValue) === -1) {
			tags = [ ...tags, inputValue ];
		}
		this.props.handleTagsChange(tags);
		this.setState({
			tags,
			inputVisible: false,
			inputValue: ''
		});
	};

	saveInputRef = (input) => (this.input = input);

	applyColor = (index) => {
		const colors = ["magenta", "red", "volcano", "orange", "lime", "green", "cyan", "blue", "geekblue", "purple"];
		// const randomSelection = Math.floor(Math.random() * Math.floor(colors.length));
		return colors[index];
	}

	render() {
		const { tags, inputVisible, inputValue } = this.state;

		return (
            <div>
                <Tooltip title="Add tags to categorize and filter your flows!">
                    <Icon type='info-circle' style={{ float: 'right', margin: 10, color: 'rgba(0,0,0,.45)' }}/>
                </Tooltip>
                <label htmlFor='tags'><Icon type='tags'/> Tag your flow!</label>
                <div className="tags">
                    {tags.map((tag, index) => {
                        return (
                            <Tag closable color={this.applyColor(index)} key={tag} afterClose={() => this.handleClose(tag)}>
                                {tag}
                            </Tag>
                        );
                    })}
                    {inputVisible && (
                        <Input
                            ref={this.saveInputRef}
                            type="text"
                            size="small"
                            style={{ width: 78 }}
                            value={inputValue}
                            onChange={this.handleInputChange}
                            onBlur={this.handleInputConfirm}
                            onPressEnter={this.handleInputConfirm}
                        />
                    )}
                    {!inputVisible && (
                        <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
                            <Icon type="plus" /> New Tag
                        </Tag>
                    )}
                </div>
            </div>
		);
	}
}

export default FinalStep;
