import {filterList} from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {
    
  const handleChange = (event) => {
      props.filterList(event.target.value)
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }

  
  const ConnectedFilter = connect(null, {filterList})(Filter)
  export default ConnectedFilter
  