import React from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import SubscriptionLeaf from './SubscriptionLeaf';
import StreamLinkStatusPanel from './StreamLinkStatusPanel';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

const DamJS =  React.createClass({
	mixins: [PureRenderMixin],
	render: function () {
		const style = {
			position: "absolute",
			top: "100px",
			left: "400px",
			paddingTop: "100px",
			backgroundColor: "#2B92B6",
			zIndex: "10000",
			overflowY: "scroll",
			fontFamily: "'Roboto', Arial, sans-serif",
			fontSize: "13px",
			border: "2px solid #20718E",
			maxHeight: "500px",
			maxWidth: "400px"
		}
		return (
			<div className="drag" style={style}>
				<StreamLinkStatusPanel status={this.props.status}></StreamLinkStatusPanel>
				{this.props.leaves.valueSeq().map(entry =>
					<SubscriptionLeaf key={entry.get("subject")} leaf={entry}
						{...this.props}/>
				)}
			</div>
		);
	}
});

function mapStateToProps(state) {
	return {
		leaves: state.get('leaves'),
		status: state.get('status')
	};
}

export default connect(mapStateToProps, actionCreators)(DamJS);
