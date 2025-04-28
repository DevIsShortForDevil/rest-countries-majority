# rest-countries-majority

The goal is to Create a project using [Rest Countries](https://restcountries.com/) to let users search and select a country and see details about it.
<br />

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

<br />

# General Discussion

Here are some notes to share about the mindset behind alot of the decisions made on this project:

- Since the descriptions are intentionally open, and the [Rest Countries](https://restcountries.com/) API returns unpaginated responses, I decided to
  imagine if they were paginated, use them like they were and optimize my code around that while displaying my abilty to handle the challenge in the process.

- There are more than one way to select a country, and having only a search would've limited the visual aspect of the site, so I decided to add a **_World Map_**
  and and let users select any country off of the map and coordinate with a [Rest Countries](https://restcountries.com/) API to see the results. I've also decided
  to hightlight the countries that appear in user searches for a better visual display of data and UX.

- I wanted to add a few more common functionalities to the website, so I thought what would Majority might use in their project to suit their customer base's needs.
  So Internationalization and Dark mode came to mind. I've added Both English and Swedish locales for examples and created a theme to control the colors of the pages.

- Initially I started the project based on [Vue 3](https://vuejs.org/) and [Nuxt 3](https://nuxt.com/), but since there was a conflict between the new patches of [Nuxt](https://nuxt.com/) and [@nuxtjs/i18n](https://i18n.nuxtjs.org/), I decided to use [Vue 3](https://vuejs.org/), [Vite](https://vite.dev/), and [Vue-i18n](https://vue-i18n.intlify.dev/) and a few other packages that [Nuxt](https://nuxt.com/) also uses.

- I used [tailwindcss](https://tailwindcss.com/), for CSS, Theme Configurations and Dark mode.

- [HeadlessUI](https://headlessui.com/) was used alongside [tailwindcss](https://tailwindcss.com/) for some of the components used in the project.

- The Website is coded to be **_Responsive_** and I tried to test out all the bugs I could find, hopefully it's alright.

- Code Specific explanations are provided in comments in their respective lines.

- The entire project was done in a span of roughly **_30 hours_**.
