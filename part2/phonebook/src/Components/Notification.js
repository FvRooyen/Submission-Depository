const Notification = ({notification}) => {
    if (notification.message === null) {
      return null
    } else 
        {if(notification.type === 0) {
          return (
            <div className='notification'>
              {notification.message}
            </div>
           )} else {
                return (
                 <div className='error'>
                    {notification.message}
                 </div>)
      }
    }
  }

  
  export default Notification