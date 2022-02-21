import React, { useEffect, useState } from "react"
import { getCompanies } from "../../actions/company"
import { connect } from "react-redux"
import { changeQueryParam } from "../../actions/company-router"
import { parse } from "../../lib/query-string"
import Header from "../layouts/header"
import HeaderFilter from "../layouts/headerfilter"
import Spinner from "../spinner"
import CompanyList from "./companylist"
const Company = ({ getCompanies, companies, loading, gettingQueryUrl, changeQueryParam, handleSearch, handleSortBy, handleSort, handleLimit, querySearch, querySortBy, querySort, queryLimit }) => {
  useEffect(() => {
    const fetchData = async () => {
      if (gettingQueryUrl) {
        await getCompanies(gettingQueryUrl)
      } else {
        await getCompanies()
      }
    }
    fetchData()
  }, [getCompanies, gettingQueryUrl])
  const [sortBy, setSortBy] = useState([])
  const [sort, setSort] = useState([])
  const [limit, setLimit] = useState([])
  const getPageCount = (total, perPage) => {
    return Math.ceil(total / perPage)
  }
  const handlePage = (event, page) => {
    changeQueryParam("page", page)
  }
  handleSearch = search => {
    changeQueryParam("search", search)
  }
  handleSortBy = sortBy => {
    setSortBy(sortBy)
    changeQueryParam("sortBy", sortBy)
  }
  handleSort = sort => {
    setSort(sort)
    changeQueryParam("sort", sort)
  }
  handleLimit = limit => {
    setLimit(limit)
    changeQueryParam("limit", limit)
  }
  return (
    <>
      <Header handleSearchCompany={handleSearch} />
      <HeaderFilter handleSortBy={handleSortBy} handleSort={handleSort} handleLimit={handleLimit} setSortBy={setSortBy} setSort={setSort} setLimit={setLimit} sortByC={sortBy} sortC={sort} limitC={limit} />
      {loading ? <Spinner /> : <CompanyList companies={companies && companies.data} handlePage={handlePage} pageCount={getPageCount(companies && companies.pageDetail && companies.pageDetail.total, companies && companies.pageDetail && companies.pageDetail.per_page)} currentPage={companies && companies.pageDetail && companies.pageDetail.current_page} />}
    </>
  )
}
const mapStateToProps = state => ({
  companies: state.company.companies,
  loading: state.company.loading,
  gettingQueryUrl: state.router.location.search,
  querySearch: parse(state.router.location.search).search,
  querySortBy: parse(state.router.location.search).sortBy,
  querySort: parse(state.router.location.search).sort,
  queryLimit: parse(state.router.location.search).limit
})
export default connect(mapStateToProps, { getCompanies, changeQueryParam })(Company)
