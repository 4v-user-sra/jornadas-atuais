export type StatusType = 'ok' | 'warn' | 'bad' | 'neu';
export type TagType = 'NOVO' | 'AJUSTE' | 'MANTER' | 'PAUSAR';

export type IconKey =
  | 'wa'
  | 'form'
  | 'grupo'
  | 'site'
  | 'menu'
  | 'insta'
  | 'maps'
  | 'crm'
  | 'pdv'
  | 'sale'
  | 'visita'
  | 'rmkt'
  | 'disparo'
  | 'bot'
  | 'phone';

export interface Lane {
  t: string;
  n: string;
  c?: string;
  o: string;
  a: string;
  cr?: string[];
  crx?: string;
  e: IconKey[];
  et: string;
  m: IconKey[];
  mt: string;
  k?: string;
  s?: StatusType;
  miss?: number | boolean;
  stop?: number | boolean;
  tag?: TagType;
}

export interface Retention {
  i: IconKey[];
  t: string;
  s?: StatusType;
}

export interface Creative {
  img: string;
  n: string;
  f: string;
  txt: string;
  vis: string;
  au: string;
  r: string;
  s: StatusType;
  v: string;
}

export interface GoogleAd {
  h: string;
  u: string;
  d: string;
  why: string;
}

export type KeywordRow = [string, string, string, string, string];

export type CadenceStep = [string, string, string, string[]];
export type CadenceFunnel = [string, string, string];

export interface Cadence {
  lead: string;
  steps: CadenceStep[];
  fun: CadenceFunnel[];
  goals: string[];
}

export interface MetaPlatformData {
  sum: string;
  lanes: Lane[];
  ret: Retention;
  cr: Creative[];
  note: string;
  nl: Lane[];
  nret: Retention;
  cad?: Cadence;
}

export interface GooglePlatformData {
  sum: string;
  lanes: Lane[];
  ret: Retention;
  ads: GoogleAd[];
  kw: KeywordRow[];
  note: string;
  nl: Lane[];
  nret: Retention;
}

export interface Project {
  id: string;
  n: string;
  seg: string;
  per: string;
  meta: MetaPlatformData;
  goog: GooglePlatformData;
}
