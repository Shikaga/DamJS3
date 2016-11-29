import React from 'react';
import {
	renderIntoDocument,
	scryRenderedDOMComponentsWithClass
} from 'react-addons-test-utils';
import {List, Map} from 'immutable';
import KeyValuePairDisplayer from '../../src/components/KeyValuePairDisplayer';
import {expect} from 'chai';

describe('KeyValuePairDisplayer', () => {

	it('renders keys and values as strings', () => {
		const data = Map({BidPrice: '1.2345', AskPrice: '2.3456'});
		const component = renderIntoDocument(
			<KeyValuePairDisplayer data={data} />
		);
		const entries = scryRenderedDOMComponentsWithClass(component, 'keyValuePairDisplayerTableRow');
		const [bid, ask] = entries.map(e => e.textContent);

		expect(entries.length).to.equal(2);
		expect(bid).to.contain('BidPrice');
		expect(ask).to.contain('AskPrice');

		expect(bid).to.contain('1.2345');
		expect(ask).to.contain('2.3456');
	});
});