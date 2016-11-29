import React from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import KeyValuePairDisplayer from './KeyValuePairDisplayer';


const HistoryList = React.createClass({
	mixins: [PureRenderMixin],
	getFilteredMessages: function() {
		return this.props.historicMessages;
	},
	hasFilteredMessages: function() {
		return this.props.historicMessages && this.props.historicMessages.size;
	},
	render: function () {
		const style = {
			maxHeight: "300px",
			overflowY: "scroll"
		}
		debugger;
		return (
			<div style={style}>
				{!this.hasFilteredMessages() ?
					<span>There are currently no historic messages</span> :
					this.getFilteredMessages().reverse().map(entry => <KeyValuePairDisplayer key={entry.get("id")} data={entry.get("fields")}></KeyValuePairDisplayer>)}
			</div>
		);
	}
});

export default HistoryList;


