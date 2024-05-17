//import bigLogo from "../assets/big-logo.png";
import wordCloud from "../assets/word-cloud.png";
import volunteeringImage1 from "../assets/volunteering1.jpg";

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
    </>
  );
}
