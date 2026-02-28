import React from "react"
import {StyledTableCell} from "../tableCell/StyledTableCell"
import {Checkbox} from "@mui/material"
import {Link} from "react-router-dom"

export const MakeRow = function ({
  record,
  classes,
  content,
  handleCheck,
  header,
  allChecked,
}) {
  let TableRecord = []
  let path
  const checked = header
    ? allChecked
    : content && (content.checked === undefined ? false : content.checked)
  const id = header ? "header" : content && content.id
  record.forEach((element, index) => {
    if (index === 0) {
      if (element.key === "route_code") {
        path = "routes"
        TableRecord.push(
          <StyledTableCell key={index} align="left">
            <Link
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
              to={`/${path}/${id}`}
            >
              <Checkbox
                onChange={handleCheck}
                checked={checked}
                id={id}
                size="medium"
                className={classes.check}
                sx={{ color: "primary.main" }}
              />
              {content ? content[element.key] : element.label}
            </Link>
          </StyledTableCell>
        )
      } else if (element.key === "number_plate") {
        path = "trip"
        TableRecord.push(
          <StyledTableCell key={index} align="left">
            <Checkbox
              onChange={handleCheck}
              checked={checked}
              id={id}
              size="medium"
              className={classes.check}
              sx={{ color: "primary.main" }}
            />
            <Link
              style={{textDecoration: "none", color: "inherit"}}
              to={`/${path}/${id}`}
            >
              {content ? content[element.key] : element.label}
            </Link>
          </StyledTableCell>
        )
      }
    } else {
      TableRecord.push(
        <StyledTableCell key={index} align="left">
          <Link
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
            to={`/${path}/${id}`}
          >
            {content ? content[element.key] : element.label}
          </Link>
        </StyledTableCell>
      )
    }
  })
  return TableRecord
}
