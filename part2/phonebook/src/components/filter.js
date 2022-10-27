const Filter = ({search,handleFilter}) => {

  return (
    <div>
      filter shown with <input value={search} onChange={(event)=>handleFilter(event)}/>
    </div>
  )
}

export default Filter;