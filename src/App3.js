import React, {useState} from "react"


const Course = ({course}) => {
    return(
        <center>
            <header><h1>{course.name}</h1></header>
            <ul>
            {course.parts.map(each=>{ 
            return(
              <li key={each.id}>
                  <h3>{each.name}</h3>
                  <p>Number of exercises: {each.exercises}</p>
              </li>  )
            })}
            </ul>
            <div>
                Total number: {course.parts.reduce((sum, each) => {
                    return sum + each.exercises
                }, 0)}
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            
        </center>
    )
}

const Courses = ({courses}) => {
    return(
        <div>
        { 
            courses.map(each => {
                return(
                    <Course course={each}/>
                )

        })}
        </div>
    )
}

const App3 = () => {
    const course = {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        }
      ]
    }



    const courses = [
        {
          name: 'Half Stack application development',
          id: 1,
          parts: [
            {
              name: 'Fundamentals of React',
              exercises: 10,
              id: 1
            },
            {
              name: 'Using props to pass data',
              exercises: 7,
              id: 2
            },
            {
              name: 'State of a component',
              exercises: 14,
              id: 3
            },
            {
              name: 'Redux',
              exercises: 11,
              id: 4
            }
          ]
        }, 
        {
          name: 'Node.js',
          id: 2,
          parts: [
            {
              name: 'Routing',
              exercises: 3,
              id: 1
            },
            {
              name: 'Middlewares',
              exercises: 7,
              id: 2
            }
          ]
        }
      ]







  
    return (
        <>
    <Courses courses={courses} />

    </>
    )
  }

  export default App3