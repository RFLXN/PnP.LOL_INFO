import Head from "next/head";
import { LolApi, LolApiUrlBuilder } from "../../util/lol.esm";
import axios from "axios";

export async function getServerSideProps(context) {
  const { name, host } = context.query;

  const endpoint = LolApi.getApiEndpoints().summoner.byName;
  const url = new LolApiUrlBuilder().setEndpoint(endpoint).setHost(host).setParam("{summonerName}", name).build();

  const res = await axios.request({
    url,
    method: endpoint.method,
    headers: {
      "X-Riot-Token": LolApi.getApiKey(),
    },
  });

  return { props: { data: res.data } };
}

export default function User({ data }) {
  console.log(data);
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
