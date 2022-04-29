# Development Design

## Pages

* index: root page / user search bar included
* user: user detail page
* match: match detail page

## Files

* pages/ : next.js pages directory
    * _app.js : next.js global page settings
    * index.js
    * user.js
    * match.js
    * 404.js : http 404 error page file
    * api/ : next.js api routes directory
        * lol/ : League of Legends API Wrapper
            * summoner/
                * by-id/
                    * \[id\].js : api endpoint for get summoner data by id
                * by-name/
                    * \[name\].js : api endpoint for get summoner data by name
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
