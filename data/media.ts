// ============================================================
// Central media registry
// ============================================================
// Single source of truth for every static asset under /public/media.
// Assets are organized on disk by *function* (what the asset is), not by
// the page that uses it, so the same file can be referenced from anywhere.
// Code never hardcodes an asset path — it references an entry here. To move
// or rename an asset, change the path in one place.
//
// The only assets NOT catalogued here are the ones that cannot import TS:
//   - Fonts (loaded via @font-face in design-system/tokens/fonts.css)
//   - Favicons / og-image / web manifest (referenced from app metadata and
//     kept at the public root for tooling conventions)
// ============================================================

// ── Descriptor types ─────────────────────────────────────────────────────────

/** A single raster/vector image. */
export interface MediaImage {
  src: string;
  width?: number;
  height?: number;
  alt?: string;
}

/** A responsive image with a srcSet + sizes (fixed intrinsic box). */
export interface MediaImageSet {
  src: string;
  srcSet: string;
  sizes: string;
  width: number;
  height: number;
}

/** A looping clip with webm + mp4 sources and a responsive poster stem
 *  (the consumer appends `-{width}w.webp`). */
export interface VideoClip {
  webm: string;
  mp4: string;
  poster: string;
}

/** A device-split testimonial clip with explicit posters. */
export interface ResponsiveVideo {
  desktop: { webm: string; mp4: string };
  mobile: { webm: string; mp4: string };
  desktopPoster: string;
  mobilePoster: string;
}

/** A showcase card image pair (default + focused states). */
export interface CardVisual {
  defaultSrc: string;
  focusedSrc: string;
  width: number;
  height: number;
}

// ── Base directories ─────────────────────────────────────────────────────────

const HERO = '/media/hero';
const CH = '/media/channels';
const FOOT = '/media/footer';
const SP = '/media/social-proof';
const SHOW = '/media/showcase-cards';
const PROD = '/media/product-screens';
const VP = '/media/value-props';
const HIW = '/media/how-it-works-icons';
const LC = '/media/lead-capture';
const PRICE = '/media/pricing';
const BRAND = '/media/brand';
const TEAM = '/media/team';
const CAREERS = '/media/careers';
const INVESTORS = '/media/investors';
const BIZ = '/media/businesses';
const SCN = '/media/scenes';

// ── Builders ─────────────────────────────────────────────────────────────────

const heroClip = (n: number, device: 'desktop' | 'mobile'): VideoClip => ({
  webm: `${HERO}/hero-0${n}-${device}.webm`,
  mp4: `${HERO}/hero-0${n}-${device}.mp4`,
  poster: `${HERO}/posters/hero-0${n}`,
});

const channelClip = (n: number, device: 'desktop' | 'mobile'): VideoClip => ({
  webm: `${CH}/everychannel-0${n}-${device}.webm`,
  mp4: `${CH}/everychannel-0${n}-${device}.mp4`,
  poster: `${CH}/posters/everychannel-0${n}`,
});

const footerClip = (name: string, device: 'desktop' | 'mobile'): VideoClip => ({
  webm: `${FOOT}/footer-video-${name}-${device}.webm`,
  mp4: `${FOOT}/footer-video-${name}-${device}.mp4`,
  poster: `${FOOT}/posters/footer-${name}`,
});

const socialVideo = (n: number): ResponsiveVideo => ({
  desktop: { webm: `${SP}/videos/socialproof-0${n}-desktop.webm`, mp4: `${SP}/videos/socialproof-0${n}-desktop.mp4` },
  mobile: { webm: `${SP}/videos/socialproof-0${n}-mobile.webm`, mp4: `${SP}/videos/socialproof-0${n}-mobile.mp4` },
  desktopPoster: `${SP}/videos/socialproof-0${n}-desktop-poster.webp`,
  mobilePoster: `${SP}/videos/socialproof-0${n}-mobile-poster.webp`,
});

