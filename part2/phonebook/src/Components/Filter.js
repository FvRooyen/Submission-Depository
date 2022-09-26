const Filter = ({filterValue, onFilterChange}) => {
    return (
      <div>
        <input type = 'search'
        value = {filterValue} 
        onChange = {onFilterChange}/>
      </div>
    )
    }

    export default Filter