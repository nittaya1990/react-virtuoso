import * as React from 'react'
import { Virtuoso } from '../src'
import { useState } from 'react'

export default function App() {
  const [totalCount, setTotalCount] = useState(1000)
  return (
    <div>
      <button onClick={() => setTotalCount(totalCount === 1000 ? 0 : 1000)}>Toggle</button>
      <Virtuoso
        computeItemKey={(key) => `item-${key}`}
        components={{
          EmptyPlaceholder: () => <div>Nothing to See here!</div>,
        }}
        totalCount={totalCount}
        itemContent={(index) => <div style={{ height: 30 }}>Item {index}</div>}
        style={{ height: 300 }}
      />
    </div>
  )
}
