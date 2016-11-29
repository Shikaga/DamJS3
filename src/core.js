import {Map, List} from 'immutable';

export function setState(state, newState) {
	return state.merge(newState);
}

export function addLeaf(state, leaf) {
	const leaves = state.get('leaves').set(leaf.subject, Map(leaf));
	return state.merge({
		leaves: leaves
	})
}

export function filterLeaf(state, leaf) {
	const newLeaf = leaf.set("filtered", !leaf.get("filtered"));
	const leaves =  state.get('leaves').set(leaf.get('subject'), newLeaf);

	return state.merge({
		leaves: leaves
	});
}

export function createLeaf(subject) {
	return Map({subject: subject, filtered: false, injected: false, showConfig: false});
}

export function receiveMessage(state, message) {
	return state.updateIn(['leaves', message.subject],
		createLeaf(message.subject),
		(leaf) => leaf.updateIn(
			['receivedMessages'],
			List.of(),
			receivedMessages => receivedMessages.push(Map({id: message.id, fields: message.fields}))
		)
	);
}

export function addFilteredMessage(state, data) {
	const leaf = state.get('leaves').get(data.subject);
	const newLeaf = leaf.updateIn(['filteredMessages'], List.of(), filteredMessages => filteredMessages.push(data.message));
	const leaves = state.get('leaves').set(data.subject, newLeaf);
	return state.merge({
		leaves: leaves
	})
}

export function toggleLeafConfig(state, leaf) {
	const newLeaf = leaf.set("showConfig", !leaf.get("showConfig"));
	const leaves =  state.get('leaves').set(leaf.get('subject'), newLeaf);

	return state.merge({
		leaves: leaves
	})
}

export function alterFilteredMessage(state, data) {
	const oldFilteredMessages = state.getIn(['leaves', data.subject, 'filteredMessages']);
	const newFilteredMessages = oldFilteredMessages.update(
		oldFilteredMessages.findIndex(function(item) {
			return item.get("id") === data.id;
		}), function(item) {
			return Map({
				id: item.get("id"),
				data: item.get("data").set(data.key, data.value)
			})
		});
	return state.updateIn(
		['leaves', data.subject, 'filteredMessages'],
		List.of(),
		messages => newFilteredMessages
	);
}

export function setConnectionUrl(state, connectionUrl) {
	return state.updateIn(
		['status', 'connectionUrl'],
		'undefined',
		url => connectionUrl
	)
}

export function setStreamLinkSet(state, streamLinkSet) {
	return state.updateIn(
		['status', 'streamLinkSet'],
		false,
		slSet => streamLinkSet
	)
}