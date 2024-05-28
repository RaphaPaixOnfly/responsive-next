const getBarColor = (value) => {
    if (value >= 70) return '#4caf50'; // Verde
    if (value >= 40) return '#ffeb3b'; // Amarelo
    return '#f44336'; // Vermelho
  };
  
  const HorizontalBar = ({ percentage }) => {
    return (
      <div className="barContainer">
        <div
          className="bar"
          style={{ width: `${percentage}%`, backgroundColor: getBarColor(percentage) }}
        ></div>
        <div className="label" style={{ color: getBarColor(percentage) }}>{percentage}</div>
      </div>
    );
  };
  
  export default HorizontalBar;
  