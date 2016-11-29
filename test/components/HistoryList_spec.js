import React from 'react';
import {
	renderIntoDocument,
	scryRenderedDOMComponentsWithTag,
	scryRenderedDOMComponentsWithClass
} from 'react-addons-test-utils';
import {List, Map} from 'immutable';
import HistoryList from '../../src/components/HistoryList';
import {expect} from 'chai';

describe('HistoryList', () => {

	it('displays message when there are no messages', () => {
		const component = renderIntoDocument(
			<HistoryList historicMessages={null} />
		);
		const entries = scryRenderedDOMComponentsWithTag(component, 'span');

		expect(entries.length).to.equal(1);
		expect(entries[0].textContent).to.equal('There are currently no historic messages');


		const component2 = renderIntoDocument(
			<HistoryList historicMessages={List.of()} />
		);
		const entries2 = scryRenderedDOMComponentsWithTag(component2, 'span');

		expect(entries2.length).to.equal(1);
		expect(entries2[0].textContent).to.equal('There are currently no historic messages');
	});

	it('displays KeyValuePairDisplayer there is one', () => {
		const component = renderIntoDocument(
			<HistoryList historicMessages={List.of(
				Map({data: Map({})})
			)} />
		);
		const entries = scryRenderedDOMComponentsWithTag(component, 'span');
		expect(entries.length).to.equal(0);

		const keyValuePairTableEntries = scryRenderedDOMComponentsWithClass(component, 'keyValuePairDisplayerTable');
		expect(keyValuePairTableEntries.length).to.equal(1);
	});

});