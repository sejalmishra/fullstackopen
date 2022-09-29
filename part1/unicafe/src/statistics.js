import StatisticsLine from "./statisticLine";

function Statistics({ good, bad, neutral }) {
  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={good + bad + neutral} />
        <StatisticsLine
          text="average"
          value={(good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad)}
        />
        <StatisticsLine
          text="positive"
          value={(good / (good + neutral + bad)) * 100 + "%"}
        />
      </tbody>
    </table>
  );
}

export default Statistics;
