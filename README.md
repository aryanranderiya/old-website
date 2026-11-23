> **Archived portfolio.** This is the 2025 HTML/CSS/JS portfolio, kept online
> at [old.aryanranderiya.com](https://old.aryanranderiya.com). The current site
> lives at [aryanranderiya.com](https://aryanranderiya.com).
>
> The bundle is self-contained: libraries, fonts and project media all ship in
> `docs/`, so the archive does not depend on a CDN, Firebase, or any API.

# [aryanranderiya.com](aryanranderiya.com)

- My Personal Portfolio using HTML, CSS and vanilla JavaScript
- It was one of my first javascript projects which i built to learn js and because i also needed a personal website to showcase all my projects and design work and honestly it has served me well while i freelanced
- I honestly just went all out on this website, adding all and any style of animations i could. I think i was going for a bit of a maximalism aesthetic
- I worked on this website for over 3 months (maybe a little more) because i just wasn't satisfied with how it was, and i just kept fine tuning the little things over and over until i was utterly exhausted
- Here's my contribution activity while i worked on it lol
<img width="1200" height="256" alt="Commits from aryanranderiya" src="https://github.com/user-attachments/assets/934dfe18-ebb3-4c7f-b33b-5d6d7c0c1699" />

- It is built to showcase my Software projects that aren't publicly available on my Github (like client work or super secret projects 🤫 and beautifully showcase all the Design Projects i've worked on over the years as I felt like my [behance](https://behance.net/aryanranderiya) just wasn't customised enough to cut the job.
- The site is fully responsive using pure CSS using properties such as clamps and media queries and other tidbits
- Honestly i might just sunset this soon as I don't really freelance anymore and i want to focus on my startup, so while this portfolio has served me well, i want something that showcases my skills better. So maybe i'll work on a new cleaner but shorter portfolio website soon 🤷‍♂️ (19/10/2025)

A couple decisions that i'd change if i were to make a new portfolio:
- I'd probably fetch my projects using markdown. I initially fetched all my data from firebase and since firebase is shit and the latency was insane when fetching like a few seconds so then i just switched to json temporarily instead of using a db. but if i wanted to switch? then markdown.
- I'd probably use astro with react components instead of vanilla html and js
- I'd use only tailwind, this project uses a hellish mix of both vanilla css and bcz i was learning tailwind midway, i started using it too so its a weird mix of both


## Tech Stack

Used HTML, CSS, vanilla Javascript and Firebase as Realtime Database, Cloud Storage & Web hosting. (Although i don't really use firebase for loading my projects anymore, i just use plain json)
Utilised various libraries such as Greensock animation platform (GSAP) and Tailwind.

# Screenshots
These screenshots are really old. I just can't be arsed to update them.

## Homepage

![](docs/media/projects/old-portfolio/304815490-aee4f364-4434-416b-a265-cdc3c21f458a.png)

#####

![](docs/media/projects/old-portfolio/304815557-d8f8521a-a70a-4cd8-a4ef-9320cb154029.png)

#####

![](docs/media/projects/old-portfolio/304815629-15d1b6c3-d8d6-4a7e-905a-07a941f76cf6.png)

#####

![](docs/media/projects/old-portfolio/304815662-ac666075-fb4a-4ac5-bdcf-fd774db3fc7e.png)

<br>

## Software Projects

• Fetched all Software Projects with all their information alongside a banner from the Firebase Realtime Database. <br>
• Fetched all my Repositores from Github using its API and stored them in a custom card imitating github's theme.
• Fetch the list of languages used in each repo along with its associated colour from [ozh/github-colors](https://raw.githubusercontent.com/ozh/github-colors/master/colors.json) and search for the language from the json file and apply the colour accordingly. I had to do this because Github API does not have a field for the language colour.
<br>

![](docs/media/projects/old-portfolio/304808063-b9372b80-6cb0-4ad2-957d-8925a2906d5c.png)

#####

![](docs/media/projects/old-portfolio/304808197-8f6a4391-272a-4d6d-987c-64b70b871256.png)

#####

![](docs/media/projects/old-portfolio/304808497-7d1da441-3969-4a1d-b800-bef031322051.png)

<br>

## View Project

• Fetch all projects from the database and dynamically set the content of all the elements on the page accordingly. <be>
• Check the type of the project and set the project demo accordingly.
<br>

![](docs/media/projects/old-portfolio/304813012-af9281fe-3eb2-46f6-ae1b-095b6ab09498.png)

#####

![](docs/media/projects/old-portfolio/304813094-6908cb56-95f2-4bd1-9d08-e9e5b458f491.png)

#####

![](docs/media/projects/old-portfolio/304813312-080aeaca-53f5-4c95-8ea5-e856e81abe98.png)

#####

![](docs/media/projects/old-portfolio/304813312-080aeaca-53f5-4c95-8ea5-e856e81abe98.png)

#####

![](docs/media/projects/old-portfolio/304813509-1a2502aa-103d-4375-8d6a-e1122c7c84cc.png)

<br>

## Resume

![](docs/media/projects/old-portfolio/304815810-20f915cc-cc2f-4c93-acfb-6c52c0cabd61.png)

<br>

## Contact

![](docs/media/projects/old-portfolio/304816206-f3d4bc70-edcb-4c01-adec-f209b0773c99.png)

<br>

## Menu

![](docs/media/projects/old-portfolio/304816390-05bd1f27-f3ef-4518-ad59-dfc263c96a9b.png)

<br>

## Design Projects

![](docs/media/projects/old-portfolio/designprojects_0.png)

#####

![](docs/media/projects/old-portfolio/designprojects_1.png)

#####

![](docs/media/projects/old-portfolio/designprojects_2.png)

#####

![](docs/media/projects/old-portfolio/designprojects_3.png)

#####

![](docs/media/projects/old-portfolio/designprojects_4.png)

#####

![](docs/media/projects/old-portfolio/designprojects_5.png)

#####

![](docs/media/projects/old-portfolio/designprojects_6.png)

#####

![](docs/media/projects/old-portfolio/designprojects_7.png)

#####

![](docs/media/projects/old-portfolio/designprojects_8.png)

#####

![](docs/media/projects/old-portfolio/designprojects_9.png)

<br>

## Footer

![](docs/media/projects/old-portfolio/304816745-734a2488-44b0-4433-9b45-eec0602c24bf.png)

Thank you for Viewing!


## Hosting

The archive is a plain static bundle in `docs/`. It is deployed as a
Cloudflare Worker with static assets, which also sidesteps the Rocket Loader
rewrite that used to break ES modules on the old Pages project.

```sh
bun install            # or npm install
bun run dev            # http://127.0.0.1:8787
bun run deploy         # wrangler deploy (needs a Cloudflare login)
bun run check          # fail on missing local files / list external deps
```

`docs/_headers` sets long-lived caching for media and immutable vendored
packages. `docs/_redirects` keeps the old Firebase clean URLs and share links
working.

### Rebuilding the vendored pieces

`docs/packages`, `docs/media/icons/devicon`, the fonts and the project media
are committed on purpose — the site must work with zero network calls. The
scripts that produced them are kept for reproducibility:

```sh
node scripts/vendor-externals.mjs        # CDN libraries, icon sets, fonts
python3 scripts/build-icon-font.py       # 24 KB Material Symbols subset
python3 scripts/sync-project-media.py    # copy media from the 2026 portfolio
python3 scripts/localise-markdown.py     # local images inside project docs
python3 scripts/optimize-fonts.py        # convert remaining fonts to WOFF2
```
