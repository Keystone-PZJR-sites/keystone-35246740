"use client";

import { Chip } from "@keystonepzjr/marketing-design-system/chip";
import { Frame } from "@/site/frame";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <Frame
      title="Something went wrong"
      description="This page hit an error. Trying again usually fixes it."
      action={
        <Chip variant="ink" onClick={reset}>
          Try again
        </Chip>
      }
    />
  );
}
