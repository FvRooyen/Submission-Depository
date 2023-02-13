import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification.show === false) {
    return null
  }

  if(notification.type === 0) {
    return (
      <div className='container'>
        <Alert variant='success'>
          {notification.message}
        </Alert>
      </div>
    )}

  if (notification.type === 1){
    return (
      <div className='container'>
        <Alert variant='danger'>
        {notification.message}
        </Alert>
      </div>)
  }
}

export default Notification