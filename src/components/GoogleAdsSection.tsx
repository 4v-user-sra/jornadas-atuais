import type { GoogleAd, KeywordRow } from '../types';

export function SerpAds({ ads }: { ads: GoogleAd[] }) {
  return (
    <div className="serp">
      {ads.map((a, idx) => (
        <div className="ad" key={idx}>
          <small>
            <b>Patrocinado</b>
            {a.u}
          </small>
          <div className="h">{a.h}</div>
          <div className="d">{a.d}</div>
          <div className="why">⚠ {a.why}</div>
        </div>
      ))}
    </div>
  );
}

export function KeywordTable({ keywords }: { keywords: KeywordRow[] }) {
  if (!keywords.length) return null;
  return (
    <div className="tw">
      <table className="kw-table">
        <thead>
          <tr>
            <th>Palavra-chave</th>
            <th>Corresp.</th>
            <th className="n">Custo</th>
            <th className="n">Conv.</th>
            <th className="n">CPA</th>
          </tr>
        </thead>
        <tbody>
          {keywords.map((r, idx) => (
            <tr key={idx}>
              <td>{r[0]}</td>
              <td>{r[1]}</td>
              <td className="n">{r[2]}</td>
              <td className="n">{r[3]}</td>
              <td className="n">{r[4]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
