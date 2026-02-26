const ITEMS = [
  'CAREER FAIR SEASON 2025',
  'SUBMIT YOUR RESUME TODAY',
  'CHAT WITH RECRUITERS LIVE',
  'NEW COMPANIES JOINING DAILY',
];

export default function Ticker() {
  const doubled = [...ITEMS, ...ITEMS]; // duplicate for seamless loop

  return (
    <div className="ticker">
      <div className="ticker-track">
        {doubled.map((text, i) => (
          <span key={i} className="ticker-item">
            <span className="t-dot" />
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
