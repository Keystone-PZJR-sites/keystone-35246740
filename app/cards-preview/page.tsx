import { WorkShowcase } from '@/components/sections';
import {
  WORK_CARDS,
  WORK_HEADLINE_PARTS,
  WORK_INDUSTRIES,
} from '@/data/work-showcase';

export default function CardsPreviewPage() {
  return (
    <WorkShowcase
      headlineParts={WORK_HEADLINE_PARTS}
      industries={WORK_INDUSTRIES}
      cards={WORK_CARDS}
      staticPreview
    />
  );
}
