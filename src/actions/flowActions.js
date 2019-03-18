import {
    FETCH_FLOW,
	FETCH_FLOW_SUCCESS,
	FETCH_FLOW_ERROR,
    ADD_FLOW,
	ADD_FLOW_SUCCESS,
	ADD_FLOW_ERROR,
    UPDATE_FLOW,
	UPDATE_FLOW_SUCCESS,
	UPDATE_FLOW_ERROR,
	DELETE_FLOW,
	DELETE_FLOW_SUCCESS,
	DELETE_FLOW_ERROR
} from './actionTypes';
import { Auth } from 'aws-amplify';
import { message } from 'antd';
import environment from "../environment";

const FLOW_API_URL = environment.api.FLOWS_ENDPOINT;
/*
* FETCH FLOW ACTIONS
*/

export function fetchFlows() {
	return async (dispatch) => {
		dispatch(fetchFlowRequest())
		const headers = new Headers();
		const token = await getIdToken();
		headers.append('Authorization', 'Bearer ' + token);
		headers.append('Content-Type', 'application/json');

		return fetch(FLOW_API_URL + '/all', {
			method: 'GET',
			headers: headers
		})
			.then((response) => response.json())
			.then((json) => {
					dispatch(fetchFlowSuccess(json));
			})
			.catch((error) => dispatch(fetchFlowError(error)));
	};
}

function fetchFlowRequest() {
	return {
		type: FETCH_FLOW
	};
}

export function fetchFlowSuccess(data) {
	return {
		type: FETCH_FLOW_SUCCESS,
		data: data
	};
}

export function fetchFlowError(error) {
	return {
		type: FETCH_FLOW_ERROR,
		error: error
	};
}

/*
* ADD FLOW ACTIONS
*/

export function addFlow(flow) {
	return (dispatch) => {
        dispatch(addFlowRequest())
		return fetch(FLOW_API_URL, {
			method: 'POST',
			headers: {
				Accept: 'application/json, text/plain, */*',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + getIdToken(),
			},
			body: JSON.stringify(flow)
		})
			.then((response) => {
				response.status === 200 ?
				dispatch(addFlowSuccess(response.json()))
				: dispatch(addFlowError(response.status + ': Could not add flow. '))
			})
			.catch((error) => dispatch(addFlowError(error)));
	};
}

function addFlowRequest() {
	return { type: ADD_FLOW };
}

export function addFlowSuccess(data) {
	return {
		type: ADD_FLOW_SUCCESS,
		data: data
	};
}

export function addFlowError(error) {
	return {
		type: ADD_FLOW_ERROR,
		error: error
	};
}

/*
* UPDATE FLOW ACTIONS
*/

export function updateFlow(flow) {
	return (dispatch) => {
        dispatch(updateFlowRequest())
		return fetch(FLOW_API_URL + '?id=' + flow.id, {
			method: 'PUT',
			headers: {
				Accept: 'application/json, text/plain, */*',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + getIdToken(),
			},
			body: JSON.stringify(flow)
		})
			.then((response) => {
				response.status === 200 ?
				dispatch(updateFlowSuccess(response.json()))
				: dispatch(updateFlowError(response.status + ': Could not update flow. '))
			})
			.catch((error) => dispatch(updateFlowError(error)));
	};
}

function updateFlowRequest() {
	return { type: UPDATE_FLOW };
}

export function updateFlowSuccess(data) {
	console.log(data);
    message.success("Flow completed! Congrats! 🎉");
	return {
		type: UPDATE_FLOW_SUCCESS,
		data: data
	};
}

export function updateFlowError(error) {
    message.error("Uhoh :( We couldn't complete the flow 👾")
	return {
		type: UPDATE_FLOW_ERROR,
		error: error
	};
}

/*
* DELETE FLOW ACTIONS
*/

export function deleteFlow(id) {
	return (dispatch) => {
        dispatch(deleteFlowRequest());
		return fetch(FLOW_API_URL + '?id=' + id, {
			method: 'DELETE',
			headers: {
				Accept: 'application/json, text/plain, */*',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + getIdToken(),
			}
		})
			.then((response) => {
				response.status === 200 ?
				dispatch(deleteFlowSuccess(id))
				: dispatch(deleteFlowError(response.status + ': Could not delete flow. '))
			})
			.catch((error) => dispatch(deleteFlowError(error)));
	};
}

function deleteFlowRequest() {
	return { type: DELETE_FLOW };
}

export function deleteFlowSuccess(id) {
    message.success("Flow deleted!")
	return {
		type: DELETE_FLOW_SUCCESS,
        data: id
	};
}

export function deleteFlowError(error) {
    message.error("Uhoh :( We couldn't delete the flow 👾")
	return {
		type: DELETE_FLOW_ERROR,
		error: error
	};
}

async function getIdToken() {
	const session = await Auth.currentSession();
	return session.getIdToken().getJwtToken();
}
