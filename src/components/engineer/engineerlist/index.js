import React from "react"
import EngineerItem from "../engineeritem"
import DataEmpty from "../../layouts/dataempty"
const EngineerList = ({ engineers, handlePage, currentPage, pageCount }) => (engineers.data && engineers.data.length == 0 ? <DataEmpty /> : <EngineerItem engineers={engineers.data} handlePage={handlePage} currentPage={currentPage} pageCount={pageCount} />)
export default EngineerList
