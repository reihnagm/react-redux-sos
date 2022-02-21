import React, { useEffect } from "react"
import "date-fns"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { getCurrentProfileEngineer, getSkills, updateProfileEngineer } from "../../../../actions/engineer"
import Spinner from "../../../spinner"
import ProfileEditItem from "./profileedititem/profileedititem"

const ProfileEdit = ({ getCurrentProfileEngineer, getSkills, updateProfileEngineer, engineer: { engineer, skills, loading }, auth: { user }, history }) => {
  useEffect(() => {
    const fetchData = async () => {
      await getCurrentProfileEngineer()
      await getSkills()
    }
    fetchData()
  }, [getCurrentProfileEngineer, getSkills])
  return loading ? (
    <Spinner />
  ) : (
    <>
      <div className="backdrop-bottom"></div>
      <ProfileEditItem engineer={engineer} user={user} allSkills={skills} history={history} update={updateProfileEngineer} />
    </>
  )
}
const mapStateToProps = state => ({
  engineer: state.engineer,
  auth: state.auth
})
export default connect(mapStateToProps, { getCurrentProfileEngineer, getSkills, updateProfileEngineer })(withRouter(ProfileEdit))
