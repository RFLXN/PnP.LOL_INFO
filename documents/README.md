# Development Design

## Pages

* index: root page / user search bar included
* user: user detail page
* match: match detail page

## Files

* pages/ : next.js pages directory
    * _app.js : next.js global page settings
    * index.js : index page
    * user/
        * \[name\].js : dynamic route page for get summoner data by summoner name
    * match/
        * \[id\].js : dynamic route page for get match data by match id
    * 404.js : http 404 error page file
    * api/ : next.js api routes directory
* components/ : React jsx components directory
    * \*\*/\*.js : React jsx component file
* public/ : web page public resources
* styles/ : next.js css modules directory
    * globals.css : global css file
    * \*\*/\*.module.css: next.js css module file
* resources/ : business logic resources directory
    * lol-api.json: League of Legends API data (api_key and endpoints url)
* util/ : utility functions/classes directory
    * lol.esm.js : League of Legends API utility functions/classes file
* function/ : business login functions/classes directory
    * lol.esm.js: League of Legends Business Logic functions/classes file
