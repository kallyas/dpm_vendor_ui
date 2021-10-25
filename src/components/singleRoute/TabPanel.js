import React from "react"
import {Box} from "@material-ui/core"
import SharedTable from "../shared/sharedTable/SharedTable"

const TabPanel = ({value, index, headers, tableBody, fetching}) => {
  return (
    <div>
      {value === index && (
        <Box>
          <SharedTable
            fetching={fetching}
            hideDock={true}
            headers={headers}
            tableBody={tableBody}
          />
        </Box>
      )}
    </div>
  )
}

export default TabPanel
