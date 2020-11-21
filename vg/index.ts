import VgTable from "vg/VgTable"
import VgRow from "vg/VgRow"

export interface VgRecord {
  [colName: string]: any
}

export interface VgColumn {
  key: string,
  label?: string,
  cell: (rec: VgRecord, key: string) => React.Component
}

export default { VgTable, VgRow }
