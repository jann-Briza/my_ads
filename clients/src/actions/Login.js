import axios from "axios";
const api_host = "http://localhost:8010/proxy";


function loginRequest(login_request) {
    return () => {
        return axios({
            url:  `${api_host}/login`,
            timeout: 20000,
            data: login_request,
            method: "post",
            responseType: "json"
        })
            .then((response) => {
                sessionStorage.setItem('is_logged_in', true);
                sessionStorage.setItem('user_id', response.data.data.id);
                sessionStorage.setItem('name', response.data.data.name);
                window.location.href = "/";
            })
            .catch(() => {
                alert("Wrong username and password");
            });
    };
}

export function login(event){
    event.preventDefault();
    const elements = event.target.elements;
    let login_request = {
        "username": elements.formBasicUsername.value,
        "password": elements.formBasicPassword.value
    }
    return (dispatch) => {
        dispatch(loginRequest(login_request));
    }
}
