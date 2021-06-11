import axios from "axios";
const api_host = "http://localhost:8010/proxy";


function signupRequest(signup_request) {
    return () => {
        return axios({
            url:  `${api_host}/user/create`,
            timeout: 20000,
            data: signup_request,
            method: "post",
            responseType: "json"
        })
            .then((response) => {
                alert("User Created Please Login")
                window.location.href = "/login";
            })
            .catch(() => {
                alert("Failed to Signup");
            });
    };
}

export function signup(event){
    event.preventDefault();
    const elements = event.target.elements;
    let signup_request = {
        "username": elements.formBasicUserName.value,
        "password": elements.formBasicPassword.value,
        "name": elements.formBasicFullName.value
    }
    return (dispatch) => {
        if(elements.formBasicConfirmPassword.value !== elements.formBasicPassword.value){
            alert("Password does not match")
        } else {
            dispatch(signupRequest(signup_request));
        }
    }
}
