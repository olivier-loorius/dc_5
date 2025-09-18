## Boys & Toys – App (Next.js)

Projet Next.js 15 avec Tailwind CSS, Shadcn UI, i18n (`next-intl`) et contenu légal en MDX. Conçu pour une DA « premium » (nav transparente, fond dégradé, typographies cohérentes).

### Objectifs

- **UI premium** homogène (`Navbar`, `SubNav`, `TopBar`, `Footer`, FAQ)
- **Pages légales** réutilisables via **MDX** (Mentions, Conditions, Confidentialité, FAQ)
- **i18n** avec `next-intl`
- **Accessibilité** (roles, focus visible, liens sûrs)
- **Tests** unitaires + **couverture** (incluant MDX)

## Prérequis

- Node.js 18+ (recommandé 20 LTS)
- npm 9+
- Windows: éviter les dossiers synchronisés (OneDrive/Desktop) pour le dev

## Installation

```bash
npm install
```

## Lancement

```bash
# Dev (Webpack forcé, Turbopack désactivé)
npm run dev

# Build / Start (prod)
npm run build
npm run start
```

Scripts utiles:

- `npm run dev`: lance le serveur de dev (Webpack forcé)
- `npm run build`: build production
- `npm run start`: serveur production
- `npm run lint`: ESLint
- `npm run test`: tests Vitest (couverture incluse)
- `npm run test:watch`: tests en watch

## Internationalisation (next-intl)

- Config: `next-intl.config.ts` et `src/i18n/request.ts`
- Messages: `src/messages/fr.json`
- Intégration plugin dans `next.config.ts`
- Les labels UI sont passés en props côté Server Components au lieu de `useTranslations` quand nécessaire

## MDX (pages légales)

- Fichiers MDX: `src/content/legal/fr/*.mdx`
- Route: `/legal/[slug]` (mapping statique dans `src/app/(public)/legal/[slug]/page.tsx`)
- Layout & composants: `src/components/legal/{LegalLayout,LegalToc,Prose}.tsx`
- Redirections conviviales (ex: `/cgu` → `/legal/conditions-utilisation`)

## Style & UI

- **Tailwind CSS** + utilitaires dans `src/app/globals.css`
  - Exemples: `footer-link`, `section-title`, `input-pill`, `faq`, `faq-q`, `faq-a`, `cta-primary`, `icon-btn`
- **Shadcn UI**: composants (Button, Card, Accordion)
  - `src/components/ui/accordion.tsx` adapté pour hériter des typos globales
- DA premium: fond `.app-bg`, nav transparente + **occulteur** `HeaderOccluder` et **shadow** `ScrollShadow`
- Actions flottantes: `QuickActions` (Paramètres, Scroll-to-top)

## Accessibilité

- `role="contentinfo"` sur le footer
- Liens externes: `target="_blank"` + `rel="noreferrer noopener"`
- Focus visible cohérent (`focus-visible:ring`)

## Tests & Couverture

- Framework: **Vitest** + **@testing-library/react**
- Configuration: `vitest.config.ts` (environnement `jsdom`, support **MDX** via `@mdx-js/rollup`)
- Lancer:

```bash
npm run test
```

- Rapport de couverture HTML: `node_modules/.cache/vitest-coverage/index.html`
- Seuils (garde-fous): lines/functions/statements 70%, branches 60%

Tests inclus (exemples):

- UI: `Navbar`, `Footer` (smoke + interactions)
- Légales: rendu des 4 pages MDX + TOC sticky + FAQ (accordéon)

## Structure (extraits)

```
src/
  app/
    (public)/
      legal/[slug]/page.tsx     # mapping MDX
    globals.css                 # utilitaires Tailwind + thème
  components/
    footer/Footer.tsx
    navbar/{Navbar,TopBar,SubNav,ScrollShadow,HeaderOccluder}.tsx
    legal/{LegalLayout,LegalToc,Prose}.tsx
    ui/accordion.tsx
    QuickActions.tsx
  content/legal/fr/
    mentions-legales.mdx
    conditions-utilisation.mdx
    confidentialite.mdx
    faq.mdx
  messages/fr.json
```

## Dépannage (Windows)

### Boucles de compilation (dev)

- Turbopack désactivé par défaut (scripts `dev`)
- Éviter les overrides Webpack dans `next.config.ts` (config minimale)

### EPERM sur `.next/trace`

- Symptômes: `EPERM: operation not permitted, open .next/trace`
- Causes probables: OneDrive/antivirus verrouillant les fichiers
- Solutions:
  - Fermer les processus Node, supprimer/renommer `.next`
  - Déplacer le projet hors Desktop/OneDrive (ex: `C:\dev\dc_5`)
  - Exclure le dossier du temps réel antivirus

## Sécurité & bonnes pratiques

- Aucune conservation de données complètes de carte
- Liens externes sécurisés
- Double opt‑in newsletter côté contenu (back à implémenter)

## Roadmap rapide

- Panneau Paramètres: langue/thème/cookies (implémentation backend cookies à définir)
- Politique Cookies dédiée (MDX) + gestionnaire de consentements
- Internationalisation additionnelle (en)

## Licence

À définir.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
