import axios from "axios";


export const host = axios.create({
  baseURL: "http://localhost:8080/api",
  //baseURL: "https://ianroseresourceledgerweek1.onrender.com/api",
  timeout: 30000,
});




export async function createResource(name, kind, unit, amount, unic) {
  const request = {name: name, kind: kind, unit: unit, startingBalance: amount, unitCost: unic};
  const response = await host.post(`/resource-types`, request);
  return response;
}

export async function readResources() {
    const response = await host.get(`/resource-types`);
    return response;
}

export async function updateResource(id, name, kind, unit, amount) {
  const request = {name: name, kind: kind, unit: unit, startingBalance: amount};
  const response = await host.put(`/resource-types/${id}`, request);
  return response;
}

export async function deleteResource(id) {
  const response = await host.delete(`/resource-types/${id}`);
  return response;
}


export async function createAsset(name, ids) {
  const request = {name: name, assetTypeIds: ids};
  const response = await host.post(`/assets`, request);
  return response;
}

export async function readAssets() {
    const response = await host.get(`/assets`);
    return response;
}

export async function deleteAsset(id) {
  const response = await host.delete(`/assets/${id}`);
  return response;
}



export async function readPoolAccounts() {
  const response = await host.get(`/accounts/pools`);
  return response;
}

export async function readAllAccounts() {
  const response = await host.get(`/accounts`);
  return response;
}





export async function readProtocols() {
  const response = await host.get(`/protocols`);
  return response;
}

export async function createProtocol(name, description, steps) {
  const request = {name: name, description: description, steps: steps};
  const response = await host.post(`/protocols`, request);
  return response;
}


export async function deleteProtocol(id) {
  const response = await host.delete(`/protocols/${id}`);
  return response;
}


export async function planProtocol(id) {
  const response = await host.post(`/protocols/${id}/plan`);
  return response;
}

export async function readLogs() {
  const response = await host.get(`/logs`);
  return response;
}


export async function readPlans() {
  const response = await host.get(`/plans`);
  return response;
}

export async function getPlanSummary(id) {
  const response = await host.get(`/plans/${id}/report`);
  return response;
}




export async function setActionState(id, state, planId) {
  const request = {suspendReason: "", suspensionEnd: null, planId: planId};
  const response = await host.post(`/actions/${id}/${state}`, request);
  return response;
}

export async function suspendAction(id, suspendReason, suspensionEnd, planId) {
  const request = {suspendReason: suspendReason, suspensionEnd: suspensionEnd, planId: planId};
  const response = await host.post(`/actions/${id}/suspend`, request);
  return response;
}

export async function allocateGeneric(planId, actionId, resourceId, amount) {
  const request = {planId: planId, actionId: actionId, resourceId: resourceId, type: "GENERAL", amount: amount};
  const response = await host.post(`/actions/allocation`, request);
  return response;
}


export async function allocateSpecific(actionId, assetId, startTime, endTime) {
  const request = {actionId: actionId, resourceId: null, type: "SPECIFIC", amount: null, assetId: assetId, startTime: startTime, endTime: endTime};
  const response = await host.post(`/actions/allocation`, request);
  return response;
}

export async function createTest(name) {
  const request = {text: name};

  try {
    const response = await host.post(`/test`, request);
    console.log('Success:', response.data);
    return response.data
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function readTest() {
  try {
    const response = await host.get(`/test`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function readTestId(id) {
  try {
    const response = await host.get(`/test/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function updateTest(id) {
  try {
    const response = await host.post(`/test/${id}`);
    console.log('Success:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function deleteTest(id) {
  try {
    const response = await host.post(`/test/${id}`);
    console.log('Success:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}