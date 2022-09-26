
const Total = ({parts}) => {
 
    const total = parts.reduce((sum, currValue) => {
      return sum + currValue.exercises; 
    }, 0);
  
    return (
      <b>The number of exercises in this course is {total}</b>
    )}
  
const Part = ({ part }) => {
    return (
      <li> {part.name} {part.exercises}</li>
    )
  }
     
  const Content = ({parts}) => 
    <>
    {console.log(parts)}
    <ul>
      {parts.map(parts =>
        <Part key={parts.id}
          part = {parts}
      />
        )}
    </ul>
    <Total parts = {parts} />
    </>
  
  const Header = ({course}) => <h2>{course}</h2>
  
  const Course = ({courses}) =>
  <>
  <Header course = {courses.name}/>
  <Content parts = {courses.parts} />
  </>
  

  export default Course