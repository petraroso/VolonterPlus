//import bigLogo from "../assets/big-logo.png";
import wordCloud from "../assets/word-cloud.png";
import volunteeringImage1 from "../assets/volunteering1.jpg";
import volunteeringImage2 from "../assets/group-people-hands.jpg";

import { NavLink } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <img src={wordCloud} alt="Banner" className="banner-image"></img>
      <div className="section">
        <div>
          <h1>Naš cilj</h1>
          <p>
            VolonterPlus je organizacija koja strastveno potiče ljude da pronađu
            svoj put u volontiranju. Naš glavni cilj je potaknuti ljude da se
            aktivno uključe u zajednicu kroz volontiranje i stvaranje
            volonterskih udruga. Kroz različite projekte i programe, pružamo
            resurse, obuku i podršku pojedincima i grupama koji žele doprinijeti
            dobrobiti zajednice. Naša misija je stvoriti inspirativno okruženje
            gdje svatko može pronaći svoj način da doprinese društvenim
            promjenama i izgradi bolje sutra.
          </p>
          <NavLink to="/activities">
            Pridružite se volontiranju!{" "}
            <i className="bx bxs-chevrons-right"></i>
          </NavLink>
        </div>
        <img
          src={volunteeringImage1}
          alt="Volonteri"
          className="homepage-image"
        ></img>
      </div>

      <div className="parallax-image">
        <div>
          <p>
            Volonteri diljem Hrvatske redovito sudjeluju u edukacijskim i
            ekološkim akcijama!
          </p>
          <NavLink to="/volunteers">
            Prijavite se i Vi! <i className="bx bxs-chevrons-right"></i>
          </NavLink>
        </div>
      </div>

      <div className="section">
        <img
          src={volunteeringImage2}
          alt="Udruge"
          className="homepage-image-left"
        ></img>
        <div className="righthand-text">
          <h1>Brojne udruge</h1>
          <p>
            VolonterPlus okuplja raznolike udruge koje dijele našu strast prema
            volontiranju i zajedničkom djelovanju za dobrobit društva. Svaka
            udruga unutar naše organizacije posvećena je specifičnom području i
            donosi jedinstvene projekte i inicijative koje obogaćuju zajednicu.
            EkoPrijatelji se bavi ekološkim projektima i zaštitom okoliša,
            organiziraju akcije čišćenja, sadnje drveća i edukativne radionice o
            održivom razvoju i reciklaži. Njihova misija je očuvati prirodu i
            educirati građane o važnosti ekološke osviještenosti.
          </p>
          <NavLink to="/associations">
            Otkrijte udruge!
            <i className="bx bxs-chevrons-right"></i>
          </NavLink>
        </div>
      </div>
    </>
  );
}
