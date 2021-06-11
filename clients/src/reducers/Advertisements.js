import { combineReducers } from "redux";


function advertisements(state = [], action) {
    switch(action.type) {
    case "RECV_ADVERTISEMENTS":
        return action.data;
    default:
        return state;
    }
}

function categories(state = [], action) {
    switch(action.type) {
    case "RECV_CATEGORY":
        return action.data;
    default:
        return state;
    }
}

function active_category(state = null, action) {
    switch(action.type) {
    case "RECV_ACTIVE_CATEGORY":
        return action.data;
    default:
        return state;
    }
}

function category_dropdown_value(state = 1, action) {
    switch(action.type) {
    case "RECV_DROPDOWN_CATEGORY":
        return action.data;
    default:
        return state;
    }
}

function active_advertisement(state = {
    category_id: "",
    created_by_id: "",
    description: "",
    id: "",
    key: "",
    title: "",
    is_updating: false
}, action) {
    switch(action.type) {
    case "RECV_ACTIVE_ADVERTISEMENT":
        let data = action.data;
        data["is_updating"] = true
    return data;
    default:
        return state;
    }
}

function session_data(state = {is_logged_in: false}, action) {
    switch(action.type) {
    case "RECV_STORE_SESSION_DATA":
        return action.data;
    default:
        return state;
    }
}

function active_pagination(state = 0, action) {
    switch(action.type) {
    case "RECV_ACTIVE_PAGINATION":
        return action.data;
    default:
        return state;
    }
}

function pagination_info(state = {
    size: 1,
    offset: 0,
    limit: 6
}, action) {
    switch(action.type) {
    case "RECV_PAGINATION_SIZE":
        return action.data;
    default:
        return state;
    }
}

const advertisementsReduers = combineReducers({
    advertisements,
    categories,
    active_category,
    active_advertisement,
    session_data,
    category_dropdown_value,
    active_pagination,
    pagination_info
});

export default advertisementsReduers;
