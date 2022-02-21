import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { getSos } from "../../actions/sos"
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Container, Grid } from "@material-ui/core"

import Modal from 'react-modal'
import Spinner from "../spinner"
import Button from '@mui/material/Button'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const Sos = ({ getSos, sos, loading }) => {

  const [isOpen, setOpen] = useState(false)

  const [video, setVideo] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      await getSos()
    }
    fetchData()
  }, [getSos])

  function callModal(video) {
    setVideo(video)
  }
  
  const columns = [
    { 
      field: 'id', 
      headerName: 'ID', 
      width: 150,

    },
    { 
      field: 'category', 
      headerName: 'Case', 
      width: 150
    },
    {
      field: 'file',
      headerName: 'File',
      width: 150,
      renderCell: (params) =>  (
        <div>
          <img src={params.row.file} width="150" />
        </div>
      )
    },
    {
      field: 'content',
      headerName: 'Content',
      
      width: 180,
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 350,
    },
    {
      field: 'fullname',
      headerName: 'Sender',
      width: 150
    },
    {
      field: 'info',
      headerName: '',
      width: 150,
      renderCell: (params) => (
        <div>
        <strong>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => {
              setOpen(true)
              callModal(params.row.video)
            }}
          >
            Open
          </Button>
        </strong>
        </div>
      ),
    },
  ]

  const rows = sos

  function closeModal() {
    setOpen(false);
  }
  
  return (
    <>
    { loading 
      ? <Spinner /> 
      : <Container>
          <Grid
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
          > 
          <Modal
              isOpen={isOpen}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
              >
              <iframe
                width="853"
                height="480"
                src={video}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Sos Show Video"
              />
          </Modal>
            <DataGrid
              rows={rows}
              columns={columns}
              autoHeight
              components={{
                Toolbar: GridToolbar
              }}
              pageSize={sos.length}
            />
          </Grid>
        </Container> 
      })
    </>
  )
}
const mapStateToProps = state => ({
  sos: state.sos.sos,
  loading: state.sos.loading,
})
export default connect(mapStateToProps, { getSos })(Sos)
  

