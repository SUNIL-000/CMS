import React from "react";
import HomeComponent from "../components/HomeComponent";

const Home = () => {
  const data = [
    {
      url: "https://img.freepik.com/free-photo/middle-aged-man-spending-time-jail_23-2149098118.jpg?t=st=1714637609~exp=1714641209~hmac=14c5ad5c48466c3770025790b973f7adf1eb2cc87328fdaeb6b7b2988ebc934c&w=996",
      link: "/add",
      title: "ADD",
      subTitle: "Criminal Record",
    },
    {
      url: "https://media.istockphoto.com/id/1335050732/photo/businessman-using-a-computer-to-document-management-concept-online-documentation-database-and.jpg?s=2048x2048&w=is&k=20&c=JHaHbIRf1Zikdw2huw9c7vOVM3QuPucz5_ooiqeETPI=",
      link: "/missing-report",
      title: "Missing Report ",
      subTitle: "Create Report",
    },
    {
      url: "https://img.freepik.com/free-vector/hand-drawn-no-data-illustration_23-2150696455.jpg?w=740&t=st=1715430084~exp=1715430684~hmac=5fb269d2c24dbdf3b7a0a31c57e2d427716b5affc1c4668194c9d77a96c5d075",
      link: "/all-missing-report",
      title: "All Missing Person",
      subTitle: "Manage Missing Person",
    },
    {
      url: "https://img.freepik.com/free-vector/man-look-graphic-chart-business-analytics-concept-big-data-processing-icon_39422-761.jpg?t=st=1714637938~exp=1714641538~hmac=c4129fcddc5316646969a8e6953ac706700152269565302c359a2ab6e96ebcd7&w=826",
      link: "/show-admin",
      title: "Admin Record",
      subTitle: "All Admin Record",
    },
    {
      url: "https://img.freepik.com/free-vector/web-page-visualization-protocol-procedure-dynamic-software-workflow-full-stack-development-markup-administrate-system-driver-shared-memory-vector-isolated-concept-metaphor-illustration_335657-4299.jpg?t=st=1714638317~exp=1714641917~hmac=7499ad1e631070532f59f7ac713e6277ac31dc2f7effd3ab76942caa5e849e6d&w=740",
      link: "/show-record",
      title: "Update Record",
      subTitle: "Update Criminal Record",
    },
    {
      url: "https://cdn.pixabay.com/photo/2017/05/14/03/45/data-2311261_1280.png",
      link: "/show-record",
      title: "All Record",
      subTitle: "All Criminal Record",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-1 mt-8 py-8 overflow-hidden items-center justify-center">
      <HomeComponent data={data} />
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"> */}

      {/* <a
        href="#"
        className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <img
          className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
          src="/docs/images/blog/image-4.jpg"
          alt
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions 2021
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </div>
      </a> */}
    </div>
  );
};

export default Home;
