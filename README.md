# Rehabitter

A habit tracking app to facilitate the process of replacing bad habits with better ones. Originally borne out of [Amber Rae's template on Instagram](https://www.instagram.com/p/Bu3_RwPBM2_/), when you add a new habit, you have to come up with something else to replace it. Kinda like how smokers trying to quit go on the patch? (And that's how the name was born 🐇🥕) As time goes by, you can view your progress in a simple calendar heatmap, just like GitHub's contribution chart.

### Project Links

**Live site**: https://rehabitter.herokuapp.com

![Rehabitter demo](https://i.imgur.com/AXePo3s.gif)

## How It's Made

**Tech used:** HTML, CSS, JavaScript, TailwindCSS, NodeJS, ExpressJS, MomentJS, D3JS, MongoDB

The project is built on Node and Express on the backend, and I use EJS to serve up the front end. I was focused on working on the backend for this project, and the simplest way I knew how to do that was with Node and Express. I was making sure I still understood the MVC (Model-View-Controller) pattern when designing the backend and routes.

## Optimizations

I learned how to use the `@apply` directive for Tailwind, which helped immensely for applying the same styling for similar items. For example, all the buttons are styled similarly and the only difference is the color. This helps to cut down on redundant code.

## Lessons Learned

I learned a lot about using D3 in this project, especially that there is a specific package for it when using it on the backend 😅 I remember using it very briefly in college before, but this was the first time I used it in a project like this one. I did reference code from this [Rising Stack tutorial](https://blog.risingstack.com/tutorial-d3-js-calendar-heatmap/) and [@g1eb's own creation](https://github.com/g1eb/calendar-heatmap/blob/master/src/calendar-heatmap.js), but they were both already working on the front-end side, not the D3Node version.

I also learned that it's a good idea to figure out the data/model first before moving forward with implementation. I had to reset the dummy data a couple times because I realized I didn't have a good way of checking whether or not a new week was starting. This was important because the dashboard only shows a weekly view, and I'd need to archive the data from weeks that passed. But at the same time, I wanted an easy way to display the date in a more human-friendly format. I ended up storing both versions to make it easier for me in the future.














## Other Projects

Check out other stuff I've worked on:

**Secret Santa App**: https://github.com/geraldiner/secret-santa-app

**Minute To Win It Games API & Wiki**: https://github.com/geraldiner/min-to-win

## Currently I'm:

- Working full-time at <a target="_blank" href="https://nomnomnow.com">Nom Nom</a>, migrating JavaScript to TypeScript
- Building my brand, <a target="_blank" href="https://happiandco.com">Happi & Co. Studio LLC</a>

But I'm always open to hearing about your next big thing!

## Let's get to know each other!

Connect with me:

**Twitter**: [@GeraldineDesu](https://twitter.com/geraldinedesu)

**LinkedIn**: [in/GeraldineR](https://linkedin.com/in/geraldiner)

**Email**: hello [at] geraldiner [dot] com
