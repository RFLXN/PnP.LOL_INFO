import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>index</title>
      </Head>

      <main>
        <h1>Index Page</h1>
        <h2>TODO: Design Page Layout</h2>
        <h2>TODO: Implement - user search by summoner name</h2>

        {/*
            --- for implementation of user search ---

            1. get summoner name from input form
            2. jump to /user/[name]?host=kr
         */}
      </main>
    </div>
  );
}
