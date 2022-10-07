const Header = ({ name }) => {
  return <h2>{name}</h2>;
};

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};

const Total = (props) => {
  const totalExercises = props.parts.reduce(
    (pre, cur) => pre + cur.exercises,
    0
  );
  return (
    <p>
      <b>total of {totalExercises} exercises</b>
    </p>
  );
};

const Content = (props) => {
  const { parts } = props;
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
      <Total parts={parts} />
    </div>
  );
};

const Course = (props) => {
  const { course } = props;
  // console.log(course);
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </>
  );
};

export default Course;