const card = (stem: string, width: number, height: number): CardVisual => ({
  defaultSrc: `${SHOW}/${stem}-card-default.webp`,
  focusedSrc: `${SHOW}/${stem}-card-focused.webp`,
  width,
  height,
});

// Showcase card intrinsic sizes are uniform per card type.
const DIM = {
  web: [1684, 1133],
  sales: [586, 1239],
  ads: [555, 1153],
  social: [567, 823],
  content: [613, 1131],
  listings: [567, 1054],
  webMobile: [613, 1131],
} as const;

// ── Registry ─────────────────────────────────────────────────────────────────

export const MEDIA = {
  // Homepage hero auto-loop clips (6, device-split).
  heroClips: {
    desktop: [1, 2, 3, 4, 5, 6].map((n) => heroClip(n, 'desktop')),
    mobile: [1, 2, 3, 4, 5, 6].map((n) => heroClip(n, 'mobile')),
  },

  // "Every channel" product clips (4, device-split).
  channelClips: {
    desktop: [1, 2, 3, 4].map((n) => channelClip(n, 'desktop')),
    mobile: [1, 2, 3, 4].map((n) => channelClip(n, 'mobile')),
  },

  // Footer industry b-roll clips (5, device-split), keyed A–E.
  footerClips: {
    desktop: {
      videoA: footerClip('pet', 'desktop'),
      videoB: footerClip('truck', 'desktop'),
      videoC: footerClip('cafe', 'desktop'),
      videoD: footerClip('phonecall', 'desktop'),
      videoE: footerClip('barber', 'desktop'),
    },
    mobile: {
      videoA: footerClip('pet', 'mobile'),
      videoB: footerClip('truck', 'mobile'),
      videoC: footerClip('cafe', 'mobile'),
      videoD: footerClip('phonecall', 'mobile'),
      videoE: footerClip('barber', 'mobile'),
    },
  },

  // Social-proof testimonial videos (6) + corner thumbnails (desktop + mobile).
  socialProof: {
    videos: [1, 2, 3, 4, 5, 6].map(socialVideo),
    markerCross: { src: `${SP}/social-proof-marker-cross.svg` },
    markerDiamond: { src: `${SP}/social-proof-marker-diamond.svg` },
    modalButton: { src: `${SP}/social-proof-modal-button.svg` },
    thumbsDesktop: {
      t01: { src: `${SP}/thumbnails/socialproof-thumb-01-desktop-764w.webp`, srcSet: `${SP}/thumbnails/socialproof-thumb-01-desktop-250w.webp 250w, ${SP}/thumbnails/socialproof-thumb-01-desktop-500w.webp 500w, ${SP}/thumbnails/socialproof-thumb-01-desktop-764w.webp 764w`, sizes: '27vw', width: 382, height: 215 },
      t02: { src: `${SP}/thumbnails/socialproof-thumb-02-desktop-556w.webp`, srcSet: `${SP}/thumbnails/socialproof-thumb-02-desktop-250w.webp 250w, ${SP}/thumbnails/socialproof-thumb-02-desktop-500w.webp 500w, ${SP}/thumbnails/socialproof-thumb-02-desktop-556w.webp 556w`, sizes: '20vw', width: 278, height: 156 },
      t03: { src: `${SP}/thumbnails/socialproof-thumb-03-desktop-356w.webp`, srcSet: `${SP}/thumbnails/socialproof-thumb-03-desktop-250w.webp 250w, ${SP}/thumbnails/socialproof-thumb-03-desktop-356w.webp 356w`, sizes: '13vw', width: 178, height: 100 },
      t04: { src: `${SP}/thumbnails/socialproof-thumb-04-desktop-550w.webp`, srcSet: `${SP}/thumbnails/socialproof-thumb-04-desktop-250w.webp 250w, ${SP}/thumbnails/socialproof-thumb-04-desktop-500w.webp 500w, ${SP}/thumbnails/socialproof-thumb-04-desktop-550w.webp 550w`, sizes: '20vw', width: 275, height: 214 },
      t05: { src: `${SP}/thumbnails/socialproof-thumb-05-desktop-762w.webp`, srcSet: `${SP}/thumbnails/socialproof-thumb-05-desktop-250w.webp 250w, ${SP}/thumbnails/socialproof-thumb-05-desktop-500w.webp 500w, ${SP}/thumbnails/socialproof-thumb-05-desktop-762w.webp 762w`, sizes: '27vw', width: 381, height: 268 },
      t06: { src: `${SP}/thumbnails/socialproof-thumb-06-desktop-356w.webp`, srcSet: `${SP}/thumbnails/socialproof-thumb-06-desktop-250w.webp 250w, ${SP}/thumbnails/socialproof-thumb-06-desktop-356w.webp 356w`, sizes: '13vw', width: 178, height: 100 },
    } satisfies Record<string, MediaImageSet>,
    thumbsMobile: {
      m01: { src: `${SP}/thumbnails/socialproof-thumb-01-mobile-400w.webp`, srcSet: `${SP}/thumbnails/socialproof-thumb-01-mobile-250w.webp 250w, ${SP}/thumbnails/socialproof-thumb-01-mobile-400w.webp 400w`, sizes: '51vw', width: 200, height: 112 },
      m02: { src: `${SP}/thumbnails/socialproof-thumb-02-mobile-288w.webp`, srcSet: `${SP}/thumbnails/socialproof-thumb-02-mobile-250w.webp 250w, ${SP}/thumbnails/socialproof-thumb-02-mobile-288w.webp 288w`, sizes: '37vw', width: 144, height: 96 },
      m03: { src: `${SP}/thumbnails/socialproof-thumb-03-mobile-336w.webp`, srcSet: `${SP}/thumbnails/socialproof-thumb-03-mobile-250w.webp 250w, ${SP}/thumbnails/socialproof-thumb-03-mobile-336w.webp 336w`, sizes: '43vw', width: 168, height: 87 },
      m04: { src: `${SP}/thumbnails/socialproof-thumb-04-mobile-224w.webp`, srcSet: `${SP}/thumbnails/socialproof-thumb-04-mobile-224w.webp 224w`, sizes: '29vw', width: 112, height: 64 },
      m05: { src: `${SP}/thumbnails/socialproof-thumb-05-mobile-228w.webp`, srcSet: `${SP}/thumbnails/socialproof-thumb-05-mobile-228w.webp 228w`, sizes: '29vw', width: 114, height: 64 },
      m06: { src: `${SP}/thumbnails/socialproof-thumb-06-mobile-432w.webp`, srcSet: `${SP}/thumbnails/socialproof-thumb-06-mobile-250w.webp 250w, ${SP}/thumbnails/socialproof-thumb-06-mobile-432w.webp 432w`, sizes: '47vw', width: 184, height: 129 },
    } satisfies Record<string, MediaImageSet>,
    // Full-quality first frames of the testimonial videos (1600×900). Source of
    // truth for the floating thumbnails above and reusable as static scenery.
    stills: {
      s01: { src: `${SP}/stills/socialproof-01.webp`, width: 1600, height: 900, alt: 'A mechanic working under a car on a lift' },
      s02: { src: `${SP}/stills/socialproof-02.webp`, width: 1600, height: 900, alt: 'A business owner on the phone at her laptop' },
      s03: { src: `${SP}/stills/socialproof-03.webp`, width: 1600, height: 900, alt: 'A creator reviewing content in a studio' },
      s04: { src: `${SP}/stills/socialproof-04.webp`, width: 1600, height: 900, alt: 'A baker working a wood-fired oven' },
      s05: { src: `${SP}/stills/socialproof-05.webp`, width: 1600, height: 900, alt: 'A focused business owner at work' },
      s06: { src: `${SP}/stills/socialproof-06.webp`, width: 1600, height: 900, alt: 'An esthetician giving a facial treatment' },
    } satisfies Record<string, MediaImage>,
  },

  // Story / atmosphere stills (first frames of the homepage hero, "every
  // channel", and footer b-roll, at full quality). Landscape webp, named by
  // what the still shows. A static scenery pool for inner pages.
  scenes: {
    cafeCounter: { src: `${SCN}/cafe-counter.webp`, width: 1600, height: 998, alt: 'A cafe owner at the counter by the window' },
    storefrontStreet: { src: `${SCN}/storefront-street.webp`, width: 1600, height: 998, alt: 'A storefront on a city street' },
    storefrontWindow: { src: `${SCN}/storefront-window.webp`, width: 1600, height: 998, alt: 'A boutique storefront window' },
    counterConsult: { src: `${SCN}/counter-consult.webp`, width: 1600, height: 998, alt: 'Owners reviewing work at a shop counter' },
    shopfrontDoor: { src: `${SCN}/shopfront-door.webp`, width: 1600, height: 998, alt: 'A shopfront entrance framed by plants' },
    closedSign: { src: `${SCN}/closed-sign.webp`, width: 1600, height: 998, alt: 'A hand-lettered Closed sign in a shop window' },
    bikeShop: { src: `${SCN}/bike-shop.webp`, width: 1600, height: 900, alt: 'Mechanics servicing a bike in a bike shop' },
    florist: { src: `${SCN}/florist.webp`, width: 1600, height: 900, alt: 'A florist arranging a bouquet' },
    bikeService: { src: `${SCN}/bike-service.webp`, width: 1600, height: 900, alt: 'A mechanic servicing a bicycle' },
    workshopTable: { src: `${SCN}/workshop-table.webp`, width: 1600, height: 900, alt: 'A maker working at a studio table' },
    barbershop: { src: `${SCN}/barbershop.webp`, width: 1024, height: 576, alt: 'A barber with a client in the chair' },
    cornerStore: { src: `${SCN}/corner-store.webp`, width: 1024, height: 576, alt: 'An owner behind the counter of a corner store' },
    petGroom: { src: `${SCN}/pet-groom.webp`, width: 1024, height: 576, alt: 'A dog at a pet grooming studio' },
    ownerCall: { src: `${SCN}/owner-call.webp`, width: 1024, height: 428, alt: 'A business owner taking a call by the window' },
    deliveryVan: { src: `${SCN}/delivery-van.webp`, width: 1024, height: 576, alt: 'A driver making a delivery' },
  } satisfies Record<string, MediaImage>,

  // Team member studio portraits (square, ~800px). Used for people-tile and
  // avatar slots across careers / our-story / leadership.
  team: {
    rahulJaswa: { src: `${TEAM}/rahul-jaswa.jpg`, width: 800, height: 800, alt: 'Rahul Jaswa, Founder & CEO' },
    amanjotSingh: { src: `${TEAM}/amanjot-singh.jpg`, width: 800, height: 800, alt: 'Amanjot Singh, Head of Engineering' },
    sreenivasanAc: { src: `${TEAM}/sreenivasan-ac.jpg`, width: 800, height: 800, alt: 'Sreenivasan AC, Founding AI Engineer' },
    pawanKumar: { src: `${TEAM}/pawan-kumar.jpg`, width: 800, height: 800, alt: 'Pawan Kumar, Backend Engineer' },
    gauravLabhane: { src: `${TEAM}/gaurav-labhane.jpg`, width: 800, height: 800, alt: 'Gaurav Labhane, Senior Software Development Engineer' },
    gauravGrover: { src: `${TEAM}/gaurav-grover.jpg`, width: 800, height: 800, alt: 'Gaurav Grover, Lead Software Engineer' },
    manikyaSingh: { src: `${TEAM}/manikya-singh.jpg`, width: 800, height: 800, alt: 'Manikya Singh, Founding Engineer' },
    aasawariVaidya: { src: `${TEAM}/aasawari-vaidya.jpg`, width: 800, height: 800, alt: 'Aasawari Vaidya, Strategy & Operations Lead' },
    ishttarthaPujar: { src: `${TEAM}/ishttartha-pujar.jpg`, width: 800, height: 800, alt: 'Ishttartha Pujar, Growth Partner' },
    atleyKasky: { src: `${TEAM}/atley-kasky.jpg`, width: 800, height: 800, alt: 'Atley Kasky, Brand & Design Lead' },
  } satisfies Record<string, MediaImage>,

  // Careers hero collage scenes (square, ~800px) — one per team/department.
  careers: {
    engineering: { src: `${CAREERS}/engineering.jpg`, width: 800, height: 800, alt: 'Engineers collaborating at a whiteboard' },
    sales: { src: `${CAREERS}/sales.jpg`, width: 800, height: 800, alt: 'Sales team reviewing growth charts' },
    design: { src: `${CAREERS}/design.jpg`, width: 800, height: 800, alt: 'Designers reviewing wireframes together' },
    fde: { src: `${CAREERS}/fde.jpg`, width: 800, height: 800, alt: 'Team working through a problem at a whiteboard' },
  } satisfies Record<string, MediaImage>,

  // Investor / backer studio portraits (square, ~800px). Keyed by person.
  investors: {
    nickTippman: { src: `${INVESTORS}/nick-tippman.jpg`, width: 800, height: 800, alt: 'Nick Tippman' },
    adeyemiAjao: { src: `${INVESTORS}/adeyemi-ajao.jpg`, width: 800, height: 800, alt: 'Adeyemi Ajao' },
    carolineBroder: { src: `${INVESTORS}/caroline-broder.jpg`, width: 800, height: 800, alt: 'Caroline Broder' },
    praveenRamineni: { src: `${INVESTORS}/praveen-ramineni.jpg`, width: 800, height: 800, alt: 'Praveen Ramineni' },
    ilyaFushman: { src: `${INVESTORS}/ilya-fushman.jpg`, width: 800, height: 800, alt: 'Ilya Fushman' },
    rexhiDollaku: { src: `${INVESTORS}/rexhi-dollaku.jpg`, width: 800, height: 800, alt: 'Rexhi Dollaku' },
    tedGill: { src: `${INVESTORS}/ted-gill.jpg`, width: 800, height: 800, alt: 'Ted Gill' },
    johnGleeson: { src: `${INVESTORS}/john-gleeson.jpg`, width: 800, height: 800, alt: 'John Gleeson' },
    thomasBuley: { src: `${INVESTORS}/thomas-buley.jpg`, width: 800, height: 800, alt: 'Thomas Buley' },
    sujayJaswa: { src: `${INVESTORS}/sujay-jaswa.jpg`, width: 800, height: 800, alt: 'Sujay Jaswa' },
    tanujThapliyal: { src: `${INVESTORS}/tanuj-thapliyal.jpg`, width: 800, height: 800, alt: 'Tanuj Thapliyal' },
    colinEvans: { src: `${INVESTORS}/colin-evans.jpg`, width: 800, height: 800, alt: 'Colin Evans' },
    oliviaBenjamin: { src: `${INVESTORS}/olivia-benjamin.jpg`, width: 800, height: 800, alt: 'Olivia Benjamin' },
    chenliWang: { src: `${INVESTORS}/chenli-wang.jpg`, width: 800, height: 800, alt: 'Chenli Wang' },
    shoaibMakani: { src: `${INVESTORS}/shoaib-makani.jpg`, width: 800, height: 800, alt: 'Shoaib Makani' },
    obaidKhan: { src: `${INVESTORS}/obaid-khan.jpg`, width: 800, height: 800, alt: 'Obaid Khan' },
    danGill: { src: `${INVESTORS}/dan-gill.jpg`, width: 800, height: 800, alt: 'Dan Gill' },
    jaiRanganathan: { src: `${INVESTORS}/jai-ranganathan.jpg`, width: 800, height: 800, alt: 'Jai Ranganathan' },
    anthonySaleh: { src: `${INVESTORS}/anthony-saleh.jpg`, width: 800, height: 800, alt: 'Anthony Saleh' },
    zachGoldstein: { src: `${INVESTORS}/zach-goldstein.jpg`, width: 800, height: 800, alt: 'Zach Goldstein' },
    sivaGurumurthy: { src: `${INVESTORS}/siva-gurumurthy.jpg`, width: 800, height: 800, alt: 'Siva Gurumurthy' },
    someshDash: { src: `${INVESTORS}/somesh-dash.jpg`, width: 800, height: 800, alt: 'Somesh Dash' },
  } satisfies Record<string, MediaImage>,

  // Local-business lifestyle photography (landscape, ~2000px wide webp). Used
  // for split-hero and bento "business owner at work" slots across the service
  // pages. Named by what the photo shows, not by the page that uses it.
  businesses: {
    barber: { src: `${BIZ}/barber.webp`, width: 2000, height: 1333, alt: 'A barber giving a client a haircut' },
    bikeTireRepair: { src: `${BIZ}/bike-tire-repair.webp`, width: 2000, height: 1333, alt: 'A mechanic repairing a bicycle tire' },
    bikeRepair: { src: `${BIZ}/bike-repair.webp`, width: 2000, height: 1333, alt: 'A mechanic servicing a bicycle' },
    autoRepair: { src: `${BIZ}/auto-repair.webp`, width: 2000, height: 1333, alt: 'A mechanic repairing a car' },
    coffeeShop: { src: `${BIZ}/coffee-shop.webp`, width: 2000, height: 1335, alt: 'A barista brewing coffee at a café' },
    espressoBar: { src: `${BIZ}/espresso-bar.webp`, width: 2000, height: 1333, alt: 'A barista pulling a shot of espresso' },
    woodworking: { src: `${BIZ}/woodworking.webp`, width: 2000, height: 1333, alt: 'A craftsman cutting wood on a bench saw' },
    nailSalon: { src: `${BIZ}/nail-salon.webp`, width: 2000, height: 1531, alt: 'A nail technician working with a client' },
    shipping: { src: `${BIZ}/shipping.webp`, width: 2000, height: 1090, alt: 'A small-business owner packing a shipment' },
    retailLaptop: { src: `${BIZ}/retail-laptop.webp`, width: 2000, height: 1334, alt: 'A retail owner working on a laptop at the counter' },
    pilatesStudio: { src: `${BIZ}/pilates-studio.webp`, width: 2000, height: 1055, alt: 'An instructor leading a pilates class' },
    furnitureShowroom: { src: `${BIZ}/furniture-showroom.webp`, width: 2000, height: 1333, alt: 'A salesperson helping customers in a furniture showroom' },
    furnitureMaker: { src: `${BIZ}/furniture-maker.webp`, width: 2000, height: 1333, alt: 'A woodworker crafting furniture by hand' },
    dogGrooming: { src: `${BIZ}/dog-grooming.webp`, width: 2000, height: 1333, alt: 'A groomer washing a dog' },
    shopOwner: { src: `${BIZ}/shop-owner.webp`, width: 2000, height: 1335, alt: 'A shop owner managing her business on a laptop' },
    artistStudio: { src: `${BIZ}/artist-studio.webp`, width: 2000, height: 1333, alt: 'An artist painting in her studio' },
    hairSalon: { src: `${BIZ}/hair-salon.webp`, width: 2000, height: 1335, alt: "A stylist washing a client's hair" },
  } satisfies Record<string, MediaImage>,

  // App product screenshots (reused on the homepage + service pages).
  productScreens: {
    web: { src: `${PROD}/screen-web.jpg` },
    leads: { src: `${PROD}/screen-leads.jpg` },
    ads: { src: `${PROD}/screen-ads.jpg` },
    social: { src: `${PROD}/screen-social.jpg` },
    sales: { src: `${PROD}/screen-sales.jpg` },
    reviews: { src: `${PROD}/screen-reviews.jpg` },
    content: { src: `${PROD}/screen-content.jpg` },
  } satisfies Record<string, MediaImage>,

  // Value-prop card images.
  valueProps: {
    expertise: { src: `${VP}/01-expertise.png` },
    quality: { src: `${VP}/02-quality.png` },
    experience: { src: `${VP}/03-experience.png` },
  } satisfies Record<string, MediaImage>,

  // Work-showcase industry demo cards, keyed by `${industry}-${type}`.
  showcaseCards: {
    'health-web': card('health-web', ...DIM.web),
    'health-sales': card('health-sales', ...DIM.sales),
    'health-ads': card('health-ads', ...DIM.ads),
    'health-social': card('health-social', ...DIM.social),
    'health-content': card('health-content', ...DIM.content),
    'food-ads': card('food-ads', ...DIM.ads),
    'food-social': card('food-social', ...DIM.social),
    'food-web': card('food-web', ...DIM.web),
    'food-listings': card('food-listings', ...DIM.listings),
    'food-web-mobile': card('food-web-mobile', ...DIM.webMobile),
    'home-listings': card('home-listings', ...DIM.listings),
    'home-web': card('home-web', ...DIM.web),
    'home-ads': card('home-ads', ...DIM.ads),
    'home-social': card('home-social', ...DIM.social),
    'home-sales': card('home-sales', ...DIM.sales),
    'retail-content': card('retail-content', ...DIM.content),
    'retail-web': card('retail-web', ...DIM.web),
    'retail-listings': card('retail-listings', ...DIM.listings),
    'retail-ads': card('retail-ads', ...DIM.ads),
    'retail-social': card('retail-social', ...DIM.social),
    'care-social': card('care-social', ...DIM.social),
    'care-sales': card('care-sales', ...DIM.sales),
    'care-web': card('care-web', ...DIM.web),
    'care-ads': card('care-ads', ...DIM.ads),
    'care-listings': card('care-listings', ...DIM.listings),
  } satisfies Record<string, CardVisual>,

  // Legacy "how it works" step icons (kept catalogued; not in active use).
  howItWorksIcons: {
    ads: { src: `${HIW}/ads.png` },
    businessInfo: { src: `${HIW}/business-info.png` },
    contacts: { src: `${HIW}/contacts.png` },
    content: { src: `${HIW}/content.png` },
    frontDesk: { src: `${HIW}/front-desk.png` },
    reviews: { src: `${HIW}/reviews.png` },
    social: { src: `${HIW}/social.png` },
    web: { src: `${HIW}/web.png` },
    workstream: { src: `${HIW}/workstream.png` },
  } satisfies Record<string, MediaImage>,

  // Brand marks (the in-code wordmark is inline SVG; these are source files).
  brand: {
    logo: { src: `${BRAND}/keystoneLogo.svg` },
    wordmark: { src: `${BRAND}/keystoneWordmark.svg` },
    wordmarkAlt: { src: `${BRAND}/keystone-wordmark.svg` },
  } satisfies Record<string, MediaImage>,

  // Standalone UI chrome glyphs.
  ui: {
    leadCaptureCtaArrow: { src: `${LC}/lead-capture-cta-arrow.svg` },
    leadCaptureCaretDown: { src: `${LC}/lead-capture-caret-down.svg` },
    leadCaptureCardBg: { src: `${LC}/lead-capture-card-bg.svg` },
    footerCtaArrow: { src: `${FOOT}/footer-cta-arrow.svg` },
    footerWordmark: { src: `${FOOT}/footer-wordmark.svg` },
    pricingAddonIcon: { src: `${PRICE}/pricing-addon-icon.svg` },
  } satisfies Record<string, MediaImage>,
} as const;
