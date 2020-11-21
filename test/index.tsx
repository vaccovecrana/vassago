import * as React from "react"
import * as ReactDOM from "react-dom"
import { VgRecord } from "vg"

import VgTable from "vg/VgTable"

const items: VgRecord[] = [
  { name: 'Louise', age: 27, color: 'red' },
  { name: 'Margaret', age: 15, color: 'blue'},
  { name: 'Lisa', age:34, color: 'yellow'}
]

class TestShell extends React.Component {
  public render() {
    return (
      <VgTable header rows={items} rowKeyFn={row => row.name} />
    )
  }
}

ReactDOM.render(<TestShell />, document.body)
