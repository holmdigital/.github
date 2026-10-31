<p align="center">
  <img src="https://raw.githubusercontent.com/holmdigital/.github/main/profile/assets/banner.svg" width="100%" alt="Holm Digital AB. Accessibility testing in the language of the law: WCAG 2.2, EN 301 549, EAA and 17 jurisdictions.">
</p>

<p align="center">
  <a href="https://holmdigital.se"><img src="https://img.shields.io/badge/website-holmdigital.se-075985?style=flat-square" alt="Website: holmdigital.se"></a>
  <a href="https://wiki.holmdigital.se"><img src="https://img.shields.io/badge/docs-wiki.holmdigital.se-075985?style=flat-square" alt="Documentation: wiki.holmdigital.se"></a>
  <a href="https://github.com/holmdigital/a11y-hd"><img src="https://img.shields.io/badge/open%20source-a11y--hd-075985?style=flat-square" alt="Open source: a11y-hd on GitHub"></a>
</p>

We are a professional team dedicated to web accessibility and regulatory compliance. We build **[a11y-hd](https://github.com/holmdigital/a11y-hd)**, an open source ecosystem that maps **WCAG 2.1/2.2** failures to **EN 301 549**, the EAA and national accessibility law across 17 jurisdictions, bridging the gap between technical validation and legal compliance.

<!-- npm-downloads:start -->
<p align="center">
  <img src="https://raw.githubusercontent.com/holmdigital/.github/main/profile/assets/downloads.svg?v=2026-10-31" width="100%" alt="30,051 downloads on npm across all three a11y-hd packages since December 2025: engine 13,309, standards 9,786 and components 6,956. Updated 2026-10-31.">
</p>
<!-- npm-downloads:end -->

## Who we are

<table>
<tr>
<td width="50%" valign="top">

<a href="https://github.com/KarinHolmDigital"><img src="https://github.com/KarinHolmDigital.png?size=200" width="96" height="96" alt="Karin Holm on GitHub"></a>

### [Karin Holm](https://github.com/KarinHolmDigital)

**CEO, Product Owner of a11y-hd**

Karin founded Holm Digital to make the digital world accessible to everyone. As product owner, she continues to develop all three a11y-hd packages: engine, standards and components.

</td>
<td width="50%" valign="top">

<a href="https://github.com/Labontese"><img src="https://github.com/Labontese.png?size=200" width="96" height="96" alt="Daniel Gustafsson on GitHub"></a>

### [Daniel Gustafsson](https://github.com/Labontese)

**CTO, Lead Developer**

Daniel created and built a11y-hd, and is responsible for our infrastructure, security and deployment.

</td>
</tr>
</table>

## The engine

<p align="center">
  <img src="https://raw.githubusercontent.com/holmdigital/.github/main/profile/assets/engine.svg" width="100%" alt="The engine scanning holmdigital.se in a terminal with a compliance score of 100/100, next to the path one finding takes from WCAG to Swedish law. The same path is described in the text below.">
</p>

One command scans a page and maps every finding to the legal clauses behind it:

```bash
npx hd-a11y-scan https://example.com
```

In the example above, an image without alt text fails **WCAG 1.1.1 Non-text Content**. That is clause **9.1.1.1** in EN 301 549, which is covered by the EAA (Annex I) and the Web Accessibility Directive (Article 4). For a private company in Sweden, it falls under **Lag (2023:254)**, enforced by PTS.

## Packages

- **[`@holmdigital/engine`](https://www.npmjs.com/package/@holmdigital/engine)** [![npm version of @holmdigital/engine](https://img.shields.io/npm/v/@holmdigital/engine?style=flat-square&color=075985&label=npm)](https://www.npmjs.com/package/@holmdigital/engine)<br>
  Test engine for WCAG and EN 301 549, with CLI and CI reporting.
- **[`@holmdigital/standards`](https://www.npmjs.com/package/@holmdigital/standards)** [![npm version of @holmdigital/standards](https://img.shields.io/npm/v/@holmdigital/standards?style=flat-square&color=075985&label=npm)](https://www.npmjs.com/package/@holmdigital/standards)<br>
  Machine-readable regulatory database with enforcement body lookups.
- **[`@holmdigital/components`](https://www.npmjs.com/package/@holmdigital/components)** [![npm version of @holmdigital/components](https://img.shields.io/npm/v/@holmdigital/components?style=flat-square&color=075985&label=npm)](https://www.npmjs.com/package/@holmdigital/components)<br>
  Accessible React components with a built-in accessibility statement generator in 12 languages.

## Project stats

<a href="https://github.com/holmdigital/a11y-hd">
  <img src="https://github-readme-stats.vercel.app/api/pin/?username=holmdigital&repo=a11y-hd&bg_color=0f172a&title_color=7dd3fc&text_color=cbd5e1&icon_color=38bdf8&border_color=1e3a5f&border_radius=12" alt="a11y-hd repository card with description, language, stars and forks">
</a>
