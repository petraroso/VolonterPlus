import LogoIcon from "../LogoIcon/LogoIcon";
import styles from "./style.module.css";

interface LogoProps {
  iconColor?: string;
  iconHeight?: string;
  textColor?: string;
  fontSize?: string;
  shadowColor?: string;
}

const Logo: React.FC<LogoProps> = ({
  iconColor = "#ff471f",
  iconHeight = "2rem",
  textColor = "#22368b",
  fontSize = "2rem",
  shadowColor = "#888",
}) => (
  <div className={styles.logoLayout}>
    <LogoIcon color={iconColor} height={iconHeight} />
    <h1
      className={styles.logoText}
      style={{
        color: textColor,
        fontSize: fontSize,
        textShadow: `0 0 5px ${shadowColor}`,
      }}
    >
      VolonterPlus
    </h1>
  </div>
);

export default Logo;
