//def. app store actions
export const ACTION_CHANGE_ROLE = "ActionRole"
export const ACTION_CHANGE_TOKEN = "ActionToken"
export const ACTION_CHANGE_USER_ID = "ActionUserID"
export const ACTION_LOGOUT = 'ActionLogout'

//def. app store mutations
const CHANGE_ROLE  = "ChangeRole"
const CHANGE_TOKEN = "ChangeToken"
const CHANGE_USER_ID = "ChangeUserID"
const LOGOUT = 'Logout'
//app state inicial
const state = {
    role: '',
    token: '',
    user_id: ''
}

// getters 
const getters = {
    getRole (state) {
        return state.role
    },
    getToken (state) {
        return state.token
    },
    getUserID (state) {
        return state.user_id
    }
}

//app store actions
const actions = {
    [ACTION_CHANGE_ROLE] (context, data) {
        context.commit(CHANGE_ROLE, data);
    },
    [ACTION_CHANGE_TOKEN] (context, data) {
        context.commit(CHANGE_TOKEN, data); 
    },
    [ACTION_CHANGE_USER_ID] (context, data) {
        context.commit(CHANGE_USER_ID, data); 
    },
    [ACTION_LOGOUT] (context, data) {
        context.commit(LOGOUT, data); 
    }
}
//app store mutations
const mutations = {
    [CHANGE_ROLE] (state, n) {
        state.role = n
        console.log("Role actual: "+state.role)
    },
    [CHANGE_TOKEN] (state, n) {
        state.token = n
        console.log("Token: "+state.token)
    },
    [CHANGE_USER_ID] (state, n) {
        state.user_id = n
        console.log("User ID actual: "+state.user_id)
    },
    [LOGOUT] (state) {
        state.user_id = ''
        state.token = ''
        state.role = ''
    }
}

// Exportamos todo
export default {
    state,
    actions, 
    mutations,
    getters
}