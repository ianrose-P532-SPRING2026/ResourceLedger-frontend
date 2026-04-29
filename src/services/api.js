import axios from "axios";


export const host = axios.create({
  //baseURL: "http://localhost:8080/api",
  baseURL: "https://ianroseresourceledgerweek1.onrender.com/api",
  timeout: 30000,
});



export async function createResource(name, kind, unit) {
  const request = {name: name, kind: kind, unit: unit};
  const response = await host.post(`/resource-types`, request);
  return response;
}

export async function readResources() {
    const response = await host.get(`/resource-types`);
    return response;
}



export async function readAccounts() {
  const response = await host.get(`/accounts`);
  return response;
}





export async function readProtocols() {
  const response = await host.get(`/protocols`);
  return response;
}

export async function createProtocol(name, description, steps) {
  const request = {name: name, description: description, steps: steps};
  console.log(request);
  const response = await host.post(`/protocols`, request);
  return response;
}

export async function planProtocol(id) {
  const response = await host.post(`/protocols/${id}/plan`);
  return response;
}



export async function readPlans() {
  const response = await host.get(`/plans`);
  return response;
}




export async function setActionState(id, state) {
  const response = await host.post(`/actions/${id}/${state}`);
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