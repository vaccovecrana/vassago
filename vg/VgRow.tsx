import * as React from "react"
import { RowCellClassFn, RowCellClickFn, RowClickFn, RowClassFn, VgColumn } from "."

export interface VgRowProps<T> {
  columns: VgColumn<T>[], record: T
  cellClass?: RowCellClassFn<T>
  rowClass?: RowClassFn<T>
  onClickCell?: RowCellClickFn<T>
  onClickRow?: RowClickFn<T>
}

export default class VgRow<T> extends React.Component<VgRowProps<T>> {

  private renderCell(record: T, column: VgColumn<T>) {
    const {cellClass, onClickCell} = this.props
    return (
      <td className={cellClass ? cellClass(record, column) : undefined} key={column.id}
        onClick={(e) => onClickCell ? onClickCell(record, column, e) : {}}>
        {column.cellFn(record, column)}
      </td>
    )
  }

  public render() {
    const {record, rowClass, onClickRow} = this.props
    const cells = this.props.columns.map(col => this.renderCell(record, col))
    return (
      <tr className={rowClass ? rowClass(record) : undefined}
        onClick={e => onClickRow ? onClickRow(record, e) : {}}>
        {cells}
      </tr>
    )
  }
}
