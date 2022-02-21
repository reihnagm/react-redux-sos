import React, { useEffect, Fragment } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Container, Grid, Paper, Button, Avatar, makeStyles } from "@material-ui/core"
import Spinner from "../../../spinner"
import defaultImage from "../../../../images/default.png"
import { getProfileCompanyBySlug, deleteProfileCompany } from "../../../../actions/company"
const Profile = ({ getProfileCompanyBySlug, deleteProfileCompany, company: { company, loading }, history, match }) => {
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2)
    },
    avatar: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      marginBottom: "20px"
    }
  }))
  const classes = useStyles()
  let logo = company.logo
  let name = company.name
  let email = company.email
  let description = company.description
  let telephone = company.telephone
  useEffect(() => {
    const fetchData = async () => {
      await getProfileCompanyBySlug(match.params.slug)
    }
    fetchData()
  }, [getProfileCompanyBySlug, match.params.slug])
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="backdrop-top"></div>
      <Container className="mt-64" Fixed>
        <div className={classes.root}>
          <Grid container spacing={8}>
            <Grid item md={4} xs={12}>
              <Paper className={classes.paper}>
                <Avatar className={classes.avatar} src={`http://localhost:5000/images/company/${logo}`} alt={name} />
                <p className="my-2"> {name} </p>
                <p className="my-2"> {email} </p>
                <p className="my-2"> {telephone} </p>
                <Button type="button" variant="contained" color="primary" component={Link} to="/companies">
                  Back
                </Button>
              </Paper>
            </Grid>
            <Grid item md={4} xs={12}>
              <Paper className={classes.paper}>
                <p> {description} </p>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Container>
    </Fragment>
  )
}
const mapStateToProps = state => ({
  company: state.company
})
export default connect(mapStateToProps, { getProfileCompanyBySlug })(Profile)
