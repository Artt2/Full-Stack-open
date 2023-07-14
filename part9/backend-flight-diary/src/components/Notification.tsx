const Notification = ({ message }: {message: string}) => {
  if (message === "") {
    return null;
  }

  return (
    <div 
      style={{ backgroundColor: 'red', padding: '10px', color: 'white' }}
    >
      {message}
    </div>
  )
};

export default Notification;