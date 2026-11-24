import type { IconKey } from '../types';

const ICON_TITLES: Record<IconKey, string> = {
  wa: 'WhatsApp',
  form: 'Formulário',
  grupo: 'Grupo VIP',
  site: 'Site/LP',
  menu: 'Cardápio',
  insta: 'Perfil IG',
  maps: 'Maps',
  crm: 'CRM',
  pdv: 'PDV',
  sale: 'Venda',
  visita: 'Agenda',
  rmkt: 'Remarketing',
  disparo: 'Disparos',
  bot: 'Bot/IA',
  phone: 'Ligação',
};

function renderIconPaths(k: IconKey) {
  switch (k) {
    case 'wa':
      return (
        <>
          <path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z" />
          <path d="M9 9.5c.3 2.2 2.3 4.2 4.5 4.5l1.2-1.2 1.8.8-.5 1.6c-3.6.4-7.5-3.5-7.1-7.1l1.6-.5.8 1.8z" />
        </>
      );
    case 'form':
      return (
        <>
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <path d="M8 8h8M8 12h8M8 16h5" />
        </>
      );
    case 'grupo':
      return (
        <>
          <circle cx="9" cy="9" r="3" />
          <circle cx="17" cy="10" r="2.4" />
          <path d="M3.5 19c.6-3 2.8-4.5 5.5-4.5s4.9 1.5 5.5 4.5M14.5 15.2c2.8-.6 5 .6 5.8 3.8" />
        </>
      );
    case 'site':
      return (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 9h18M6 7h.01M8.5 7h.01" />
        </>
      );
    case 'menu':
      return (
        <>
          <path d="M6 3h12v18H6z" />
          <path d="M9 7h6M9 11h6M9 15h4" />
          <path d="M3 6v12" />
        </>
      );
    case 'insta':
      return (
        <>
          <rect x="4" y="4" width="16" height="16" rx="5" />
          <circle cx="12" cy="12" r="3.6" />
          <path d="M16.8 7.2h.01" />
        </>
      );
    case 'maps':
      return (
        <>
          <path d="M12 21s-6-5.6-6-11a6 6 0 0 1 12 0c0 5.4-6 11-6 11z" />
          <circle cx="12" cy="10" r="2.2" />
        </>
      );
    case 'crm':
      return (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M7 14.5c-1.3 0-2-1-2-2.5s.7-2.5 2-2.5M9.5 14.5v-5h1.3a1.3 1.3 0 0 1 0 2.6H9.5l2 2.4M14 14.5v-5l1.8 3 1.8-3v5" />
        </>
      );
    case 'pdv':
      return (
        <>
          <path d="M4 10l1.5-5h13L20 10" />
          <path d="M4 10c0 1.5 1.3 2 2.7 2s2.6-.5 2.6-2c0 1.5 1.3 2 2.7 2s2.7-.5 2.7-2c0 1.5 1.2 2 2.6 2S20 11.5 20 10" />
          <path d="M5.5 12v8h13v-8M10 20v-5h4v5" />
        </>
      );
    case 'sale':
      return (
        <>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M14.8 9.2c-.5-.8-1.5-1.2-2.8-1.2-1.6 0-2.7.8-2.7 2s1.1 1.7 2.7 2 2.8.8 2.8 2-1.2 2-2.8 2c-1.3 0-2.4-.5-2.9-1.3M12 6.5v11" />
        </>
      );
    case 'visita':
      return (
        <>
          <rect x="4" y="5" width="16" height="15" rx="2" />
          <path d="M4 10h16M8 3v4M16 3v4M9 14.5l2 2 4-4" />
        </>
      );
    case 'rmkt':
      return (
        <>
          <path d="M20 12a8 8 0 0 1-14 5.3M4 12A8 8 0 0 1 18 6.7" />
          <path d="M18 3v4h-4M6 21v-4h4" />
        </>
      );
    case 'disparo':
      return (
        <>
          <path d="M4 10v4h3l7 4V6L7 10H4z" />
          <path d="M17.5 9a4 4 0 0 1 0 6M19.5 7a7 7 0 0 1 0 10" />
        </>
      );
    case 'bot':
      return (
        <>
          <rect x="5" y="8" width="14" height="11" rx="3" />
          <path d="M12 4v4M9 13h.01M15 13h.01M9.5 16.5h5" />
          <circle cx="12" cy="3.5" r=".8" />
        </>
      );
    case 'phone':
      return (
        <path d="M5 4h4l1.5 4-2.2 1.4a11 11 0 0 0 6.3 6.3L16 13.5l4 1.5v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
      );
    default:
      return null;
  }
}

export function ChannelIcon({ icon }: { icon: IconKey }) {
  return (
    <span className="icb" title={ICON_TITLES[icon] || icon}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        {renderIconPaths(icon)}
      </svg>
    </span>
  );
}

export function MetaLogo() {
  return (
    <svg viewBox="0 0 48 28" aria-label="Instagram e Facebook">
      <rect x="2" y="2" width="22" height="22" rx="6" fill="none" stroke="#fff" strokeWidth="2.4" />
      <circle cx="13" cy="13" r="5" fill="none" stroke="#fff" strokeWidth="2.4" />
      <circle cx="19" cy="7" r="1.4" fill="#fff" />
      <path
        d="M38 26V14h4l.6-4H38V7.6c0-1.2.4-2 2-2h2.7V2.2A30 30 0 0 0 39 2c-3.6 0-5.6 2.1-5.6 5.9V10H30v4h3.4v12z"
        fill="#fff"
      />
    </svg>
  );
}

export function GoogleAdsLogo() {
  return (
    <svg viewBox="0 0 28 28" aria-label="Google Ads">
      <path d="M10.5 4.5l9 15.6" stroke="#fff" strokeWidth="5.5" strokeLinecap="round" />
      <path d="M10.5 4.5L3.6 16.4" stroke="#fff" strokeWidth="5.5" strokeLinecap="round" opacity=".75" />
      <circle cx="5" cy="21.5" r="3.4" fill="#fff" />
    </svg>
  );
}
