const HorizontalBar = ({ percentage }) => {
    return (
      <div className="bar-container">
        <div className="bar" style={{ width: `${percentage}%` }}></div>
      </div>
    );
  };
  
  export default HorizontalBar;
  