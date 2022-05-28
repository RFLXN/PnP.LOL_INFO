import { LolApiExecutor } from "../../functions/lol.mjs";
import { LolMatchDataExtractor } from "../../functions/lol-res.mjs";
import { timestampToString } from "../../util/timestamp.mjs";
import HeadBase from "../../components/head";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const { id, host } = context.query;

  let flag = true;
  let match;
  try {
    console.log(`match/[id].js: fetching match data: ${id} / ${host}`);
    match = await LolApiExecutor.getMatchData(id, host);
    console.log(`match/[id].js: successfully fetched match data: ${id} / ${host}`);
  } catch (e) {
    flag = false;
    console.log(`user/[name].js: failed to fetch match data: ${id} / ${host}`);
    console.log(e);
  }

  return { props: { data: { flag, matchData: match, host } } };
}

/**
 * @param {data: {flag: boolean, matchData: LolMatchDataExtractor}}
 */
export default function Match({ data }) {
  const router = useRouter();
  const { id } = router.query;

  const matchData = new LolMatchDataExtractor(data.matchData);

  /**
   * @param {LolMatchParticipantDataExtractor} participant
   */
  const participantToTag = (participant) => {
    return (<>
      name: {participant.summonerName} <br />
      puuid: {participant.puuid} <br />
      team id: {participant.teamId} <br />
      champion: {participant.championName} ({participant.championId}) <br />
      level: {participant.level} <br />
      kda: {participant.kills}/{participant.deaths}/{participant.assists} ({participant.kda}) <br />
      dealt champion damage: {participant.dealtChampionDamage} <br />
      taken damage: {participant.takenDamage} <br />
      gold: {participant.earnedGold} earned ({participant.goldPerMinute} gold per minute)
      / {participant.spentGold} spent <br />
      ward: {participant.placedControlWard} control ward / {participant.placedWard} ward
      / {participant.visionScore} vision score <br />
      cs: {participant.minionKills} <br />
      position: {participant.position} <br />
      <hr />
    </>);
  };

  // if flag == false, error occurred when fetching data from api
  if (data.flag) {
    return (<>
      <HeadBase subTitle={`매치 "${id}"`} />
      <main>
        <h1>MATCH DATA</h1>
        match id: {matchData.matchId} <br />
        creation date: {timestampToString(matchData.gameCreation)} <br />
        end date: {timestampToString(matchData.gameEnd)} <br />
        game duration: {matchData.gameDuration} seconds <br />
        map id: {matchData.mapId} <br />
        game mode: {matchData.gameMode} <br />

        <h1>SUMMONER DATA</h1>
        {matchData.participants.map(participant => participantToTag(participant))}
      </main>
    </>);
  } else {
    return (<>
      <HeadBase subTitle={`매치 "${id}"`} />
      <main>
        <h1>MATCH DATA</h1>
        failed to fetch data
      </main>
    </>);
  }
}
