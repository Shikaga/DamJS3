import React from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

const InjectionConfig = React.createClass({
	mixins: [PureRenderMixin],
	render: function () {
		return (
			<div>
				You have not set any Injection config yet
			</div>
		);
	}
});

export default InjectionConfig;
