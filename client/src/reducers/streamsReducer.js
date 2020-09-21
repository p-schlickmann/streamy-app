export default (state=[], action) => {
    switch(action.type) {
        case 'GET_STREAMS':
            return action.payload
        case 'GET_STREAM':
            return action.payload
        case 'CREATE_STREAM':
            return state    
        case 'GET_CATEGORIES':
            return action.payload
        default:
            return state
    }
}