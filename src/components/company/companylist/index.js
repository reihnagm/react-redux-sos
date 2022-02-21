import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import defaultImage from '../../../images/default.png';
const CompanyList = ({ companies, handlePage, currentPage, pageCount }) => {
    const useStyles = makeStyles(theme => ({
        root: {
            '& > *': {
                marginBottom: theme.spacing(8)
            },
        },
    }));
    const classes = useStyles();
    return (
        <>
            <Container fixed>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <div className="masonry-container">
                        { companies && companies.map(company => (
                            <div className="masonry-item" key={companies.id}>
                                <Link className="text-white" to={`company/profile/${company.slug}`}>
                                    <img className="image rounded" src={company.logo ? `http://localhost:5000/images/company/${company.logo}` : defaultImage} alt={company.name} />
                                    <div className="masonry-description">
                                        <p className="mb-1"> {company.name} </p>
                                        <p className="mb-1">{company.description}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className={classes.root}>
                        <Pagination
                            count={pageCount}
                            onChange={(event, page) => handlePage(event, page)}
                            page={currentPage}
                        />
                    </div>
                </Grid>
            </Container>
        </>
    )
}
export default CompanyList
