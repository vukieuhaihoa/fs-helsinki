import { useState } from 'react';

const Button = (props) => {
  const { text, onClick } = props;
  return <button onClick={onClick}>{text}</button>;
};

const StaticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = (props) => {
  const { good, neutral, bad, all, average, positive } = props;
  return (
    <>
      <p>
        <b>statistics</b>
      </p>
      {all ? (
        <table>
          <tbody>
            <StaticLine text={'good'} value={good} />
            <StaticLine text={'neutral'} value={neutral} />
            <StaticLine text={'bad'} value={bad} />
            <StaticLine text={'all'} value={all} />
            <StaticLine text={'average'} value={average} />
            <StaticLine text={'positive'} value={positive} />
          </tbody>
        </table>
      ) : (
        <p>No feedback given</p>
      )}
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (good * 100) / (good + bad + neutral) + '%';
  return (
    <div>
      <h1>give feedback</h1>

      <div>
        <Button text={'good'} onClick={() => setGood(good + 1)} />
        <Button text={'neutral'} onClick={() => setNeutral(neutral + 1)} />
        <Button text={'bad'} onClick={() => setBad(bad + 1)} />
      </div>

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
