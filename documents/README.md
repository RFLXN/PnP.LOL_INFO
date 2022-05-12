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
    * lol-api.json: League of Legends API data (endpoints url)
    * lol-api-key.json: Riot API key
    * assets/: League of Legends game assets
        * lol-assets.tar.gz: League of Legends game asset package file
        * lol/: asset files (unpacked files from lol-assets.tar.gz)
* util/ : utility functions/classes directory
    * lol.mjs : League of Legends API utility functions/classes file
    * json.mjs: function for load json file to js object
    * unpack.msj: function for unpack tar.gz file
* function/ : business login functions/classes directory
    * lol.mjs: League of Legends Business Logic functions/classes file
