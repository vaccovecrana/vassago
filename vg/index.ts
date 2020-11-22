export interface VgColumn<T> {
  id: string, label?: string, cellFn: RowCellFn<T>
}

export type RowIdFn<T>    = (record: T, index: number) => string
export type RowClassFn<T> = (record: T) => string
export type RowClickFn<T> = (record: T, event: any) => void

export type RowHeaderFn<T>      = (column: VgColumn<T>) => React.JSX.Element
export type RowHeaderClassFn<T> = (column: VgColumn<T>) => string
export type RowHeaderClickFn<T> = (column: VgColumn<T>, event: any) => void

export type RowCellFn<T>      = (record: T, column: VgColumn<T>) => React.JSX.Element
export type RowCellClassFn<T> = (record: T, column: VgColumn<T>) => string
export type RowCellClickFn<T> = (record: T, column: VgColumn<T>, event: any) => void

export const defaultCellFn: RowCellFn<any> = (record, column) => record[column.id]

export { default as VgTable } from "vg/VgTable"
export { default as VgRow } from "vg/VgRow"
