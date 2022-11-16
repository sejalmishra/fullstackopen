const Notification = ({ message,errorMessageType }) => {
  const  annotation =  {
  color: "green",
  background: "lightgrey",
  fontSize: 20,
  border: "3px solid green",
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
}

const  error =  {
  color: "red",
  background: "lightgrey",
  fontSize: 20,
  border: "3px solid red",
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
}

  if (message === null) {
    return null
  }

  return (
    <div style={errorMessageType === "positive" ? annotation:error }>
      {message}
    </div>
  )
}
export default Notification;