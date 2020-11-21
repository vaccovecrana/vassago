import * as React from "react"
import { VgColumn, VgRecord } from "vg"

export interface VgRowProps {
  classPrefix?: string
  columns: VgColumn[]
  index: number
  item: VgRecord
  cellClass?: (currentClass: string, columnKey: string, rowData: VgRecord) => string
  rowClass?: (currentClass: string, rowData: VgRecord) => string
  onClickCell?: (event: any, key: string, rowData: VgRecord) => void
  onClickRow?: (event: any, rowData: VgRecord) => void
}

export default class VgRow extends React.Component<VgRowProps> {

  private renderCell(item: VgRecord, col: VgColumn) {
    const {classPrefix, cellClass, onClickCell} = this.props
    let classes = `${classPrefix}Cell${classPrefix}Cell_${col.key}`
    if (cellClass) {
      classes = cellClass(classes, col.key, item)
    }
    return (
      <td className={classes} key={col.key}
        onClick={(e) => onClickCell ? onClickCell(e, col.key, item) : {}}>
        {col.cell(item, col.key)}
      </td>
    )
  }

  public render() {
    const {classPrefix, index, item, rowClass, onClickRow} = this.props
    const cells = this.props.columns.map(col => this.renderCell(item, col))
    let classes = `${classPrefix}Row${classPrefix}${index % 2 ? "Odd" : "Even"}`
    if (rowClass) {
      classes = rowClass(classes, item)
    }
    return (
      <tr className={classes} onClick={e => onClickRow ? onClickRow(e, item) : {}}>
        {cells}
      </tr>
    )
  }
}
