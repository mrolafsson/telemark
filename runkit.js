var markup = require("stir-up/dist/stir-up-html.min.js");
markup.html.init(this);

var wikipedia_url = 'https://en.wikipedia.org/wiki/';

// Create reusable components
markup.specify('brother', function (first_name) {
    return  a( href(wikipedia_url + first_name + '_Marx'), target('_blank'),
                text(first_name)
            )
});

var brothers = ['Groucho', 'Harpo', 'Chico'];

// Build markup with built-in methods for elements, iteration, conditionals etc.
section(
    h1('Marx Brothers on Wikipedia'),
    ol(
        iterate( brothers, function (name) {
            return  li(
                        brother(name)
                    );
        }),
        li( _class('other'),
            brother('Gummo')
        ),
        li( _class('other'),
            brother('Zeppo')
        )
    )
).make();