import React from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';


const FilteredMessagesList = React.createClass({
	mixins: [PureRenderMixin],
	render: function () {
		return (
			<div>
				{this.props.status.get('streamLinkSet') ?
					<table><tbody>
						<tr className="connectionUrlTableRow">
							<td>Connection</td>
							<td>{this.props.status.get('connectionUrl')}</td>
						</tr>
					</tbody></table> :
					<span>Please make a subscription to get details</span>
				}

			</div>
		);
	}
});

export default FilteredMessagesList;


