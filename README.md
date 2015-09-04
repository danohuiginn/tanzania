Openoil Tanzania
===========

With thanks to http://crowdcover.github.io/site/

## Merging in different right-panel frames

The original moabi has only 1 right-hand panel, namely a map. We change this to have 3 layers -- custom html content, an iframe for external content, and the map. At each waypoint (i.e. scrolling position), we change the z-index and opacity of each layer

## Development workflow

### Local development

Check out the code
In the source directory:

`jekyll serve`

this will put the Tanzania report up at http://localhost:4000/tanzania/tanzania/en/

### Deployment

The main site is hosted using github pages. Push an update to the gh-pages branch of https://github.com/OpenOil-UG/tanzania, and the version at https://openoil-ug.github.io/tanzania/tanzania/en/

### Small edits directly in github

You can use github to edit reports directly (https://github.com/OpenOil-UG/tanzania/blob/gh-pages/_posts/reports/en/2015-07-21-tanzania.html). This is only useful for tiny changes -- github does not give useful error messages, so you will have to work offline to figure out how you have broken jekyll.

## Architecture

The overall page structure is in _layouts/report.html

Page content is in _posts/reports/en/2015-07-21-tanzania.html
