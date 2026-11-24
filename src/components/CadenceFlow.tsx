import type { Cadence } from '../types';

export function CadenceFlow({ cadence }: { cadence: Cadence }) {
  return (
    <div className="cad">
      <div className="cflow">
        <div className="lead">{cadence.lead}</div>
        {cadence.steps.map((s, idx) => (
          <div className="cstep" key={`step-${idx}`}>
            <span className="otag">{s[0]}</span>
            <span className="otag">{s[1]}</span>
            <div className="bnode">{s[2]}</div>
            <div className="dirs">
              <b>Possíveis direcionamentos</b>
              <ul>
                {s[3].map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        {cadence.fun.map((f, idx) => (
          <div className="cstep" key={`fun-${idx}`}>
            <span className="otag">{f[0]}</span>
            <span className="otag" style={{ visibility: 'hidden' }}>
              .
            </span>
            <div className="bnode">{f[1]}</div>
            <div className="dirs">{f[2]}</div>
          </div>
        ))}
      </div>
      <div className="goals">
        <b>Metas iniciais</b>
        {cadence.goals.map((g, idx) => (
          <span key={idx}>{g}</span>
        ))}
      </div>
    </div>
  );
}
