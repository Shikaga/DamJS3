import React from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import FilteredMessagesList from './FilteredMessagesList';
import HistoryList from './HistoryList';
import InjectionConfig from './InjectionConfig';
import SubscriptionInterceptionPanel from './SubscriptionInterceptionPanel';

const SubscriptionLeafConfig = React.createClass({
	mixins: [PureRenderMixin],
	isInjected: function() {
		return this.props.leaf.get('injected');
	},
	filterChanged: function(subject) {
		return function(id, key, value) {
			this.props.alterFilteredMessage({subject, id, key, value});
		}.bind(this);
	},
	render: function () {
		const style = {
			backgroundColor: "#F5F5F5",
			borderBottom: "1px solid #D4D4D4"
		}
		return (
			<div style={style}>
				<SubscriptionInterceptionPanel {...this.props}></SubscriptionInterceptionPanel>
				{this.isInjected() ? <InjectionConfig leaf={this.props.leaf}/> : null}
				<FilteredMessagesList onChange={this.filterChanged(this.props.leaf.get('subject'))} filteredMessages={this.props.leaf.get('filteredMessages')}/>
				<HistoryList historicMessages={this.props.leaf.get('receivedMessages')}/>
			</div>
		);
	}
});

export default SubscriptionLeafConfig;
