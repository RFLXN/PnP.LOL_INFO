# League of Legends API

## Required Endpoints

### /lol/summoner/v4/summoners/by-name/{summonerName}
* get summoner data by name
* host: platform
* you can get summoner id, account id, puuid, name, summoner level

### /lol/match/v5/matches/by-puuid/{puuid}/ids
* get summoner's match list
* host: regional
* query params
  * start: default 0 / start index
  * count: default 20, max 100 / match numbers
  * queue: int / filter by queue id
  * type: string / filter by match type
* you can get array of string includes match id

### /lol/match/v5/matches/{matchId}
* get match data
* host: regional
* response example here: ./response-example/match_data_response.json

### /lol/match/v5/matches/{matchId}/timeline
* get match timeline
* host: regional

### /lol/champion-mastery/v4/champion-masteries/by-summoner/{encryptedSummonerId}
* get array of champion mastery
* host: platform

## API Using Flow
1. get puuid and summoner id from SUMMONER-V4/by-name endpoint
2. get user's mastery from CHAMPION-MASTERY-V4/by-summoner with summoner id
3. rendering user page champion mastery
4. get user's match ids from MATCH-V5/by-puuid
5. get user's match data from MATCH-V5/matches and caching it
6. rendering user page match history
7. get match timeline from MATCH-V5/timeline
8. parsing timeline
9. rendering match page
