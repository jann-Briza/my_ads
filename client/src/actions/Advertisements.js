import axios from "axios";
const api_host = "http://localhost:8010/proxy";


function receivesAdvertisements(data) {
    return {
        type: "RECV_ADVERTISEMENTS",
        data
    };
}

function receivesCategory(data) {
    return {
        type: "RECV_CATEGORY",
        data
    };
}

function receivesActiveCategory(data) {
    return {
        type: "RECV_ACTIVE_CATEGORY",
        data
    };
}

function receivesActiveAdvertisement(data) {
    return {
        type: "RECV_ACTIVE_ADVERTISEMENT",
        data
    };
}

function receivesStoreSessionData(data) {
    return {
        type: "RECV_STORE_SESSION_DATA",
        data
    };
}

function receivesDropDownCategory(data) {
    return {
        type: "RECV_DROPDOWN_CATEGORY",
        data
    };
}

function receivesActivePagination(data) {
    return {
        type: "RECV_ACTIVE_PAGINATION",
        data
    };
}

function receivesPaginationSize(data) {
    return {
        type: "RECV_PAGINATION_SIZE",
        data
    };
}

function postAdvertisement(advertisement) {
    return (dispatch) => {
        return axios({
            url:  `${api_host}/advertisement/create`,
            timeout: 20000,
            method: "post",
            data: advertisement,
            responseType: "json"
        })
            .then((response) => {
                window.location.href = "/";
            })
            .catch((error) => {
                alert(error);
            });
    };
}

function updateAdvertisement(advertisement) {
    return () => {
        return axios({
            url:  `${api_host}/advertisement/update/${advertisement.id}`,
            timeout: 20000,
            method: "post",
            data: advertisement,
            responseType: "json"
        })
            .then(() => {
                window.location.href = "/";
            })
            .catch((error) => {
                alert(error);
            });
    };
}

function getAdvertisementByCategoryId(category_id) {
    return (dispatch) => {
        return axios({
            url:  `${api_host}/advertisement/all`,
            params: {
                "category_id": category_id
            },
            timeout: 20000,
            method: "get",
            responseType: "json"
        })
            .then((response) => {
                dispatch(receivesAdvertisements(response.data.data));
            })
            .catch((error) => {
                alert(error);
            });
    };
}

function advertisementsById(advertisement_id) {
    return (dispatch) => {
        return axios({
            url:  `${api_host}/advertisement/${advertisement_id}`,
            timeout: 20000,
            method: "get",
            responseType: "json"
        })
            .then((response) => {
                dispatch(receivesDropDownCategory(response.data.data.category_id));
                dispatch(receivesActiveAdvertisement(response.data.data));
            })
            .catch((error) => {
                alert(error);
            });
    };
}

function deleteAdvertisement(advertisement_id) {
    return () => {
        return axios({
            url:  `${api_host}/advertisement/delete/${advertisement_id}`,
            timeout: 20000,
            method: "post",
            responseType: "json"
        })
            .then((response) => {
                window.location.href = "/";
            })
            .catch((error) => {
                alert(error);
            });
    };
}

export function getAdvertisements(limit = 6, offset = 0) {
    return (dispatch) => {
        return axios({
            url:  `${api_host}/advertisement/all`,
            timeout: 20000,
            params: {
                "limit": limit,
                "offset": offset
            },
            method: "get",
            responseType: "json"
        })
            .then((response) => {
                const pagination_info = {
                    size: response.data.size,
                    offset: response.data.offset,
                    limit: response.data.limit
                }
                dispatch(receivesPaginationSize(pagination_info));
                dispatch(receivesAdvertisements(response.data.data));
            })
            .catch((error) => {
                alert(error);
            });
    };
}

export function getCategory() {
    return (dispatch) => {
        return axios({
            url:  `${api_host}/category`,
            timeout: 20000,
            method: "get",
            responseType: "json"
        })
            .then((response) => {
                dispatch(receivesCategory(response.data.data));
            })
            .catch((error) => {
                alert(error);
            });
    };
}

export function getCategoryValue(categories, event) {
    const category = categories.filter(category => category.id == event.target.value)[0];
    return (dispatch) => {
        dispatch(receivesActiveCategory(category.name));
        dispatch(getAdvertisementByCategoryId(event.target.value))
    }
}

export function submitFormAdvertisement(active_advertisement, session_data, event){
    event.preventDefault();
    return (dispatch) => {
        const elements = event.target.elements;
        let advertisement = {
            "created_by_id": session_data.user_id,
            "title": elements.formBasicTitle.value,
            "key": elements.formBasicKey.value,
            "category_id": elements.formBasicCategory.value,
            "description": elements.formBasicDescription.value,
        }

        if(!active_advertisement.is_updating) {
            dispatch(postAdvertisement(advertisement));
        } else {
            advertisement["id"] = active_advertisement.id
            dispatch(updateAdvertisement(advertisement));
        }
    }
}

export function getAdvertisementsById(advertisement_id) {
    return (dispatch) => {
        dispatch(advertisementsById(advertisement_id));
    }
}

export function deleteAdvertisementsById(advertisement_id) {
    return (dispatch) => {
        dispatch(deleteAdvertisement(advertisement_id));
    }
}


export function getLoginDetails() {
    const user_session_data = {
        is_logged_in: sessionStorage.getItem('is_logged_in'),
        user_id: sessionStorage.getItem('user_id'),
        name: sessionStorage.getItem('name')
    }
    return (dispatch) => {
        dispatch(receivesStoreSessionData(user_session_data));
    }
}

export function changeFormCategory(event) {
    return (dispatch) => {
        dispatch(receivesDropDownCategory(event.target.value))
    }
}

export function logout() {
    return (_) => {
        sessionStorage.clear();
        window.location.href = "/";
    }
}


export function paginateAdvertisement(index, pagination_info, active_pagination) {
    let limit = pagination_info.limit + 6;
    let offset = pagination_info.offset + 6;

    if (index < active_pagination) {
        limit = pagination_info.limit - 6;
        offset = pagination_info.offset -6;
    }
    return (dispatch) => {
        if (active_pagination == index){
            return;
        }
        dispatch(getAdvertisements(
            limit,
            offset
        ))
        dispatch(receivesActivePagination(index));
    }
}