import React from "react";
import HomeComponent from "../components/HomeComponent";

const Home = () => {
  const data = [
    {
      url: "https://www.shutterstock.com/image-photo/criminal-wearing-black-balaclava-hoodie-600nw-1874960659.jpg",
      link: "/add",
      title: "ADD",
      subTitle: "Criminal Record",
    },
    {
      url: "https://images.squarespace-cdn.com/content/v1/5b8709309f87706a308b674a/1630432472107-419TL4L1S480Z0LIVRYA/Missing.jpg",
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
     
    </div>
  );
};

export default Home;
