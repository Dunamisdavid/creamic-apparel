import InfoPage from "../../components/InfoPage";

const WOMEN = [
  ["S", "8", "32–34", "26–28", "35–37"],
  ["M", "10–12", "35–37", "29–31", "38–40"],
  ["L", "14", "38–40", "32–34", "41–43"],
  ["XL", "16", "41–43", "35–37", "44–46"],
  ["XXL", "18", "44–46", "38–40", "47–49"],
];

const MEN = [
  ["M", "38–40", "32–34"],
  ["L", "41–43", "35–37"],
  ["XL", "44–46", "38–40"],
  ["XXL", "47–49", "41–43"],
];

const SHOES = [
  ["37", "4", "6.5"], ["38", "5", "7.5"], ["39", "6", "8"], ["40", "6.5", "8.5"],
  ["41", "7.5", "9.5"], ["42", "8", "10"], ["43", "9", "11"], ["44", "10", "12"], ["45", "11", "13"],
];

function Table({ head, rows }) {
  return (
    <div className="tablewrap">
      <table className="info-table">
        <thead><tr>{head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r) => <tr key={r[0]}>{r.map((c, i) => <td key={i}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

export default function SizeGuide() {
  return (
    <InfoPage title="Size guide" intro="All body measurements are in inches. If you're between sizes, size up for a relaxed fit.">
      <h2>How to measure</h2>
      <ul className="dots">
        <li><b>Bust / chest:</b> around the fullest part, tape level under the arms.</li>
        <li><b>Waist:</b> around your natural waistline, the narrowest part.</li>
        <li><b>Hips:</b> around the fullest part of your hips and seat.</li>
        <li><b>Length:</b> from the top of the shoulder to where you want the hem.</li>
      </ul>
      <p>Measure over light clothing and keep the tape flat, not tight. For made-to-measure pieces, send us these numbers and we confirm before cutting.</p>

      <h2>Women's clothing</h2>
      <Table head={["Size", "UK", "Bust", "Waist", "Hips"]} rows={WOMEN} />

      <h2>Men's tops</h2>
      <Table head={["Size", "Chest", "Waist"]} rows={MEN} />

      <h2>Shoes</h2>
      <Table head={["EU", "UK", "US (men)"]} rows={SHOES} />
      <p>Sizes vary slightly between brands. If a shoe usually runs small or large, we say so on its product page.</p>
    </InfoPage>
  );
}