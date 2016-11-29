import React from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import SubscriptionLeafConfig from './SubscriptionLeafConfig';

const SubscriptionLeaf = React.createClass({
	mixins: [PureRenderMixin],
	getSubject: function() {
		if (this.props.leaf) {
			return this.props.leaf.get("subject");
		}
	},
	getFiltered: function() {
		if (this.props.leaf) {
			return this.props.leaf.get("filtered");
		}
	},
	getReceivedMessages: function() {
		if (this.props.leaf) {
			return this.props.leaf.get("receivedMessages");
		}
	},
	render: function () {
		const style = {
			//height: "40px",
			padding: "5px",
			paddingTop: "10px",
			borderBottom: "1px solid #D4D4D4",
			backgroundColor: "#FAFAFA"
		}
		const headingStyle = {
			fontWeight: "bold"
		}
		const tableCellStyle = {
			display: "table-cell"
		}
		const tableCellSubStyleHeading = {
			display: "block",
			color: "#8e8e8e",
			fontSize: "11px"
		}
		const tableCellSubStyleValue = {
			display: "block",
			fontSize: "12px"
		}

		return (
			<div>
				<div style={style} onClick={() => this.props.toggleLeafConfig(this.props.leaf)}>
					<span style={headingStyle}>{this.getSubject()}</span>
					<div style={tableCellStyle}>
						<span style={tableCellSubStyleHeading}>Received Messages</span>
						<span style={tableCellSubStyleValue}>{this.getReceivedMessages().size}</span>
					</div>

				</div>
				{this.props.leaf.get('showConfig') ? <SubscriptionLeafConfig {...this.props}/> : null}
			</div>
		);
	}
});

export default SubscriptionLeaf;
