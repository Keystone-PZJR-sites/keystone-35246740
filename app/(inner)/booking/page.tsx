import type { Metadata } from 'next';
import {
  WorkShowcase,
  MobileWorkShowcase,
  PricingSection,
  MobilePricingSection,
  ValueProps,
  MobileValueProps,
  SocialProofSection,
  MobileSocialProof,
} from '@/components/sections';
import {
  VALUE_PROP_CARDS,
  SHARED_WORK_SHOWCASE_PROPS,
  SHARED_MOBILE_WORK_SHOWCASE_PROPS,
  SHARED_PRICING_SECTION_PROPS,
  SHARED_MOBILE_PRICING_SECTION_PROPS,
  SOCIAL_THUMBNAILS,
  MOBILE_SOCIAL_THUMBNAILS,
  SOCIAL_SLIDES,
} from '@/data';

export const metadata: Metadata = {
  title: 'Booking | Keystone',
  description: 'Schedule a booking with the Keystone team.',
};

export default function BookingPage() {
  return (
    <div className="inner-page" data-theme="custom">
      <header className="inner-page-header">
        <div className="inner-page-header-inner">
          <h1 className="inner-page-title">Booking</h1>
          <p className="inner-page-subtitle">
            Choose a time that works for you and book directly on our calendar.
          </p>
        </div>
      </header>

      <main>
        <div className="blog-content">
          <section className="blog-featured-card p-4 md:p-6">
            {/* Google Calendar Appointment Scheduling begin */}
            <iframe
              src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3_T8lGlmKlvc3lxmKivlJJ-8Thwhm2HDCZU2-Eb35alHYlXSZED_UGvoL3K2W_wxomjs3rE3UL?gv=true"
              title="Keystone booking calendar"
              style={{ border: 0 }}
              width="100%"
              height="600"
              frameBorder="0"
            />
            {/* end Google Calendar Appointment Scheduling */}
          </section>

        </div>

        <SocialProofSection
          headlineLine1="Great BUSINESSES "
          headlineLine2="deserve to be found."
          thumbnails={SOCIAL_THUMBNAILS}
          slides={SOCIAL_SLIDES}
          closeButtonSrc="/social-proof/social-proof-modal-button.svg"
        />
        <MobileSocialProof
          headlineLine1="Great BUSINESSES "
          headlineLine2="deserve to be found."
          thumbnails={MOBILE_SOCIAL_THUMBNAILS}
          slides={SOCIAL_SLIDES}
          closeButtonSrc="/social-proof/social-proof-modal-button.svg"
        />

        <WorkShowcase {...SHARED_WORK_SHOWCASE_PROPS} />
        <MobileWorkShowcase {...SHARED_MOBILE_WORK_SHOWCASE_PROPS} />

        <PricingSection {...SHARED_PRICING_SECTION_PROPS} />
        <MobilePricingSection {...SHARED_MOBILE_PRICING_SECTION_PROPS} />

        <ValueProps
          headlinePreamble="Not an agency. Not software. Something "
          headlineItalic="better"
          learnMoreLabel="Get in touch"
          getStartedLabel="Services and pricing"
          cards={VALUE_PROP_CARDS}
        />
        <MobileValueProps
          headlineLine1="Not an Agency, Not Software."
          headlineLine2="Something Better."
          cards={VALUE_PROP_CARDS}
        />
      </main>
    </div>
  );
}
