import React from 'react';
import {
	renderIntoDocument,
	scryRenderedDOMComponentsWithClass,
	Simulate
} from 'react-addons-test-utils';
import {List, Map} from 'immutable';
import KeyValuePairEditor from '../../src/components/KeyValuePairEditor';
import {expect} from 'chai';

describe('KeyValuePairEditor', () => {

	it('renders keys as strings and values as fields', () => {
		const data = Map({BidPrice: '1.2345', AskPrice: '2.3456'});
		const component = renderIntoDocument(
			<KeyValuePairEditor data={data} />
		);
		const entries = scryRenderedDOMComponentsWithClass(component, 'keyValuePairEditorTableRow');
		const [bid, ask] = entries.map(e => e.textContent);

		expect(entries.length).to.equal(2);
		expect(bid).to.contain('BidPrice');
		expect(ask).to.contain('AskPrice');

		const [bidValue, askValue] = entries.map(e => e.getElementsByTagName('input')[0].value);
		expect(bidValue).to.contain('1.2345');
		expect(askValue).to.contain('2.3456');
	});

	it('calls back when value changed', () => {
		let newKey, newValue;
		const changeValue = (key, value) => {newKey = key, newValue = value};
		const data = Map({BidPrice: '1.2345', AskPrice: '2.3456'});
		const component = renderIntoDocument(
			<KeyValuePairEditor changeValue={changeValue} data={data} />
		);

		const entries = scryRenderedDOMComponentsWithClass(component, 'keyValuePairEditorTableRow');
		const [bidField, askField] = entries.map(e => e.getElementsByTagName('input')[0]);

		Simulate.change(bidField, { target: { value: '1.234' } });
		expect(newKey).to.equal('BidPrice');
		expect(newValue).to.equal('1.234');

		Simulate.change(askField, { target: { value: '9.876' } });
		expect(newKey).to.equal('AskPrice');
		expect(newValue).to.equal('9.876');
	});

});