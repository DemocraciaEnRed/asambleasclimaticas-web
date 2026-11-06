'use client'
import { useState } from 'react'
import { ResourceList } from './bits'

const TYPES = ['report', 'press', 'video', 'social', 'gallery']

export default function Library({ t, items, cities }) {
  const [assembly, setAssembly] = useState('all')
  const [type, setType] = useState('all')
  const shown = items.filter((r) => (assembly === 'all' || r.assembly === assembly) && (type === 'all' || r.type === type))
  const L = t.libraryPage

  const Group = ({ label, value, set, options }) => (
    <fieldset className="filter">
      <legend className="caps">{label}</legend>
      {[['all', L.all], ...options].map(([v, name]) => (
        <button key={v} type="button" aria-pressed={value === v} onClick={() => set(v)}>{name}</button>
      ))}
    </fieldset>
  )

  return (
    <>
      <div className="filters">
        <Group label={L.filterAssembly} value={assembly} set={setAssembly} options={[...Object.entries(cities), ['red', L.network]]} />
        <Group label={L.filterType} value={type} set={setType} options={TYPES.map((k) => [k, L.types[k]])} />
      </div>
      <p className="lib-count num" aria-live="polite">({shown.length})</p>
      {shown.length ? <ResourceList t={t} items={shown} showAssembly cities={cities} /> : <p className="empty">{L.empty}</p>}
    </>
  )
}
