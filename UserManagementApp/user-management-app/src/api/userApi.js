import axios from "axios";

const BASE_URL = "http://localhost:8080/api/users";

export const getUsers = () =>
    axios.get(BASE_URL);

export const createUser = (user) =>
    axios.post(BASE_URL, user);

export const importCSV = (file) => {

    const formData = new FormData();

    formData.append("file", file);

    return axios.post(
        BASE_URL + "/import",
        formData
    );
};
