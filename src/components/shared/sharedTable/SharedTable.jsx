import React, {useState} from "react"
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  TextField,
  IconButton,
  TableSortLabel,
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
      <Box sx={{
        width: "100%",
        mb: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
      }}>
        {search && (
          <TextField
            placeholder="Search"
            variant="outlined"
            size="small"
            sx={{
              width: "300px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />
        )}

        {!hideDock && (
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              onClick={toggleUpdate}
              disabled={!oneChecked}
              sx={{
                color: oneChecked ? "#A2302F" : "action.disabled",
                transition: "all 0.3s",
                "&:hover": {
                  backgroundColor: "rgba(162, 48, 47, 0.1)",
                },
              }}
              title="Edit"
            >
              <Edit />
            </IconButton>
            <IconButton
              onClick={toggleAdd}
              sx={{
                color: "#A2302F",
                transition: "all 0.3s",
                "&:hover": {
                  backgroundColor: "rgba(162, 48, 47, 0.1)",
                },
              }}
              title="Add New"
            >
              <Add />
            </IconButton>
          </Box>
        )}
      </Box>
      <TableContainer component={Paper} sx={{
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}>
        <Table sx={{ width: "100%" }} aria-label="customized table">
          <TableHead sx={{
            backgroundColor: "#A2302F",
            "& th": {
              color: "white",
              fontWeight: 600,
            },
          }}>
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
                <TableRow 
                  key={row.id}
                  sx={{
                    "&:nth-of-type(odd)": {
                      backgroundColor: "rgba(0, 0, 0, 0.02)",
                    },
                    "&:hover": {
                      backgroundColor: "rgba(162, 48, 47, 0.08)",
                      transition: "background-color 0.2s",
                    },
                    "& td": {
                      borderColor: "rgba(224, 224, 224, 0.5)",
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
