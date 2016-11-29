import React from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const KeyValuePairEditor = React.createClass({
	mixins: [PureRenderMixin],
	getData: function() {
		return this.props.data;
	},
	onChange: function(key) {
		return function(event) {
			this.props.changeValue(key, event.target.value);
		}.bind(this);
	},
	render: function() {
		const rows = this.getData().map((value, key) =>
			<tr className="keyValuePairEditorTableRow" key={key}>
				<td>{key}</td><td>
				<input onChange={this.onChange(key)} value={value}></input></td>
			</tr>);

		return (<table className="keyValuePairEditorTable"><tbody>
		{rows.toArray()}
		</tbody></table>)
	}
})


export default KeyValuePairEditor;