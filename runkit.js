var markup = require("stir-up/dist/stir-up-html.min.js");
markup.html.in(global);

var marx_brothers = ['Groucho', 'Harpo', 'Chico', 'Gummo', 'Zeppo'];
ol(
    iterate(marx_brothers, function (bro) {
        return li(bro);
    })
).make();