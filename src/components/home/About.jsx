import { useState } from 'react';
import { siteConfig } from '../../config/site';
import { siteContent } from '../../config/content';
import Badge from '../ui/Badge';
import Container from '../ui/Container';

const AVATAR_SIZES = [160, 320, 480];
const avatarUrl = (size) =>
  `https://github.com/${siteConfig.githubUsername}.png?size=${size}`;

export default function About() {
  const [avatarFailed, setAvatarFailed] = useState(false);

  return (
    <section className="py-12" aria-labelledby="sobre">
      <Container className="grid items-start gap-8 md:grid-cols-[auto_1fr]">
        {!avatarFailed && (
          // O GitHub redimensiona o avatar no servidor (?size=): o celular baixa a versão
          // pequena. width/height reservam o espaço e loading="lazy" adia o download.
          <img
            src={avatarUrl(AVATAR_SIZES[1])}
            srcSet={AVATAR_SIZES.map((size) => `${avatarUrl(size)} ${size}w`).join(', ')}
            sizes="160px"
            width="160"
            height="160"
            loading="lazy"
            decoding="async"
            alt={`Foto de ${siteConfig.ownerName}`}
            onError={() => setAvatarFailed(true)}
            className="border-line h-40 w-40 rounded-2xl border object-cover"
          />
        )}
        <div>
          <h2 id="sobre" className="font-display text-3xl">
            {siteContent.aboutTitle}
          </h2>
          <div className="text-muted mt-4 max-w-2xl space-y-3">
            {siteContent.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tecnologias">
            {siteContent.skills.map((skill) => (
              <li key={skill}>
                <Badge tone="accent">{skill}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
