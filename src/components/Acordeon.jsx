import './Acordeon.css';

function Acordeon({ content }) {
  return (
    <div className={`acordeon ${content ? 'show' : 'hide'}`}>
      {content && (
        <div className="acordeon-body">
          <p>{content.pre}</p>

          {content.sections.map((section, i) => (
            <div key={i}>
              <h3>{section.title}</h3>
              <p>{section.text}</p>
            </div>
          ))}

          <p>{content.post}</p>
          <div className="pyramid-loader">
            <div className="wrapper">
              <span className="side side1"></span>
              <span className="side side2"></span>
              <span className="side side3"></span>
              <span className="side side4"></span>
              <span className="shadow"></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Acordeon;
