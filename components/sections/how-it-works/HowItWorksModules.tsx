import { HowItWorksPill } from './HowItWorksPill';
import { HowItWorksModuleCarousel } from './HowItWorksModuleCarousel';
import type { HowItWorksModule } from '@/data/how-it-works';

interface HowItWorksModulesProps {
  id: string;
  modules: HowItWorksModule[];
}

export function HowItWorksModules({ id, modules }: HowItWorksModulesProps) {
  return (
    <section id={id} className="hiw-modules-section" aria-labelledby="hiw-modules-title">
      <div className="hiw-modules-heading-wrap">
        <p className="hiw-modules-kicker">How it Works</p>
        <h2 id="hiw-modules-title" className="hiw-modules-title">
          Full-Service Digital Marketing & Sales
        </h2>
      </div>

      <div className="hiw-module-rows">
        {modules.map((module, index) => (
          <article
            key={module.id}
            className="hiw-module-row"
            data-layout={index % 2 === 0 ? 'copy-left' : 'copy-right'}
          >
            <div className="hiw-module-copy-col">
              <HowItWorksPill
                label={module.label}
                bg={module.pillBg}
                text={module.pillText}
              />
              <h3 className="hiw-module-title">{module.shortDescription}</h3>
              <p className="hiw-module-supporting-copy">{module.supportingText}</p>
            </div>

            <div className="hiw-module-media-col">
              <HowItWorksModuleCarousel
                moduleId={module.id}
                moduleLabel={module.label}
                items={module.media}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
