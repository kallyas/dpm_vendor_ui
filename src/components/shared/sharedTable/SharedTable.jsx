import React, { useState, useMemo, useCallback } from "react"
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
  TablePagination,
  InputAdornment,
  Chip,
  Typography,
  TableCell,
} from "@mui/material"
import ContentLoader from "react-content-loader"
import { Edit, Add, Search, Clear } from "@mui/icons-material"
import { MakeRow } from "../tableRow/TableRow"
import { TableSkeleton } from "./TableSkeleton"

const ROWS_PER_PAGE_OPTIONS = [5, 10, 25]

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
  } = props

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchColumn, setSearchColumn] = useState("all")

  const isLoading = fetching === true || fetching === 'true'

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage)
  }, [])

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }, [])

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value)
    setPage(0)
  }, [])

  const clearSearch = useCallback(() => {
    setSearchQuery("")
    setSearchColumn("all")
  }, [])

  const filteredData = useMemo(() => {
    if (!tableBody || !searchQuery) return tableBody || []

    const query = searchQuery.toLowerCase()
    return tableBody.filter((row) => {
      if (searchColumn === "all") {
        return headers.some((header) => {
          const value = row[header.key]
          return value && String(value).toLowerCase().includes(query)
        })
      }
      const value = row[searchColumn]
      return value && String(value).toLowerCase().includes(query)
    })
  }, [tableBody, searchQuery, searchColumn, headers])

  const paginatedData = useMemo(() => {
    const start = page * rowsPerPage
    return filteredData.slice(start, start + rowsPerPage)
  }, [filteredData, page, rowsPerPage])

  const totalPages = Math.ceil((filteredData?.length || 0) / rowsPerPage)

  return (
    <>
      <Box sx={{
        width: "100%",
        mb: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        flexWrap: "wrap",
      }}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", flex: 1, minWidth: 300 }}>
          <TextField
            placeholder="Search..."
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{
              flex: 1,
              maxWidth: 400,
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "text.secondary" }} />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={clearSearch}>
                    <Clear fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {filteredData.length > 0 && (
            <Chip
              label={`${filteredData.length} ${filteredData.length === 1 ? 'record' : 'records'}`}
              size="small"
              sx={{ bgcolor: "primary.light", color: "white" }}
            />
          )}
        </Box>

        {!hideDock && (
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              onClick={toggleUpdate}
              disabled={!oneChecked}
              sx={{
                color: oneChecked ? "primary.main" : "action.disabled",
                bgcolor: oneChecked ? "primary.light" : "transparent",
                transition: "all 0.3s",
                "&:hover": {
                  bgcolor: oneChecked ? "primary.main" : "action.hover",
                  color: oneChecked ? "white" : "inherit",
                },
              }}
              title="Edit"
            >
              <Edit />
            </IconButton>
            <IconButton
              onClick={toggleAdd}
              sx={{
                color: "white",
                bgcolor: "primary.main",
                transition: "all 0.3s",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              }}
              title="Add New"
            >
              <Add />
            </IconButton>
          </Box>
        )}
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
          overflow: "hidden",
        }}
      >
        <Box sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: 650 }} aria-label="enhanced table">
            <TableHead sx={{
              backgroundColor: "primary.main",
              "& th": {
                color: "white",
                fontWeight: 600,
                fontSize: "0.875rem",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                borderBottom: "2px solid rgba(255,255,255,0.2)",
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
            {isLoading ? (
              <ContentLoader style={{ width: "100%", padding: "0px", height: "360" }}>
                <TableSkeleton />
              </ContentLoader>
            ) : paginatedData.length === 0 ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={headers.length + 1} align="center" sx={{ py: 8 }}>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="h6" color="text.secondary" gutterBottom>
                        No Data Found
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {searchQuery ? "Try adjusting your search criteria" : "No records available"}
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {paginatedData.map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      bgcolor: index % 2 === 0 ? "background.paper" : "grey.50",
                      "&:hover": {
                        bgcolor: "primary.light",
                        "& td": {
                          color: "white",
                        },
                        transition: "all 0.2s ease",
                      },
                      "& td": {
                        borderColor: "divider",
                        py: 1.5,
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
        </Box>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          "& .MuiTablePagination-toolbar": {
            minHeight: "52px",
          },
          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
            fontSize: "0.875rem",
          },
        }}
      />
    </>
  )
}
