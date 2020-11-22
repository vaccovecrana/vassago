import * as React from "react"
import {
  RowCellClickFn, RowClickFn, RowHeaderClickFn, RowIdFn,
  RowHeaderClassFn, RowHeaderFn, VgColumn, defaultCellFn } from "."
import VgRow, { VgRowProps } from "vg/VgRow"

export interface VgTableProps<T> {
  classes?: string
  columns?: VgColumn<T>[], rows: T[]
  header?: boolean, headerClass?: RowHeaderClassFn<T>
  noRowsMessage?: string
  headerFn?: RowHeaderFn<T>
  rowIdFn: RowIdFn<T>
  onClickRow?: RowClickFn<T>
  onClickHeader?: RowHeaderClickFn<T>
  onClickCell?: RowCellClickFn<T>
}

export default class VgTable<T> extends React.Component<VgTableProps<T>> {

  public normalizeColumns(): VgColumn<T>[] {
    const {columns, rows} = this.props
    if (!rows || rows.length === 0) { return [] }
    else if (!columns) {
      return Object.keys(rows[0]).map(key => ({id: key, label: key, cellFn: defaultCellFn}))
    }
    return this.props.columns.map(col => ({id: col.id, label: col.label || col.id, cellFn: col.cellFn}))
  }

  public renderHeader(cols: VgColumn<T>[]) {
    const {headerClass, headerFn, onClickHeader} = this.props
    const cells = cols.map(col => {
      return (
        <th className={headerClass ? headerClass(col) : ""} key={col.id}
          onClick={e => onClickHeader ? onClickHeader(col, e) : {}}>
          {headerFn ? headerFn(col) : col.label}
        </th>
      )
    })
    return <thead><tr>{cells}</tr></thead>
  }

  public render() {
    const cols = this.normalizeColumns()
    const {classes, header, rows, rowIdFn: rowKeyFn, onClickCell, onClickRow} = this.props

    if (rows.length === 0) {
      return (
        <table className={classes}>
          <tbody>
            <tr><td>{this.props.noRowsMessage}</td></tr>
          </tbody>
        </table>
      )
    }

    const vgRows = this.props.rows.map((item, index) => {
      const rowProps: VgRowProps<T> = {
        columns: cols, record: item, onClickCell, onClickRow
      }
      return <VgRow {...rowProps} key={rowKeyFn(item, index)} />
    })

    return (
      <table className={classes}>
        {header && this.renderHeader(cols)}
        <tbody>{vgRows}</tbody>
      </table>
    )
  }
}
