import React from 'react'

export default React.memo(function ({ cb }) {
  console.log(`RefreshButton rendered...`);
  return <button className="button-refresh-colors" onClick={cb}>&#8634;</button>
})