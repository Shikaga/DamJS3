import React from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import KeyValuePairEditor from './KeyValuePairEditor';


const FilteredMessagesList = React.createClass({
	mixins: [PureRenderMixin],
	getFilteredMessages: function() {
		return this.props.filteredMessages;
	},
	hasFilteredMessages: function() {
		return this.props.filteredMessages && this.props.filteredMessages.size;
	},
	changeValue: function(id) {
		return function(key, value) {
			this.props.onChange(id, key, value);
		}.bind(this);
	},
	render: function () {
		return (
			<div>
				{!this.hasFilteredMessages() ?
					<span>There are currently no filtered messages</span> :
					this.getFilteredMessages().map(entry => <KeyValuePairEditor key={entry.get("id")} data={entry.get("data")} changeValue={this.changeValue(entry.get("id"))}></KeyValuePairEditor>)}
			</div>
		);
	}
});

export default FilteredMessagesList;


