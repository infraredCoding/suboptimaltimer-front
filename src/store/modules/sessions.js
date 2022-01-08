import Localbase from 'localbase'
var db = new Localbase('db')

const state = {
    db: db,
    currentSession: null,
    allSessions: [],
}
  
const actions = {
    initSessions({commit}){
        db.collection('sessionsDB').get().then(sessions => {
            commit('SetCurrentSession', sessions[0])
            commit('SetAllSessions', sessions)
        })
    },
    addNewSession({commit}, payload){
        db.collection('sessionsDB').add(payload);
        commit('PushNewSession', payload)
    },

    // Solves
    addNewSolve({commit, state}, payload){
        commit('AddSolveToSession', payload)
        var sl = state.currentSession.solveList
        sl = JSON.parse(JSON.stringify(sl))
        db.collection('sessionsDB').doc({ session_id: state.currentSession.session_id }).update({
            solveList: sl
        })
        // db.collection('sessionsDB').doc({ session_id: state.currentSession.session_id }).get().then( doc => {
        //     doc.solveList.push(payload)
        //     console.log(doc.solveList)
        //     console.log(state.currentSession.solveList)
        // })
    }
}

const mutations = {
    SetAllSessions(state, payload){
        state.allSessions = payload
    },
    SetCurrentSession(state, payload){
        state.currentSession = payload
    },
    PushNewSession(state, payload){
        state.allSessions.push(payload)
    },

    // Solves
    AddSolveToSession(state, payload){
        state.currentSession.solveList.push(payload)
    }
}

const getters = {
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}