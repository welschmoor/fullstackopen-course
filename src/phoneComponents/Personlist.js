

const Personlist = ({sending: {filter, persons}}) => {
    return(
        <ul>
        {!filter && persons.map(each=>{
          return(
            <li key={each.name}>
              {each.name} {each.number}
            </li>
          )
        })}

        {
        filter && persons.filter(each=> {
          if (each.name.toLowerCase().includes(filter.toLowerCase())) return true
        }).map(each=>{
          return(
            <li key={each.is}>
              {each.name} {each.phone}
            </li>
          )
        })
        }

        </ul>
    )
}

export default Personlist