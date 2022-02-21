import React, { useEffect, useState } from "react"
import { getEngineers } from "../../actions/engineer"
import { connect } from "react-redux"
import { changeQueryParam } from "../../actions/engineer-router"
import { parse } from "../../lib/query-string"
import Header from "../layouts/header"
import HeaderFilter from "../layouts/headerfilter"
import Spinner from "../spinner"
import EngineerList from "./engineerlist"
const Engineer = ({ getEngineers, engineers, loading, gettingQueryUrl, changeQueryParam, handleSearch, handleSort, handleSortBy, handleShow }) => {
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState("latest-update")
  const [sort, setSort] = useState("newer")
  const [show, setShow] = useState(5)
  useEffect(() => {
    const fetchData = async () => {
      if (gettingQueryUrl) {
        await getEngineers(gettingQueryUrl)
      } else {
        await getEngineers()
      }
    }
    fetchData()
    changeQueryParam("page", page)
    changeQueryParam("show", show)
    changeQueryParam("sort", sort)
    changeQueryParam("sortby", sortBy)
  }, [getEngineers, gettingQueryUrl, changeQueryParam, page, show])
  const handlePage = (_, page) => {
    setPage(page)
    changeQueryParam("page", page)
  }
  handleSearch = search => {
    changeQueryParam("search", search)
  }
  handleSortBy = sortBy => {
    setSortBy(sortBy)
    changeQueryParam("sortby", sortBy)
  }
  handleSort = sort => {
    setSort(sort)
    changeQueryParam("sort", sort)
  }
  handleShow = show => {
    setShow(show)
    changeQueryParam("show", show)
  }
  return (
    <>
      <Header handleSearchEngineer={handleSearch} />
      <HeaderFilter handleSortBy={handleSortBy} handleSort={handleSort} handleShow={handleShow} sortByE={sortBy} sortE={sort} showE={show} />
      {loading ? <Spinner /> : <EngineerList engineers={engineers} handlePage={handlePage} pageCount={engineers && engineers.pageDetail && engineers.pageDetail.total} currentPage={engineers && engineers.pageDetail && engineers.pageDetail.currentPage} />}
    </>
  )
}
const mapStateToProps = state => ({
  engineers: state.engineer.engineers,
  loading: state.engineer.loading,
  gettingQueryUrl: state.router.location.search,
  querySearch: parse(state.router.location.search).search,
  querySort: parse(state.router.location.search).sort,
  querySortBy: parse(state.router.location.search).sortby,
  queryShow: parse(state.router.location.search).show
})
export default connect(mapStateToProps, { getEngineers, changeQueryParam })(Engineer)
