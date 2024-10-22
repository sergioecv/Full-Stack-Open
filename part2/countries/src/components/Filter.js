const Filter = ({valueFilter, handleFilter}) => {
    return (
      <div>
        find countries
        <input value={valueFilter} onChange={handleFilter}></input>
      </div>
    )
  }

export default Filter