import { NavLink } from 'react-router-dom'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import { FaBalanceScale } from 'react-icons/fa'
import { BiMoneyWithdraw } from 'react-icons/bi'

function Nav() {
  const fill = (active) => (active ? '-fill' : '')

  return (
    <div
      className='p2 flex-column flex-shrink-0 bg-dark-blue'
      style={{ width: '4.5rem' }}
    >
      <ul className='nav nav-pills nav-flush flex-column text-center nav-underline fs-4'>
        <li className='nav-item'>
          <OverlayTrigger
            placement='right'
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip id='home-tooltip'>{'Home'}</Tooltip>}
          >
            <NavLink className='nav-link py-3' to='/'>
              {({ isActive }) => (
                <i className={'bi bi-house' + fill(isActive)} />
              )}
            </NavLink>
          </OverlayTrigger>
        </li>
        <li className='nav-item'>
          <OverlayTrigger
            placement='right'
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip id='drinks-tooltip'>{'Employees'}</Tooltip>}
          >
            <NavLink
              className='nav-link py-3'
              aria-current='page'
              to='/employees'
            >
              {({ isActive }) => (
                <i className={'bi bi-person-vcard' + fill(isActive)} />
              )}
            </NavLink>
          </OverlayTrigger>
        </li>
        <li className='nav-item'>
          <OverlayTrigger
            placement='right'
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip id='orders-tooltip'>{'Payroll'}</Tooltip>}
          >
            <NavLink
              className='nav-link py-3'
              aria-current='page'
              to='/payroll'
            >
              <i className='bi bi-wallet-fill'></i>
            </NavLink>
          </OverlayTrigger>
        </li>
        <li className='nav-item'>
          <OverlayTrigger
            placement='right'
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip id='customers-tooltip'>{'Customers'}</Tooltip>}
          >
            <NavLink
              className='nav-link py-3'
              aria-current='page'
              to='/customers'
            >
              {({ isActive }) => (
                <i className={'bi bi-people' + fill(isActive)} />
              )}
            </NavLink>
          </OverlayTrigger>
        </li>
        <li className='nav-item'>
          <OverlayTrigger
            placement='right'
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip id='customers-tooltip'>{'Vendors'}</Tooltip>}
          >
            <NavLink
              className='nav-link py-3'
              aria-current='page'
              to='/vendors'
            >
              <i className='bi bi-shop' />
            </NavLink>
          </OverlayTrigger>
        </li>
        <li className='nav-item'>
          <OverlayTrigger
            placement='right'
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip id='customers-tooltip'>{'Inventory'}</Tooltip>}
          >
            <NavLink
              className='nav-link py-3'
              aria-current='page'
              to='/inventory'
            >
              <i className='bi bi-boxes' />
            </NavLink>
          </OverlayTrigger>
        </li>
        <li className='nav-item'>
          <OverlayTrigger
            placement='right'
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip id='customers-tooltip'>{'Invoice'}</Tooltip>}
          >
            <NavLink
              className='nav-link py-3'
              aria-current='page'
              to='/invoices'
            >
              <i className='bi bi-receipt' />
            </NavLink>
          </OverlayTrigger>
        </li>
        <li className='nav-item'>
          <OverlayTrigger
            placement='right'
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip id='customers-tooltip'>{'PO'}</Tooltip>}
          >
            <NavLink className='nav-link py-3' aria-current='page' to='/po'>
              <i className='bi bi-bag' />
            </NavLink>
          </OverlayTrigger>
        </li>
        <li className='nav-item'>
          <OverlayTrigger
            placement='right'
            delay={{ show: 250, hide: 400 }}
            overlay={
              <Tooltip id='customers-tooltip'>{'Balance Sheet'}</Tooltip>
            }
          >
            <NavLink
              className='nav-link py-3'
              aria-current='page'
              to='/balance-sheet'
            >
              {({ isActive }) => (
                <FaBalanceScale className={'bi' + fill(isActive)} />
              )}
            </NavLink>
          </OverlayTrigger>
        </li>
        <li className='nav-item'>
          <OverlayTrigger
            placement='right'
            delay={{ show: 250, hide: 400 }}
            overlay={
              <Tooltip id='customers-tooltip'>{'Income Statement'}</Tooltip>
            }
          >
            <NavLink
              className='nav-link py-3'
              aria-current='page'
              to='/income-statement'
            >
              <BiMoneyWithdraw className='bi' />
            </NavLink>
          </OverlayTrigger>
        </li>
      </ul>
    </div>
  )
}

export default Nav
