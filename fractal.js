'use strict';

const path = require('path');

const fractal = module.exports = require('@frctl/fractal').create();

fractal.set('project.title', 'Grid Component');


fractal.components.set('path', path.join(__dirname, 'components'));
fractal.components.set('default.preview', '@preview');
fractal.docs.set('path', path.join(__dirname, 'docs'));
fractal.web.set('static.path', path.join(__dirname, 'public'));

fractal.components.set("resources", {
    scss: {
      label: "SCSS",
      match: ["**/*.scss"]
    },
    css: {
      label: "CSS",
      match: ["**/*.css"]
    },
    other: {
      label: "Other Assets",
      match: ["**/*", "!**/*.scss", "!**.css"]
    }
  });
  

