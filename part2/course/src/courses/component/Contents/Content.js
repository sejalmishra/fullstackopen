import Part from "./part";

const Content = ({parts}) => {
  
  return (
    <div>
      {parts.map((part) => {
        return(
        <Part part={part} key={part.id}/>
        );
      })}
    </div>
  )
}
export default Content;