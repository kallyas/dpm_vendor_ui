import React, {useState} from "react"
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Input,
  StepButton,
  TablePagination,
} from "@mui/material"
import ContentLoader from "react-content-loader"
import {Edit, Add} from "@mui/icons-material"
import {MakeRow} from "../tableRow/TableRow"
import {TableSkeleton} from "./TableSkeleton"
import PaginationControlled from "../pagination/Pagination"

export default function SharedTable(props) {
  const {
    tableBody,
    headers,
    handleCheck,
    allChecked,
    toggleAdd,
    hideDock,
    toggleUpdate,
    oneChecked,
    fetching,
    search,
  } = props
  const [page, setPage] = React.useState(1)
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  return (
    <>
      <Grid sx={{
        width: "90%",
        margin: "5px auto auto 5%",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        {search && (
          <Input
            placeholder="Search"
            disableUnderline
            style={{
              padding: "0px 20px",
              width: "30%",
              backgroundColor: "#FFFFFF",
              border: "1px solid #A2302F",
              borderRadius: "50px",
            }}
          />
        )}

        {!hideDock && (
          <Grid>
            <StepButton
              onClick={toggleUpdate}
              style={{
                marginLeft: "10px",
                cursor: "pointer",
                borderRadius: "50%",
                width: "50px",
              }}
            >
              <Edit
                style={{color: oneChecked ? "#000" : "rgba(0, 0, 0, 0.54)"}}
              />
            </StepButton>
            <StepButton
              onClick={toggleAdd}
              style={{
                marginLeft: "10px",
                cursor: "pointer",
                borderRadius: "50%",
                width: "50px",
              }}
            >
              <Add style={{color: "#000"}} />
            </StepButton>
          </Grid>
        )}
      </Grid>
      <TableContainer sx={{
        width: "90%",
        margin: "5px auto auto 5%",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "space-between",
      }} component={Paper}>
        <Table sx={{ width: "100%" }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {MakeRow({
                record: headers,
                classes: { check: { margin: "0px 20px 4px 10px" } },
                header: true,
                allChecked,
                handleCheck,
              })}
            </TableRow>
          </TableHead>
          {fetching ? (
            <ContentLoader
              style={{width: fetching, padding: "0px", height: "360"}}
            >
              <TableSkeleton />
            </ContentLoader>
          ) : (
            <TableBody>
              {tableBody.slice((page - 1) * 7, page * 7).map((row) => (
                <TableRow sx={{
                  "&:nth-of-type(odd)": {
                    backgroundColor: (theme) => theme.palette.action.hover,
                  },
                  "&:hover": {
                    backgroundColor: "#FFEFEF",
                    transition: "background-color 0.5s",
                  },
                }}>
                  {MakeRow({
                    record: headers,
                    classes: { check: { margin: "0px 20px 4px 10px" } },
                    content: row,
                    handleCheck,
                    allChecked,
                  })}
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <PaginationControlled
        tripsLenght={tableBody.length}
        page={page}
        onChange={handleChangePage}
      />
    </>
  )
}
