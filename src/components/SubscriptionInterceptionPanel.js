import React from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

const SubscriptionInterceptionPanel = React.createClass({
	mixins: [PureRenderMixin],
	render: function () {
		var colStyle = {
			width: "25%"
		}
		var tableStyle = {
			textAlign: "center"
		}
		var leftColumnStyle = {
			fontWeight: "bold"
		}
		var headerCellStyle = {
			textAlign: "center"
		}
		return (
			<table style={tableStyle}>
				<colgroup>
					<col span="1" style={colStyle}></col>
					<col span="1" style={colStyle}></col>
					<col span="1" style={colStyle}></col>
					<col span="1" style={colStyle}></col>
				</colgroup>
				<tbody>
				<tr><th></th><th style={headerCellStyle}>Filter</th><th style={headerCellStyle}>Inject</th><th style={headerCellStyle}>Log</th></tr>
				<tr>
					<td style={leftColumnStyle}>Incoming</td>
					<td className="" onClick={() => {this.props.toggleFilter(this.props.leaf);}}>{this.props.leaf.get('filtered').toString()}</td>
					<td>{this.props.leaf.get('injected').toString()}</td>
					<td>true</td>
				</tr>
				<tr>
					<td style={leftColumnStyle}>Outgoing</td>
					<td onClick={() => {this.props.toggleFilter(this.props.leaf);}}>{this.props.leaf.get('filtered').toString()}</td>
					<td>{this.props.leaf.get('injected').toString()}</td>
					<td>true</td>
				</tr>
				</tbody>
			</table>
		);
	}
});

export default SubscriptionInterceptionPanel;


