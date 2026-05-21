import { Suspense } from 'react'
import Menu from './Menu'

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Menu />
    </Suspense>
  )
}
