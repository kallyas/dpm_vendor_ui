import React from "react"
import Pagination from "@mui/lab/Pagination"

export default function PaginationControlled({tripsLenght, onChange}) {
  return (
    <div
      style={{
        paddingTop: "10px",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <Pagination
        shape="rounded"
        count={Math.round(tripsLenght / 5)}
        onChange={onChange}
      />
    </div>
  )
}
