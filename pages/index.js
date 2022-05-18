import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
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
        <h2>TODO: Implement - user search by summoner name</h2>


        summoner name: <input type="text" id="summoner-name-input"
                              onChange={event => setSummonerName(event.target.value)} /> <br />
        platform: <input type="text" id="user-data-host-input" onChange={event => setHost(event.target.value)} /> <br />
        <input type="button" onClick={() => router.push(`/user/${summonerName}?host=${host}`)} />


        {/*
            --- for implementation of user search ---

            1. get summoner name from input form
            2. jump to /user/[name]?host=kr
         */}
      </main>
    </div>
  );
}
