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
    // {
    //   url: "https://media.istockphoto.com/id/1335050732/photo/businessman-using-a-computer-to-document-management-concept-online-documentation-database-and.jpg?s=2048x2048&w=is&k=20&c=JHaHbIRf1Zikdw2huw9c7vOVM3QuPucz5_ooiqeETPI=",
    //   link: "/login",
    //   title: "Login",
    //   subTitle: "Login info",
    // },
    // {
    //   url: "https://img.freepik.com/premium-photo/3d-rendering-friendly-police-officer-he-is-wearing-blue-uniform-hat-badge-he-has-smile-his-face-looks-approachable_14117-68592.jpg?w=1060",
    //   link: "/signup",
    //   title: "Signup",
    //   subTitle: "Create your account",
    // },
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