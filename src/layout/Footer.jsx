import { useState } from 'react';
import './Index.css';
import Acordeon from '../components/Acordeon';

// FOOTER

// IMPORTAMOS TEXTOS TIPO JSON PARA EL FOOTER
import about from '../assets/about.json';
import contact from '../assets/contact.json';
import terms from '../assets/terms.json';

function Footer() {
  const [acordeonContent, setAcordeonContent] = useState(false);
  const [acordeonType, setAcordeonType] = useState(false);

  const openAcordeon = function (type, content) {
    if (acordeonContent && acordeonType === type) {
      setAcordeonContent(null);
      return;
    }
    setAcordeonContent(content);
    setAcordeonType(type);
  };

  return (
    <footer>
      <section className="content-footer">
        <Acordeon content={acordeonContent}></Acordeon>
        {!acordeonContent ? (
          <>
            <button
              className="animated"
              onClick={() => openAcordeon('about-us', about)}
            >
              About us 🌐
            </button>
            <button
              className="animated"
              onClick={() => openAcordeon('contact', contact)}
            >
              Contact 📞
            </button>
            <button
              className="animated"
              onClick={() => openAcordeon('t-and-c', terms)}
            >
              T&C 🛡️
            </button>
          </>
        ) : (
          <button
            className="animated"
            type="button"
            onClick={() => setAcordeonContent(null)}
          >
            CERRAR ❌
          </button>
        )}
      </section>
    </footer>
  );
}

export default Footer;
