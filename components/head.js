import Head from "next/head";

const HeadBase = ({ subTitle }) => {
  let title = "PnPLoL";
  if (typeof subTitle !== "undefined" && subTitle !== "") {
    title += ` - ${subTitle}`;
  }
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content="PnPLoL" />
    </Head>
  );
};

export default HeadBase;
