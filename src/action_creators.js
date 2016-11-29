export function toggleFilter(state) {
	return {
		type: 'FILTER_LEAF',
		state
	};
}

export function toggleLeafConfig(state) {
	return {
		type: 'TOGGLE_LEAF_CONFIG',
		state
	}
}

export function alterFilteredMessage(state) {
	return {
		type: 'ALTER_FILTERED_MESSAGE',
		state
	}
}