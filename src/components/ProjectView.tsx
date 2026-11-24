import type { Project } from '../types';
import { CadenceFlow } from './CadenceFlow';
import { CreativeGrid } from './CreativeGrid';
import { KeywordTable, SerpAds } from './GoogleAdsSection';
import { GoogleAdsLogo, MetaLogo } from './Icons';
import { JourneyBoard } from './JourneyBoard';

function CurrentLegend() {
  return (
    <div className="legend">
      <span>
        <i className="st s-ok" />
        Saudável
      </span>
      <span>
        <i className="st s-warn" />
        Ajustar
      </span>
      <span>
        <i className="st s-bad" />
        Crítico
      </span>
      <span>Linhas brancas: para onde cada campanha leva o lead até a retenção</span>
    </div>
  );
}

function ProposedLegend() {
  return (
    <div className="legend">
      <span className="tag t-NOVO">NOVO</span>
      <span className="tag t-AJUSTE">AJUSTE</span>
      <span className="tag t-MANTER">MANTER</span>
      <span className="tag t-PAUSAR">PAUSAR</span>
      <span>🎯 = criativo e mensagem propostos</span>
    </div>
  );
}

export function ProjectView({ project, isGoogle }: { project: Project; isGoogle: boolean }) {
  const data = isGoogle ? project.goog : project.meta;
  const platform = isGoogle ? 'g' : 'm';

  return (
    <section className="band">
      <div className="wrap">
        <h1>{project.n}</h1>
        <p className="lede">{project.seg}</p>
        <div className="persona">
          <b>Persona-alvo</b>
          <span>{project.per}</span>
        </div>

        <nav className="tabs" aria-label="Plataforma">
          <a href={`#${project.id}`} aria-current={!isGoogle ? 'page' : undefined}>
            <span className="plat" style={{ width: '26px', height: '26px', border: 0, background: 'none' }}>
              <MetaLogo />
            </span>
            Meta Ads
          </a>
          <a href={`#${project.id}-google`} aria-current={isGoogle ? 'page' : undefined}>
            <span className="plat" style={{ width: '26px', height: '26px', border: 0, background: 'none' }}>
              <GoogleAdsLogo />
            </span>
            Google Ads
          </a>
        </nav>

        <div className="sec">
          <div className="hd">
            <h2>Jornada atual</h2>
            <span className="sub">{data.sum}</span>
          </div>
          <JourneyBoard lanes={data.lanes} ret={data.ret} platform={platform} proposed={false} />
          <CurrentLegend />
          {data.note ? <div className="note">{data.note}</div> : null}
        </div>

        {!isGoogle && project.meta.cr.length > 0 ? (
          <div className="sec">
            <div className="hd">
              <h2>Criativos que estão captando</h2>
              <span className="sub">Texto, visual e para quem cada um fala</span>
            </div>
            <CreativeGrid creatives={project.meta.cr} />
          </div>
        ) : null}

        {isGoogle && project.goog.ads.length > 0 ? (
          <div className="sec">
            <div className="hd">
              <h2>O que os anúncios dizem</h2>
              <span className="sub">Anúncios de pesquisa no ar e a leitura de cada um</span>
            </div>
            <SerpAds ads={project.goog.ads} />
          </div>
        ) : null}

        {isGoogle && project.goog.kw.length > 0 ? (
          <div className="sec">
            <div className="hd">
              <h2>Palavras-chave que puxam a verba</h2>
            </div>
            <KeywordTable keywords={project.goog.kw} />
          </div>
        ) : null}

        <div className="sec">
          <div className="hd">
            <h2>Jornada proposta</h2>
            <span className="sub">O que muda em cada raia</span>
          </div>
          <JourneyBoard lanes={data.nl} ret={data.nret} platform={platform} proposed={true} />
          <ProposedLegend />
        </div>

        {!isGoogle && project.meta.cad ? (
          <div className="sec">
            <div className="hd">
              <h2>Cadência de follow-up proposta</h2>
              <span className="sub">Do primeiro contato à venda, no modelo do squad</span>
            </div>
            <CadenceFlow cadence={project.meta.cad} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
