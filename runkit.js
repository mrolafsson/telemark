var markup = require("stir-up/dist/stir-up-html.min.js");
markup.html.init(this);

var brothers = ['Groucho', 'Harpo', 'Chico'];

ol(
    iterate( brothers, function (name) {
        return  li(
                    a( href('https://en.wikipedia.org/wiki/' + name + '_Marx'),
                        text(name)
                    )
                );
    }),
    li( _class('other'),
        'Gummo'
    ),
    li( _class('other'),
        'Zeppo'
    )
).make();