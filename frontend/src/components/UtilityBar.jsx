import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const UtilityBar = ({
  contentTitle,
  addLink,
  id,
  showButton = true,
  customComponent = null,
}) => {
  const showCustomComponent = () => {
    if (customComponent !== null && !showButton) {
      return customComponent()
    }
    return null
  }
  return (
    <>
      <div className='d-flex pt-3'>
        <div className='pt-4 '>
          <h4>
            <strong>{contentTitle}</strong>
          </h4>
        </div>
        <div className='ms-auto'></div>
        <div className='pt-3 pe-2 me-3'>
          {showButton && (
            <Button variant='primary' as={Link} to={addLink}>
              <i className='bi bi-plus-lg fs-4' />
            </Button>
          )}
          {showCustomComponent()}
        </div>
      </div>
    </>
  )
}

export default UtilityBar
