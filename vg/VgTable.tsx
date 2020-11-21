import * as React from "react"
import { VgColumn, VgRecord } from "vg"
import VgRow, { VgRowProps } from "vg/VgRow"

export const defaultCellFn = (item: VgRecord, field: string) => item[field]

export interface VgTableProps {
  columns?: VgColumn[], rows: VgRecord[]
  header?: boolean, headerClass?: (className: string, key: string) => string
  noRowsMessage?: string, classPrefix?: string
  cellRenderer?: (item: VgRecord, key: string) => React.Component
  rowKeyFn: (item: VgRecord, idx: number) => string
  onClickRow?: (e: any, row: VgRecord) => void
  onClickHeader?: (e: any, key: string) => void
  onClickCell?: (e: any, key: string, item: VgRecord) => void
}

export default class VgTable extends React.Component<VgTableProps> {

  public normalizeColumns(): VgColumn[] {
    const cellFn = this.props.cellRenderer || defaultCellFn
    const {columns, rows} = this.props
    if (!columns && rows && rows.length > 0) {
      return Object.keys(rows[0]).map(key => ({
        key, label: key, cell: cellFn
      }))
    }
    return this.props.columns.map(col => ({
      key: col.key, label: col.label || col.key,
      cell: cellFn
    }))
  }

  public renderHeader(cols: VgColumn[]) {
    const { classPrefix, headerClass, onClickHeader } = this.props
    const cells = cols.map(col => {
      let className = `${classPrefix}Column`
      if (headerClass) {
        className = headerClass(className, col.key)
      }
      return (
        <th className={className} key={col.key}
          onClick={e => onClickHeader ? onClickHeader(e, col.key) : {}}>
          {col.label}
        </th>
      )
    })
    return <thead><tr className={`${classPrefix}Header`}>{cells}</tr></thead>
  }

  public render() {
    const cols = this.normalizeColumns()
    const tableClass = `${this.props.classPrefix}Table`
    const {header, rows, rowKeyFn, onClickCell, onClickRow} = this.props

    if (rows.length === 0) {
      return <tbody><tr><td>{this.props.noRowsMessage}</td></tr></tbody>
    }

    const vgRows = this.props.rows.map((item, index) => {
      const rowProps: VgRowProps = {columns: cols, item, index, onClickCell, onClickRow}
      return <VgRow {...rowProps} key={rowKeyFn(item, index)} />
    })

    return (
      <table className={tableClass}>
        {header && this.renderHeader(cols)}
        <tbody>
          {vgRows}
        </tbody>
      </table>
    )
  }
}
