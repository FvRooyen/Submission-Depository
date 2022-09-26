const AddContact = ({onSubmit,nameValue,onNameChange,numberValue,onNumberChange}) => {
    return(
    <form onSubmit={onSubmit}>
      <div>
        Name: <input 
        value = {nameValue} 
        onChange={onNameChange} required/>
      </div>
      <div>
        Number: <input 
        value = {numberValue} 
        onChange={onNumberChange} required/>
      </div>
      <div>
        <button type="submit">Add Contact</button>
      </div>
    </form>
    )
    }

    export default AddContact