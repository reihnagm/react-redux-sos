import React from "react"
import { withRouter } from "react-router-dom"
import { InputLabel, FormControl, MenuItem, Select } from "@material-ui/core"
import "react-dropdown/style.css"
const HeaderFilter = ({ handleSortBy, handleSort, handleShow, sortByE, sortE, showE, sortByC, sortC, limitC, location }) => {
  return (
    <div className="my-5">
      <div className="columns justify-c-around">
        <div className="column is-one-fifth">
          <FormControl margin="normal" variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-filterby">Filter By</InputLabel>
            <Select
              inputProps={{
                name: "filterby",
                id: "outlined-filterby"
              }}
              label="Filter By"
              value={sortByE}
              onChange={event => handleSortBy(event.target.value)}
            >
              <MenuItem value="latest-update">Latest Update</MenuItem>
              <MenuItem value="fullname">Name</MenuItem>
            </Select>
          </FormControl>
          {/* <p className="mx-2">Filter By</p>
              {location.pathname === "/engineers" && <Dropdown options={optionsSortByE} value={sortByE} onChange={element => handleSortBy(element.value)} />}
              {location.pathname === "/companies" && <Dropdown options={optionsSortByC} value={sortByC} onChange={element => handleSortBy(element.value)} />} */}
        </div>
        <div className="column is-one-fifth">
          <FormControl margin="normal" variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-sortby">Sort By</InputLabel>
            <Select
              inputProps={{
                name: "sortby",
                id: "outlined-sortby"
              }}
              label="Sort By"
              value={sortE}
              onChange={event => handleSort(event.target.value)}
            >
              <MenuItem value="older">Older</MenuItem>
              <MenuItem value="newer">Newer</MenuItem>
            </Select>
          </FormControl>
          {/* <p className="mx-2">Sort</p>
              {location.pathname === "/engineers" && <Dropdown options={optionsOrderBy} value={sortE} onChange={element => handleSort(element.value)} />}
              {location.pathname === "/companies" && <Dropdown options={optionsOrderBy} value={sortC} onChange={element => handleSort(element.value)} />} */}
        </div>
        <div className="column is-one-fifth">
          {
            <FormControl margin="normal" variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-show">Show</InputLabel>
              <Select
                inputProps={{
                  name: "Show",
                  id: "outlined-show"
                }}
                label="Show"
                value={showE}
                onChange={event => handleShow(event.target.value)}
              >
                <MenuItem value="5">5</MenuItem>
                <MenuItem value="10">10</MenuItem>
                <MenuItem value="15">15</MenuItem>
                <MenuItem value="20">20</MenuItem>
                <MenuItem value="25">25</MenuItem>
              </Select>
            </FormControl>
            /* <p className="mx-2">Show Page</p>
              {location.pathname === "/engineers" && <Dropdown options={optionsShowPage} value={limitE} onChange={element => handleLimit(element.value)} />}
              {location.pathname === "/companies" && <Dropdown options={optionsShowPage} value={limitC} onChange={element => handleLimit(element.value)} />}
        */
          }
        </div>
      </div>
    </div>
  )
}
export default withRouter(HeaderFilter)
