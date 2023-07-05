import { useDark } from '../../context/DarkContext';
import './style.css';

// BOTÓN NOCHE Y DÍA
export default function Toggle() {
  const [dark, setDark] = useDark();
  console.log(dark);
  return (
    <div onClick={setDark} className={`toggle ${dark}`}>
      <div className="notch" id="notch">
        <div className="crater" id="crater1" />
        <div className="crater" id="crater2" />
      </div>
      <div>
        <div className="shape sm" id="shapesm1" />
        <div className="shape sm" id="shapesm2" />
        <div className="shape md" id="shapemd" />
        <div className="shape lg" id="shapelg" />
      </div>
    </div>
  );
}
