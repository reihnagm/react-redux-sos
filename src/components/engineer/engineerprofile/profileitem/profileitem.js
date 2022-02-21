import React from "react"
import * as moment from "moment"
import { Container, Grid, Paper, Button, Avatar, makeStyles } from "@material-ui/core"
import { Link } from "react-router-dom"
import PersonIcon from "@material-ui/icons/Person"
import EmailIcon from "@material-ui/icons/Email"
import CakeIcon from "@material-ui/icons/Cake"
import PhoneIcon from "@material-ui/icons/Phone"
import LocationOnIcon from "@material-ui/icons/LocationOn"
import SlideshowIcon from "@material-ui/icons/Slideshow"
import ProfileSkillsItem from "../profileskillsitem/profileskillsitem"

const ProfileItem = ({ item }) => {
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      position: "relative"
    },
    avatar: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      marginBottom: "20px"
    }
  }))
  const classes = useStyles()
  return (
    <>
      <div className="backdrop-top"></div>
      <Container className="mt-64" fixed>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Paper className={classes.paper}>
                <Avatar className={classes.avatar} src={`${process.env.REACT_APP_GET_LOCAL_IMAGES_ENGINEER}/${item.avatar}`} alt={item.name} />
                <Grid container>
                  <Grid item md={2} xs={2}>
                    <PersonIcon />
                  </Grid>
                  <Grid item md={10} xs={10}>
                    <p> {item.fullname} </p>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={2} xs={2}>
                    <EmailIcon />
                  </Grid>
                  <Grid item md={10} xs={10}>
                    <p> {item.email} </p>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={2} xs={2}>
                    <CakeIcon />
                  </Grid>
                  <Grid item md={10} xs={10}>
                    <p> {item.birthdate ? moment(item.birthdate).format("D MMMM YYYY") : ""} </p>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={2} xs={2}>
                    <LocationOnIcon />
                  </Grid>
                  <Grid item md={10} xs={10}>
                    <p className="leading-loose"> {item.location === null ? "" : item.location} </p>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={2} xs={2}>
                    <PhoneIcon />
                  </Grid>
                  <Grid item md={10} xs={10}>
                    <p> {item.telephone === null ? "" : item.telephone} </p>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={2} xs={2}>
                    <SlideshowIcon />
                  </Grid>
                  <Grid item md={10} xs={10}>
                    <p> {item.showcase === null ? "" : item.showcase} </p>
                  </Grid>
                </Grid>
                <Grid>
                  <Button type="button" variant="contained" color="primary" component={Link} to="/engineers">
                    Back
                  </Button>
                </Grid>
              </Paper>
            </Grid>
            <Grid item md={4} xs={12}>
              <Paper className={classes.paper}>
                <p> {item.description} </p>
              </Paper>
            </Grid>
            <Grid item md={4} xs={12}>
              <Paper className={classes.paper}>
                <p className="mb-2">
                  Skills
                  <ProfileSkillsItem items={item.skills} />
                </p>
              </Paper>
              <div className="mt-6">
                <Paper className={classes.paper}>
                  <p className="mb-2">Expected Salary</p>
                  <p>{item.salary}</p>
                </Paper>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  )
}

export default ProfileItem
