import { getImageUrl } from '../data/projects';
import type { Creative } from '../types';

export function CreativeGrid({ creatives }: { creatives: Creative[] }) {
  return (
    <div className="crs">
      {creatives.map((c, idx) => (
        <article className="cr" key={`${c.img}-${idx}`}>
          <img
            src={getImageUrl(c.img)}
            alt={`Criativo ${c.n}`}
            loading="lazy"
          />
          <div>
            <h4>{c.n}</h4>
            <div className="f">
              {c.f} · persona: {c.au}
            </div>
            <q>{c.txt}</q>
            <p className="v">
              <b style={{ color: '#e8d6d2' }}>Visual:</b> {c.vis}
            </p>
            <div className="r">
              <span>{c.r}</span>
              <span className={`vd v-${c.s}`}>{c.v}</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
