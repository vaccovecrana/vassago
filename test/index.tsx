import * as React from "react"
import * as ReactDOM from "react-dom"
import { VgColumn } from "vg"

import VgTable from "vg/VgTable"

enum Color { red = "red", blue = "blue", yellow = "yellow" }
interface Person { name: string, age: number, color: Color }
const people: Person[] = [
  { name: "Louise", age: 27, color: Color.red },
  { name: "Margaret", age: 15, color: Color.blue },
  { name: "Lisa", age: 34, color: Color.yellow }
]

const json = (v: any) => JSON.stringify(v, null, 2)

const customCols: VgColumn<Person>[] = [
  {id: "name", label: "Name", cellFn: (p) => <span>{p.name}</span>},
  {id: "color", label: "Color", cellFn: (p) => <div style={{backgroundColor: p.color}}>{p.color}</div>}
]

interface TestShellState {
  sortFn: (p0: Person, p1: Person) => number
}

class TestShell extends React.Component<{}, TestShellState> {

  constructor() {
    super()
    this.state = {sortFn: undefined}
  }

  private sortBy(col: VgColumn<Person>) {
    this.setState({
      sortFn: (p0, p1) => (p0 as any)[col.id].toString().localeCompare((p1 as any)[col.id].toString())
    })
  }

  public render() {
    const {sortFn} = this.state
    const items = sortFn ? people.sort(sortFn) : people
    return (
      <div>
        <div className="card m8">
          <div className="card-body">
            <VgTable classes="table"
              header headerFn={col => <div>{col.label.toUpperCase()}</div>}
              rows={items} rowKeyFn={p => p.name}
              onClickHeader={(col, e) => console.log(`Clicked header on: ${json(col)}`)}
              onClickRow={(rec, e) => console.log(`Clicked row: ${json(rec)}`)}
              onClickCell={(rec, col, e) => console.log(`Clicked cell => ${json({ rec, col })}`)}
            />
          </div>
        </div>
        <div className="card m8">
          <div className="card-body">
            <VgTable classes="table interactive"
              header rows={items} rowKeyFn={p => p.name} columns={customCols}
              onClickHeader={(col) => this.sortBy(col)}
            />
          </div>
        </div>
        <div className="card m8">
          <div className="card-body">
            <VgTable classes="table" rows={[]} rowKeyFn={undefined} noRowsMessage="Nothing here?" />
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<TestShell />, document.body)
