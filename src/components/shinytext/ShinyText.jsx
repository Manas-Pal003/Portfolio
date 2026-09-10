import './ShinyText.css';

const ShinyText = ({ text, children, disabled = false, speed = 5, className = '' }) => {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`shiny-text ${disabled ? 'disabled' : ''} ${className}`}
      style={{ animationDuration }}
    >
      {text || children}
    </span>
  );
};

export default ShinyText;
