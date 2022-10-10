import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons/';

const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then((res) => res.data);
};

const addNew = (data) => {
  const req = axios.post(baseUrl, data);
  return req.then((res) => res.data);
};

const deleteById = (id) => {
  const req = axios.delete(baseUrl + id);
  return req.then((res) => res.data);
};

const updateById = (id, data) => {
  const req = axios.put(baseUrl + id, data);
  return req.then((res) => res.data);
};

const personsService = { getAll, addNew, deleteById, updateById };
export default personsService;
