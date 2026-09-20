import { wa } from "../utils";

export default function Visit() {
  return (
    <section>
      <div className="wrap split">
        <div id="styling">
          <h2>Style consultation</h2>
          <p>Not sure what suits the occasion? Tell us the event, your budget and your size, and we'll put together a look from the store or our own line.</p>
          <a className="btn solid" target="_blank" rel="noopener"
             href={wa("Hello Creamic Apparel, I'd like styling help.\nOccasion:\nBudget:\nSize:")}>
            Ask for styling help
          </a>
        </div>
        <div id="visit">
          <h2>Visit the store</h2>
          <address>
            Block H2F, Shop 414, Turai Yar'adua Block<br />
            Wuye Ultra Modern Market, Abuja<br />
            <a href="tel:+2349137897889">+234 913 789 7889</a>
          </address>
          <div className="map">
            <iframe title="Map to Wuye Ultra Modern Market" loading="lazy"
                    src="https://www.google.com/maps?q=Wuye+Ultra+Modern+Market+Abuja&output=embed" />
          </div>
        </div>
      </div>
    </section>
  );
}