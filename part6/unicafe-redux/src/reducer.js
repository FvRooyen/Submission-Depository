const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD': {
      const incGood = state.good +1
      return {
        ...state,
        good: incGood
        }
    }
    case 'OK':{
    const incOK = state.ok +1
        return {
          ...state,
          ok: incOK
          }
      }
    case 'BAD':{
    const incBad = state.bad +1
        return {
          ...state,
          bad: incBad
          }
      }
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer