import { useEffect, useRef, useState } from 'react';
import { OverviewView } from './components/OverviewView';
import { ProjectView } from './components/ProjectView';
import { PROJECTS } from './data/projects';

function parseHash(rawHash: string) {
  const h = rawHash.replace(/^#/, '');
  const isGoogle = /-google$/.test(h);
  const id = h.replace(/-google$/, '');
  const project = PROJECTS.find((x) => x.id === id) || null;
  return { project, isGoogle };
}

export default function App() {
  const [hash, setHash] = useState<string>(() => window.location.hash);
  const navScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onHashChange = () => {
      setHash(window.location.hash);
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const { project, isGoogle } = parseHash(hash);
  const activeHref = `#${project ? project.id : 'visao-geral'}`;

  useEffect(() => {
    const container = navScrollRef.current;
    if (!container) return;
    const activeLink = container.querySelector<HTMLAnchorElement>(`a[href="${activeHref}"]`);
    if (activeLink) {
      activeLink.scrollIntoView({ block: 'nearest', inline: 'center' });
    }
  }, [activeHref]);

  return (
    <>
      <nav className="nav" aria-label="Projetos">
        <div className="scroll" ref={navScrollRef}>
          <a
            href="#visao-geral"
            aria-current={activeHref === '#visao-geral' ? 'page' : undefined}
          >
            Todos os projetos
          </a>
          {PROJECTS.map((p) => {
            const href = `#${p.id}`;
            return (
              <a
                key={p.id}
                href={href}
                aria-current={activeHref === href ? 'page' : undefined}
              >
                {p.n}
              </a>
            );
          })}
        </div>
      </nav>

      <main id="app">
        {project ? (
          <ProjectView project={project} isGoogle={isGoogle} />
        ) : (
          <OverviewView projects={PROJECTS} />
        )}
      </main>

      <footer className="band">
        <div className="wrap">
          Jornadas montadas a partir do Gerenciador de Anúncios da Meta, do Google Ads, da Biblioteca de Anúncios e dos notebooks de cada cliente · 09/10 a 23/11/2026 · thumbnails capturadas dos anúncios reais.
        </div>
      </footer>
    </>
  );
}
