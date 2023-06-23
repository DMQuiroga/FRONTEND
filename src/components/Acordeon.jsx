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
        </div>
      )}
    </div>
  );
}

export default Acordeon;
