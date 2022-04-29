import Head from "next/head";
import { LolApi, LolApiUrlBuilder } from "../../util/lol.esm";
import axios from "axios";

export async function getServerSideProps(context) {
  const { name, host } = context.query; // get path parameter "name" and get query string "host"

  const endpoint = LolApi.getApiEndpoints().summoner.byName; // get endpoint object

  // build API URL with using builder
  const url = new LolApiUrlBuilder().setEndpoint(endpoint).setHost(host).setParam("{summonerName}", name).build();

  // send request to Riot API
  const res = await axios.request({
    url,
    method: endpoint.method,
    headers: {
      "X-Riot-Token": LolApi.getApiKey(), // we must set header X-Riot-Token
    },
  });

  // pass data as props
  return { props: { data: res.data } };
}

// we can get passed props from getServerSideProps
export default function User({ data }) {
  return (
    <div>
      <Head>
        <title>user</title>
      </Head>
      <main>
        <p>
          summoner id: {data.id}
          <br />
          account id: {data.accoundId}
          <br />
          puuid: {data.puuid}
          <br />
          name: {data.name}
          <br />
          profile icon id: {data.profileIconId}
          <br />
          revision date: {new Date(data.revisionDate).getHours()}
          <br />
          summoner level: {data.summonerLevel}
        </p>
      </main>
    </div>
  );
}
