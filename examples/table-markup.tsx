import * as React from 'react'
import { TableVirtuoso } from '../src/'

export default function App() {
  return (
    <>
      <TableVirtuoso
        totalCount={1000}
        components={{
          EmptyPlaceholder: () => {
            return (
              <tbody>
                <tr>
                  <td>Empty</td>
                </tr>
              </tbody>
            )
          },
        }}
        style={{ height: 700 }}
        fixedHeaderContent={() => {
          return (
            <tr style={{ background: 'white' }}>
              <th key={1} style={{ height: 20, border: '1px solid black', background: 'white' }}>
                TH 1
              </th>
              <th key={2} style={{ height: 20, border: '1px solid black', background: 'white' }}>
                TH meh
              </th>
            </tr>
          )
        }}
        itemContent={(index) => {
          return (
            <>
              <td>{index}Cell 1</td>
              <td>Cell 2</td>
            </>
          )
        }}
      />
    </>
  )
}
