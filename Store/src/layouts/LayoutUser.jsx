import { Outlet } from 'react-router-dom'

const LayoutUser = () => {
  return (
    <>
        <h1>Header user</h1>
        <hr />
        <Outlet />
    </>
  )
}
export default LayoutUser