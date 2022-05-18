import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { LolApiExecutor } from "../functions/lol.mjs";

export async function getServerSideProps(context) {
  const host = "kr";
  const rotation = await LolApiExecutor.getChampionRotations(host);

  return { props: { data: { rotation } } };
}

export default function Home({ data }) {
  const [summonerName, setSummonerName] = useState("");
  const [host, setHost] = useState("");
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>index</title>
      </Head>

      <main>
        <h1>Index Page</h1>
        <h2>TODO: Design Page Layout</h2>
        summoner name: <input type="text" id="summoner-name-input"
                              onChange={event => setSummonerName(event.target.value)} /> <br />
        platform: <input type="text" id="user-data-host-input" onChange={event => setHost(event.target.value)} /> <br />
        <button type="button" onClick={() => router.push(`/user/${summonerName}?host=${host}`)}>submit</button>
        <br /><br />
        weekly free champion rotation id: {data.rotation.freeChampionIds.map(id => `${id}, `)}
      </main>
    </div>
  );
}
