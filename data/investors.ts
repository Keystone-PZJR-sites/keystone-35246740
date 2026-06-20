// Shared investor roster — the prominent operators and investors backing
// Keystone. Rendered by the BackerGrid investor gallery on both the careers
// ("In good company") and leadership ("Backed by") pages, so the wall is
// identical across the two. Portraits live in the central media registry.
//
// `firm` is intentionally omitted for now (portrait + name only); add it here
// when the affiliations are confirmed and every tile will pick it up.

import type { Backer } from '@/design-system';
import { MEDIA } from '@/data/media';

// Alphabetical by name.
export const INVESTORS: Backer[] = [
  { id: 'inv-adeyemi-ajao', name: 'Adeyemi Ajao', image: MEDIA.investors.adeyemiAjao.src },
  { id: 'inv-anthony-saleh', name: 'Anthony Saleh', image: MEDIA.investors.anthonySaleh.src },
  { id: 'inv-caroline-broder', name: 'Caroline Broder', image: MEDIA.investors.carolineBroder.src },
  { id: 'inv-chenli-wang', name: 'Chenli Wang', image: MEDIA.investors.chenliWang.src },
  { id: 'inv-colin-evans', name: 'Colin Evans', image: MEDIA.investors.colinEvans.src },
  { id: 'inv-dan-gill', name: 'Dan Gill', image: MEDIA.investors.danGill.src },
  { id: 'inv-ilya-fushman', name: 'Ilya Fushman', image: MEDIA.investors.ilyaFushman.src },
  { id: 'inv-jai-ranganathan', name: 'Jai Ranganathan', image: MEDIA.investors.jaiRanganathan.src },
  { id: 'inv-john-gleeson', name: 'John Gleeson', image: MEDIA.investors.johnGleeson.src },
  { id: 'inv-nick-tippman', name: 'Nick Tippman', image: MEDIA.investors.nickTippman.src },
  { id: 'inv-obaid-khan', name: 'Obaid Khan', image: MEDIA.investors.obaidKhan.src },
  { id: 'inv-olivia-benjamin', name: 'Olivia Benjamin', image: MEDIA.investors.oliviaBenjamin.src },
  { id: 'inv-praveen-ramineni', name: 'Praveen Ramineni', image: MEDIA.investors.praveenRamineni.src },
  { id: 'inv-rexhi-dollaku', name: 'Rexhi Dollaku', image: MEDIA.investors.rexhiDollaku.src },
  { id: 'inv-shoaib-makani', name: 'Shoaib Makani', image: MEDIA.investors.shoaibMakani.src },
  { id: 'inv-siva-gurumurthy', name: 'Siva Gurumurthy', image: MEDIA.investors.sivaGurumurthy.src },
  { id: 'inv-somesh-dash', name: 'Somesh Dash', image: MEDIA.investors.someshDash.src },
  { id: 'inv-sujay-jaswa', name: 'Sujay Jaswa', image: MEDIA.investors.sujayJaswa.src },
  { id: 'inv-tanuj-thapliyal', name: 'Tanuj Thapliyal', image: MEDIA.investors.tanujThapliyal.src },
  { id: 'inv-ted-gill', name: 'Ted Gill', image: MEDIA.investors.tedGill.src },
  { id: 'inv-thomas-buley', name: 'Thomas Buley', image: MEDIA.investors.thomasBuley.src },
  { id: 'inv-zach-goldstein', name: 'Zach Goldstein', image: MEDIA.investors.zachGoldstein.src },
];
