//import bigLogo from "../assets/big-logo.png";
import wordCloud from "../../assets/word-cloud.png";
import volunteeringImage1 from "../../assets/volunteering1.jpg";
import volunteeringImage2 from "../../assets/group-people-hands.jpg";
import styles from "./style.module.css";

import { NavLink } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <img src={wordCloud} alt="Banner" className={styles.bannerImage}></img>
      <div className={styles.section}>
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
          <button className="animated">
            <NavLink to="/activities" role="navigation">
              Pridružite se volontiranju!
              <i className="bx bxs-chevrons-right"></i>
            </NavLink>
          </button>
        </div>
        <img
          src={volunteeringImage1}
          alt="Volonteri"
          className={styles.homepageImage}
        ></img>
      </div>

      <div className={styles.parallaxImage}>
        <div>
          <p>
            Volonteri diljem Hrvatske redovito sudjeluju u edukacijskim i
            ekološkim akcijama!
          </p>
          <button className="animated">
            <NavLink to="/volunteers" role="navigation">
              Prijavite se i Vi! <i className="bx bxs-chevrons-right"></i>
            </NavLink>
          </button>
        </div>
      </div>

      <div className={styles.section}>
        <img
          src={volunteeringImage2}
          alt="Udruge"
          className={styles.homepageImageLeft}
        ></img>
        <div className={styles.righthandText}>
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
          <button className="animated">
            <NavLink to="/associations" role="navigation">
              Otkrijte udruge!
              <i className="bx bxs-chevrons-right"></i>
            </NavLink>
          </button>
        </div>
      </div>
    </>
  );
}
