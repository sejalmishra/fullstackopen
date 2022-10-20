import Header from "./component/Header";
import Content from "./component/Contents/Content";
import Total from "./component/total"

function Course({course}) {
   
  return (
    <>
    <Header course={course.name}></Header>
    <Content parts={course.parts}></Content>
    <Total parts={course.parts}/>
    </>
);
}

export default Course;
