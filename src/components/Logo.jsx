import { Link } from "react-router-dom";

export default function Logo({ invert = false, to = "/" }) {
  return (
    <Link className={`logo${invert ? " invert" : ""}`} to={to} aria-label="Creamic Apparel home">
      <img src="/images/logo.png" alt="" width="44" height="44" />
      <b>Creamic Apparel</b>
    </Link>
  );
}