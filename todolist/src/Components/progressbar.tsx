import './progress.css'
const Progress = ({ size,rang }) => {
  const w = size + "%"
  return (
    <div className="progressBar">
      <div style={{width:w,backgroundColor:rang}} className="done"></div>
    </div>
  );
};

export default Progress;