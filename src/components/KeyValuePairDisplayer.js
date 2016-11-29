import React from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const KeyValuePairDisplayer = React.createClass({
	mixins: [PureRenderMixin],
	getData: function() {
		return this.props.data;
	},
	render: function() {
		const style = {
			padding: "10px",
			borderBottom: "1px solid #D4D4D4"
		}
		const rows = this.getData().map((value, key) =>
			<tr className="keyValuePairDisplayerTableRow" key={key}>
				<td>{key}</td>
				<td>{value}</td>
			</tr>);

		return (<div style={style}><table className="keyValuePairDisplayerTable"><tbody>
		{rows.toArray()}
		</tbody></table></div>)
	}
})


export default KeyValuePairDisplayer;