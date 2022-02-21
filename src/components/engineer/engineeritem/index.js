import React from "react"
import { Link } from "react-router-dom"
import { Container, Grid } from "@material-ui/core"
import { Pagination } from "@material-ui/lab"
import LazyLoad from "react-lazy-load"
import ProfileSkillsItem from "../engineerprofile/profileskillsitem/profileskillsitem"
const EngineerItem = ({ engineers, handlePage, currentPage, pageCount }) => {
  return (
    <div>
      <Container fixed>
        <Grid container direction="row" justify="center" alignItems="center">
          <div className="masonry-container">
            {engineers &&
              engineers.map(engineer => {
                return (
                  <div className="masonry-item text-white" key={engineer.uid}>
                    <Link to={`engineers/profile/${engineer.slug}`}>
                      <LazyLoad>
                        <img className="image masonry-image" src={`${process.env.REACT_APP_GET_LOCAL_IMAGES_ENGINEER}/${engineer.avatar}`} alt={engineer.fullname} />
                      </LazyLoad>
                    </Link>
                    <div className="masonry-description">
                      <p className="mb-1">{engineer.fullname}</p>
                      <p>
                        Expected Salary : <span> {engineer.salary} </span>
                      </p>
                      <p>
                        Skills :
                        <ProfileSkillsItem items={engineer.skills} />
                      </p>
                      {/* <p className={`tag-${item.color} margin-normal`}> {item.skills} </p> */}
                    </div>
                  </div>
                )
              })}
          </div>
        </Grid>
        <div className="flex justify-c-center my-10">
          <Pagination count={pageCount} onChange={(event, page) => handlePage(event, page)} page={currentPage} />
        </div>
      </Container>
    </div>
  )
}
export default EngineerItem
