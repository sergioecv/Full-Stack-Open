const Header = (props) => {
  const course = props.course
  return (
      <h1> {course.name}</h1>
  )
}

const Content = (props) => {
  const course = props.course
  const parts = course.parts
  return (
    <div>
      {parts.map( (part,index )=> (
        <p key={index}> {part.name} {part.exercises} </p>
      ))}
    </div>
  )
}

const Total = (props) => {
  let total = 0
  const course = props.course

  course.parts.forEach( part => {
    total = total + part.exercises
  })
  return (
    <p> Number of exercises {total} </p>
  )
}

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
  )
}

export default App
