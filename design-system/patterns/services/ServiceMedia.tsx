import Image from 'next/image';

export interface ServiceMediaProps {
  image: string;
  alt: string;
}

/**
 * A product screenshot framed as a rounded, lightly elevated card — the visual
 * the media + feature-list section floats inside its soft panel. See spec 037.
 */
export function ServiceMedia({ image, alt }: ServiceMediaProps) {
  return (
    <div className="ks-svc-media">
      <Image
        src={image}
        alt={alt}
        width={1024}
        height={768}
        className="ks-svc-media__img"
        sizes="(min-width: 985px) 40vw, 90vw"
      />
    </div>
  );
}
