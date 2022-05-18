# LOL API Wrapping Structure

## Resource Files

* resources/
    * lol-api.json: LOL API information JSON file
    * lol-api-key.json: Riot API key here
    * assets/: directory for LOL static assets
        * lol-assets.tar.gz: asset package file
        * lol/
            * img/: LOL API Image here
            * {PATCH_VERSION}/
                * img/: LOL API image here
                * data/
                    * {LANGUAGE_CODE}/: LOL API data here

## JS Wrappers

* util/
    * lol.mjs
        * class - LolApiData: load and store api data from resources/lol-api.json
        * class - LolApiBuilder: builder class for create REST API URL
        * class - LolApiHostResolver: resolve (or convert) host (ex: platform host -> regional host)
* functions/
    * lol.mjs
        * class - LolApiExecutor: IMPLEMENT ALL BUSINESS LOGIC HERE
        * class - LolAssetDownloader: download resource/assets/lol-assets.tar.gz and unpack it
        * class - LolAssetDataManager: load LOL asset data
          (ex: load resources/assets/lol/12.9.1/data/ko_KR/champion.json)
    * lol-res.mjs
        * class - LolMatchDataExtractor: wrapper class for LolApiExecutor.getMatchData response
        * class - LolMatchParticipantDataExtractor: wrapper class for LolMatchDataExtractor.participants
        * class - LolMatchParticipantPerkDataExtractor: wrapper class for LolMatchParticipantDataExtractor.perks

## How to Work?

### user/\[name\].js

in getServerSideProps:

1. get user data by functions/lol.mjs/LolApiExecutor.getUserDataByName
2. resolve host (get user data using platform host, get match ids using regional host)
3. get user match id with puuid (from user data) by functions/lol.mjs/LolApiExecutor.getMatchIds
4. give data as props

in page function:

* use user data from props
* use match ids from props

### match/\[id\].js

in getServerSideProps:

1. get match data by functions/lol.mjs/LolApiExecutor.getMatchData
2. give data as props

in page function:

1. wrap match data (from props) in functions/lol-res.mjs/LolMatchDataExtractor
2. use match data from LolMatchDataExtractor
