import Head from "next/head";
import { LolApiExecutor } from "../../functions/lol.mjs";
import { LolApiHostResolver } from "../../util/lol.mjs";

export async function getServerSideProps(context) {
  const { name, host } = context.query; // get path parameter "name" and get query string "host"

  let flag = true;
  let user = undefined;
  let matches = undefined;
  // fetch user data from Riot API
  try {
    console.log(`user/[name].js: fetching user data: ${name} / ${host}`);
    user = await LolApiExecutor.getUserDataByName(name, host);
    console.log(`user/[name].js: successfully fetched user data: ${name} / ${host}`);
  } catch (e) {
    flag = false;
    console.log(`user/[name].js: failed to fetch user data: ${name} / ${host}`);
    console.log(e);
  }

  // convert platform host key to regional host key
  const regionalHost = LolApiHostResolver.getRegionalHostFromPlatform(host);

  // fetch match ids from Riot API
  try {
    console.log(`user/[name].js: fetching user match ids: ${name} / ${regionalHost}`);
    matches = await LolApiExecutor.getMatchIds(user.puuid, regionalHost, { count: 100 });
    console.log(`user/[name].js: successfully fetched match ids: ${name} / ${regionalHost}`);
  } catch (e) {
    flag = false;
    console.log(`user/[name].js: failed to fetch match ids: ${name} / ${regionalHost}`);
    console.log(e);
  }

  // pass data as props
  return { props: { data: { user, matches, flag } } };
}

// we can get props from getServerSideProps
export default function User({ data }) {
  const headTag = (
    <Head>
      <title>user</title>
    </Head>
  );

  if (data.flag) {
    return (
      <div>
        {headTag}
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
  } else {
    return (
      <div>
        {headTag}
        <main>
          <h1>ERROR!</h1>
        </main>
      </div>
    );
  }

}
