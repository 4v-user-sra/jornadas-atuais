import { getImageUrl } from '../data/projects';
import type { Project } from '../types';

export function OverviewView({ projects }: { projects: Project[] }) {
  return (
    <section className="band">
      <div className="wrap">
        <h1>Jornada do lead por projeto e plataforma</h1>
        <p className="lede">
          Cada projeto mostra a estrutura atual de Meta e Google em raias (Aquisição → Engajamento → Monetização → Retenção), os criativos reais que captam o lead e a jornada proposta com a cadência de follow-up.
        </p>
        <div className="sec ov">
          {projects.map((p) => {
            const imgs = (p.meta.cr || []).slice(0, 4);
            return (
              <a className="pc" href={`#${p.id}`} key={p.id}>
                <h3>{p.n}</h3>
                <p>{p.seg}</p>
                {imgs.length > 0 ? (
                  <div className="mos">
                    {imgs.map((c) => (
                      <img key={c.img} src={getImageUrl(c.img)} alt="" loading="lazy" />
                    ))}
                  </div>
                ) : null}
                <div className="pls">
                  <span>Meta: {p.meta.sum.split('·')[0]}</span>
                  <span>Google: {p.goog.sum.split('·')[0]}</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
