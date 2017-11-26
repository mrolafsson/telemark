var markup = require("stir-up")
markup(['ol', 'li'], global);

var marx_brothers = ['Groucho', 'Harpo', 'Chico', 'Gummo', 'Zeppo'];

ol(
    iterate(marx_brothers, function (bro) {
        return li(bro).make();
    })
).make();