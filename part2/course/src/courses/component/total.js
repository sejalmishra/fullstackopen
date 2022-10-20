import {useState, useEffect} from "react"

const Total = ({parts}) => {
    const [sum,setSum] = useState(0);

    useEffect(() => {
        let v = parts.reduce((a, b) => ({exercises: a.exercises+b.exercises}) );
        setSum(v.exercises)
    },[parts])
  return (
    <h2>total of {sum} exercises</h2>
  )
}
export default Total;