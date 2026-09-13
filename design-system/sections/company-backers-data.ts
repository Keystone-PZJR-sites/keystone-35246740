/** The investor roster: portrait + name only — firms are omitted by
 * design, kept intact from the v1 archive. Assets live in the media
 * registry under INVESTOR_PORTRAITS. */

import { INVESTOR_PORTRAITS, type MediaAsset } from "../media";

export interface Backer {
  id: string;
  name: string;
  portrait: MediaAsset;
}

function backer(id: string, name: string): Backer {
  return { id, name, portrait: INVESTOR_PORTRAITS[id] };
}

export const COMPANY_INVESTORS: Backer[] = [
  backer("adeyemi-ajao", "Adeyemi Ajao"),
  backer("anthony-saleh", "Anthony Saleh"),
  backer("caroline-broder", "Caroline Broder"),
  backer("chenli-wang", "Chenli Wang"),
  backer("colin-evans", "Colin Evans"),
  backer("dan-gill", "Dan Gill"),
  backer("ilya-fushman", "Ilya Fushman"),
  backer("jai-ranganathan", "Jai Ranganathan"),
  backer("john-gleeson", "John Gleeson"),
  backer("nick-tippman", "Nick Tippman"),
  backer("obaid-khan", "Obaid Khan"),
  backer("olivia-benjamin", "Olivia Benjamin"),
  backer("praveen-ramineni", "Praveen Ramineni"),
  backer("rexhi-dollaku", "Rexhi Dollaku"),
  backer("shoaib-makani", "Shoaib Makani"),
  backer("siva-gurumurthy", "Siva Gurumurthy"),
  backer("somesh-dash", "Somesh Dash"),
  backer("sujay-jaswa", "Sujay Jaswa"),
  backer("tanuj-thapliyal", "Tanuj Thapliyal"),
  backer("ted-gill", "Ted Gill"),
  backer("thomas-buley", "Thomas Buley"),
  backer("zach-goldstein", "Zach Goldstein"),
];
