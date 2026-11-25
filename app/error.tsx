"use client";

import { Button } from "@keystonepzjr/marketing-design-system/button";
import { Frame } from "@/site/frame";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <Frame
      title="Something went wrong"
      description="This page hit an error. Trying again usually fixes it."
      action={
        <Button variant="ink" onClick={reset}>
          Try again
        </Button>
      }
    />
  );
}
