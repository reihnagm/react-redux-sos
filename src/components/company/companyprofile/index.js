import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Container, Grid, Paper, Button, Avatar, makeStyles } from "@material-ui/core"
import Spinner from "../../spinner"
import { getCurrentProfileCompany, deleteProfileCompany } from "../../../actions/company"
const Profile = ({ getCurrentProfileCompany, deleteProfileCompany, company: { company, loading }, history }) => {
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2)
    },
    large: {
      width: theme.spacing(10),
      height: theme.spacing(10)
    }
  }))
  const classes = useStyles()
  let logo = company.data && company.data.logo
  let name = company.data && company.data.name
  let email = company.data && company.data.email
  let description = company.data && company.data.description
  let telephone = company.data && company.data.telephone
  useEffect(() => {
    const fetchData = async () => {
      await getCurrentProfileCompany()
    }
    fetchData()
  }, [getCurrentProfileCompany])
  return loading ? (
    <Spinner />
  ) : (
    <>
      <div
        style={{
          background: "#ea80fc",
          position: "absolute",
          zIndex: -1,
          width: "100%",
          top: "0px",
          left: "0px",
          right: "0px",
          height: "300px"
        }}
      ></div>
      <Container className="mt-64" Fixed>
        <div className={classes.root}>
          <Grid container spacing={8}>
            <Grid item md={4} xs={12}>
              <Paper className={classes.paper}>
                <Avatar className={classes.large} src={`http://localhost:5000/images/company/${logo}`} alt={name} />
                <p className="my-2"> {name} </p>
                <p className="my-2"> {email} </p>
                <p className="my-2"> {telephone} </p>
                <Grid>
                  <Button type="button" variant="contained" color="primary">
                    Delete Account
                  </Button>
                </Grid>
                <Grid>
                  <Button type="button" variant="contained" color="primary" component={Link} to="/companies">
                    Back
                  </Button>
                </Grid>
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
    </>
  )
}
const mapStateToProps = state => ({
  company: state.company
})
export default connect(mapStateToProps, { getCurrentProfileCompany, deleteProfileCompany })(Profile)
