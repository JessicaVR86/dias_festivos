import { useEffect, useState } from "react";
import "../styles/App.scss";
import photo from "../images/covene-unsplash.jpg"

const regionalCode = [
  { region: "Andalucia", code: "ES-AN" },
  { region: "Aragón", code: "ES-AS" },
  { region: "Asturias", code: "ES-O" },
  { region: "Islas Baleares", code: "ES-IB" },
  { region: "Canarias", code: "ES-CN" },
  { region: "Cantabria", code: "ES-CB" },
  { region: "Castilla-La Mancha", code: "ES-CM" },
  { region: "Castilla y León", code: "ES-CL" },
  { region: "Cataluña", code: "ES-CT" },
  { region: "Comunidad Valenciana", code: "ES-VC" },
  { region: "Extremadura", code: "ES-EX" },
  { region: "Galicia", code: "ES-GA" },
  { region: "La Rioja", code: "ES-RI" },
  { region: "Madrid", code: "ES-MD" },
  { region: "Murcia", code: "ES-MC" },
  { region: "País Vasco", code: "ES-PV" },
  { region: "Ceuta", code: "ES-CE" },
  { region: "Melilla", code: "ES-ML" },
];

function App() {
  const [regions, setRegions] = useState("");
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    if (regions === "") return;

    const url = `https://openholidaysapi.org/PublicHolidays?countryIsoCode=ES&validFrom=2025-01-01&validTo=2025-12-31&languageIsoCode=ES&subdivisionCode=${regions}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setHolidays(data);
      });
  }, [regions]);

  return (
    <>
   

     <section className="page">
      <img src={photo} alt="Imagen de agenda con planning" className="image" />
         <h1>Días festívos en España</h1>


      <div>
      <h2>Conoce los días festívos en tu comunidad para este 2025. </h2>
      <form className="formbox">
        <label>Selecciona tu comunidad autónoma </label>
        <select
          id="regions"
          value={regions}
          onInput={(ev) => setRegions(ev.target.value)}
        >
          <option>-Selecciona-</option>
          {regionalCode.map((regionObj) => (
            <option key={regionObj.code} value={regionObj.code}>
              {regionObj.region}
            </option>
          ))}
        </select>
      </form>
      <article >
        <ul>
          {holidays.map((day) => {
            const [year, month, dayPart] = day.startDate.split("-");
            const formattedDate = `${dayPart}/${month}/${year} `;
            return (
              <li key={day.startDate}>
                {formattedDate} - {day.name[0].text}
              </li>
            );
          })}
        </ul>
      </article>
      </div>
      </section>
    </>
  );
}

export default App;
