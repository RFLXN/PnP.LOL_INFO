import Head from "next/head";
import { LolApiExecutor } from "../../functions/lol.esm";
import { LolApiHostResolver } from "../../util/lol.esm";

export async function getServerSideProps(context) {
  const { name, host } = context.query; // get path parameter "name" and get query string "host"

  // fetch user data from Riot API
  const user = await LolApiExecutor.getUserDataByName(name, host);

  // convert platform host key to regional host key
  const regionalHost = LolApiHostResolver.getRegionalHostFromPlatform(host);

  // fetch match ids from Riot API
  const matches = await LolApiExecutor.getMatchIds(user.puuid, regionalHost, { count: 100 });

  // pass data as props
  return { props: { data: { user, matches } } };
}

// we can get props from getServerSideProps
export default function User({ data }) {
  return (
    <div>
      <Head>
        <title>user</title>
      </Head>
      <main>
        <h1>USER PAGE</h1>
        <h2>TODO: Design Page Layout</h2>
        <h2>TODO: Implement - get match summary with match id</h2>

        <hr />

        <h2>User</h2>
        <p>
          summoner id: {data.user.id}
          <br />
          account id: {data.user.accoundId}
          <br />
          puuid: {data.user.puuid}
          <br />
          name: {data.user.name}
          <br />
          profile icon id: {data.user.profileIconId}
          <br />
          revision date: {new Date(data.user.revisionDate).toDateString()}
          <br />
          summoner level: {data.user.summonerLevel}
        </p>

        <hr />

        <h2>Matches</h2>
        <ul>
          {data.matches.map((id) => (
            <li key={id}>{id}</li>
          ))}
        </ul>
      </main>
    </div>
  );
}
