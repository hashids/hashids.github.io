#An amazing Hashids website 
## [Hashids website](http://hashids.org)

Website documentation for Hashids.

## How to update

Get [Node.js](http://nodejs.org/), [Grunt](http://gruntjs.com/). Be sure you have [Sass](http://sass-lang.com/) and [Handlebars.js](http://handlebarsjs.com/) installed.

This is a static website that auto-generates pages for different implementations. There's two main files to update:

	src/data.json
	src/template.html

`data.json` contains majority of the implementation data that populates the site. `template.html` is the template.

Run the following in your git repo:

	npm run production

This will keep watching your files for changes and updating whatever's needed. When done, `git push` your changes.

## Shoutouts

Hashids website either uses or is built with the following. Muchas gracias to their respective creators for making these:

[Node](http://nodejs.org/) - Node.js is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications.

[npm](https://www.npmjs.org/) - Node.js package manager

[Grunt](http://gruntjs.com/) - The JavaScript Task Runner

[Handlebars.js](http://handlebarsjs.com/) - Minimal Templating on Steroids

[Sass](http://sass-lang.com/) - Syntactically Awesome Style Sheets

[Mouapp](http://mouapp.com/) - The missing Markdown editor for web developers

[highlight.js](https://highlightjs.org/) - Syntax highlighting for the Web

[Font Awesome](http://fortawesome.github.io/Font-Awesome/) - The iconic font and CSS toolkit

[Octodex](https://octodex.github.com/) - Github octocats

[FlexSlider](https://github.com/woothemes/FlexSlider) - An awesome, fully responsive jQuery slider toolkit

[Google Fonts](https://www.google.com/fonts) used:

1. [Leckerli One](https://www.google.com/fonts/specimen/Leckerli+One)

2. [Fira Mono](http://www.google.com/fonts/specimen/Fira+Mono)
