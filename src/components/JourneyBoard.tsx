import { useCallback, useEffect, useRef, useState } from 'react';
import { getImageUrl } from '../data/projects';
import type { IconKey, Lane, Retention, StatusType } from '../types';
import { ChannelIcon, GoogleAdsLogo, MetaLogo } from './Icons';

const STATUS_NAMES: Record<StatusType, string> = {
  ok: 'Saudável',
  warn: 'Ajustar',
  bad: 'Crítico',
  neu: 'Neutro',
};

interface LinkGeometry {
  d: string;
  arrowPoints: string;
}

interface JourneyBoardProps {
  lanes: Lane[];
  ret: Retention;
  platform: 'm' | 'g';
  proposed: boolean;
}

function LaneNode({ icons, text }: { icons: IconKey[]; text: string }) {
  if (icons && icons.length > 0) {
    return (
      <div className="node">
        <div className="ic">
          {icons.map((k, idx) => (
            <ChannelIcon key={`${k}-${idx}`} icon={k} />
          ))}
        </div>
        <p>{text}</p>
      </div>
    );
  }
  return (
    <div className="node empty">
      <p style={{ opacity: 0.55 }}>{text || '—'}</p>
    </div>
  );
}

export function JourneyBoard({ lanes, ret, platform, proposed }: JourneyBoardProps) {
  const boardRef = useRef<HTMLDivElement>(null);
  const retRef = useRef<HTMLDivElement>(null);
  const laneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [links, setLinks] = useState<LinkGeometry[]>([]);

  const computeLinks = useCallback(() => {
    const boardEl = boardRef.current;
    const retEl = retRef.current;
    if (!boardEl || !retEl) return;

    if (window.innerWidth <= 980) {
      setLinks([]);
      return;
    }

    const B = boardEl.getBoundingClientRect();
    const R = retEl.getBoundingClientRect();
    const tx = R.left - B.left;
    const ty = R.top - B.top + R.height / 2;

    const nextLinks: LinkGeometry[] = [];
    lanes.forEach((l, idx) => {
      if (l.miss || l.tag === 'PAUSAR') return;
      const laneEl = laneRefs.current[idx];
      if (!laneEl) return;
      const L = laneEl.getBoundingClientRect();
      const x = L.right - B.left;
      const y = L.top - B.top + L.height / 2;
      const mx = x + (tx - x) * 0.55;
      nextLinks.push({
        d: `M${x} ${y} C ${mx} ${y}, ${mx} ${ty}, ${tx - 6} ${ty}`,
        arrowPoints: `M${tx - 7} ${ty - 4} L${tx - 1} ${ty} L${tx - 7} ${ty + 4}z`,
      });
    });

    setLinks(nextLinks);
  }, [lanes]);

  useEffect(() => {
    computeLinks();
    const t1 = window.setTimeout(computeLinks, 120);
    const t2 = window.setTimeout(computeLinks, 500);
    const ro = new ResizeObserver(() => computeLinks());
    if (boardRef.current) ro.observe(boardRef.current);
    window.addEventListener('resize', computeLinks);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      ro.disconnect();
      window.removeEventListener('resize', computeLinks);
    };
  }, [computeLinks]);

  const retClass = proposed ? 'ret new' : ret.s === 'bad' ? 'ret bad' : 'ret';

  return (
    <div className="board" ref={boardRef}>
      <div className="cols">
        <div className="cl">
          <span />
          <span>AQUISIÇÃO</span>
          <span>ENGAJAMENTO</span>
          <span>MONETIZAÇÃO</span>
        </div>
        <span>RETENÇÃO</span>
      </div>

      <div className="bwrap">
        <div className="lanes">
          {lanes.map((l, ix) => {
            const cls = l.miss ? 'lane miss' : l.tag === 'PAUSAR' ? 'lane pause' : 'lane';
            const thumbs = (l.cr || []).slice(0, 4);
            const statusKey = l.s || 'neu';
            return (
              <div
                key={`${l.n}-${ix}`}
                className={cls}
                ref={(el) => {
                  laneRefs.current[ix] = el;
                }}
              >
                {l.stop ? <span className="stop">PARADO · ERRO NO PAGAMENTO</span> : null}
                <div className="lab">
                  <small>{proposed ? `Raia ${ix + 1}` : l.t}</small>
                  <b>{l.n}</b>
                  {proposed && l.tag ? (
                    <span className={`tag t-${l.tag}`}>{l.tag}</span>
                  ) : (
                    <>
                      <span className={`st s-${statusKey}`} />
                      <small style={{ display: 'inline' }}>{STATUS_NAMES[statusKey] || ''}</small>
                    </>
                  )}
                </div>

                <div className="aq">
                  <div className="plat">{platform === 'g' ? <GoogleAdsLogo /> : <MetaLogo />}</div>
                  <div className="tx">
                    <i>{l.o}</i>
                    {l.a}
                    {l.c && l.c !== '—' ? (
                      <>
                        <br />
                        <span className="chip">{l.c}</span>
                      </>
                    ) : null}
                    {thumbs.length > 0 ? (
                      <div className="thumbs">
                        {thumbs.map((slug) => (
                          <img
                            key={slug}
                            src={getImageUrl(slug)}
                            alt=""
                            loading="lazy"
                            onLoad={computeLinks}
                          />
                        ))}
                      </div>
                    ) : null}
                    {l.crx ? <div className="crx">🎯 {l.crx}</div> : null}
                    {l.k ? <div className="kpi">{l.k}</div> : null}
                  </div>
                </div>

                <LaneNode icons={l.e} text={l.et} />
                <LaneNode icons={l.m} text={l.mt} />
              </div>
            );
          })}
        </div>

        <div className={retClass} ref={retRef}>
          <small className="rl">RETENÇÃO</small>
          <div className="node empty" style={{ gap: '8px' }}>
            <div className="ic">
              {ret.i && ret.i.length > 0 ? (
                ret.i.map((k, idx) => <ChannelIcon key={`${k}-${idx}`} icon={k} />)
              ) : (
                <span style={{ fontSize: '22px' }}>∅</span>
              )}
            </div>
          </div>
          <p>{ret.t}</p>
        </div>
      </div>

      <svg className="links" aria-hidden="true">
        {links.map((lk, idx) => (
          <g key={idx}>
            <path
              className="flow-line"
              d={lk.d}
              fill="none"
              stroke="#fff"
              strokeWidth="1.4"
              opacity=".75"
            />
            <path d={lk.arrowPoints} fill="#fff" opacity=".8" />
          </g>
        ))}
      </svg>
    </div>
  );
}
