import axios from "axios";


export const host = axios.create({
  //baseURL: "http://localhost:8080",
  baseURL: "https://ianroseresourceledgerweek1.onrender.com",
  timeout: 5000,
});

export async function createTest(name) {
  const request = {text: name};

  try {
    const response = await host.post(`/test`, request);
    console.log('Success:', response.data);
    return response.data
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function readTest() {
  try {
    const response = await host.get(`/test`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
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