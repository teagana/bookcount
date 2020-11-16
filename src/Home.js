import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { ResponsiveLine } from "@nivo/line";
import { getHomePageInfo } from "./api";
import Loading from "./Loading";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";

export default function Home() {
  const [homeInfo, setHomeInfo] = useState();
  const [bookGraphData, setBookGraphData] = useState();
  const [pageGraphData, setPageGraphData] = useState();

  // loader starts as not showing
  const [showLoading, setShowLoading] = useState(false);

  // for notification
  const location = useLocation();
  const successfulCreationNotif = () => toast("successfully added book!");

  useEffect(() => {
    // start the loader
    setShowLoading(true);

    // get all the info from the database for this page
    getHomePageInfo().then((info) => {
      console.log(info);

      // get the data necessary for home
      setHomeInfo(info);
    });
  }, []);

  // use effect for setting up graph data
  useEffect(() => {
    // set up the book graph data if homeInfo is filled
    if (typeof homeInfo !== "undefined") {
      formatGraphData();

      // hide the loader
      setShowLoading(false);

      // show notification
      if (typeof location.state !== "undefined") {
        if (location.state.successNotif) {
          successfulCreationNotif();
          location.state.successNotif = false;
        }
      }
    } // eslint-disable-next-line
  }, [homeInfo]);

  function formatGraphData() {
    const months = [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
    ];
    let booksPerMonthData = [];
    let pagesPerMonthData = [];

    // format the data for books/pages per month into format for nivo library
    for (let i = 0; i < months.length; i++) {
      booksPerMonthData.push({
        x: months[i],
        y: homeInfo.booksPerMonth[i],
      });

      pagesPerMonthData.push({
        x: months[i],
        y: homeInfo.pagesPerMonth[i],
      });
    }

    let booksGraphData = [
      {
        id: "",
        data: booksPerMonthData,
      },
    ];

    let pagesGraphData = [
      {
        id: "",
        data: pagesPerMonthData,
      },
    ];

    // set the data into state for graphs to use
    setBookGraphData(booksGraphData);
    setPageGraphData(pagesGraphData);
  }

  // function for generating the graphs (from nivo library)
  const thisYear = (data, yAxisName, colorScheme) => (
    <ResponsiveLine
      data={data}
      colors={{ scheme: colorScheme }}
      margin={{ top: 20, right: 20, bottom: 60, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: yAxisName,
        legendOffset: -50,
        legendPosition: "middle",
        format: (e) => Math.floor(e) === e && e,
      }}
      pointSize={4}
      pointColor={{ theme: "background" }}
      pointBorderWidth={4}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
    />
  );

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        {showLoading ? (
          <Loading
            color={"lightgray"}
            animationLength={"1s"}
            size={"20px"}
            marginTop={"200px"}
          />
        ) : (
          <>
            <div className="row justify-content-center mt-5">
              <ToastContainer />
              <div className="col-6-lg col-12-sm pl-5 mb-5 pr-5">
                <h3>
                  books:{" "}
                  <span className="font-weight-normal" id="total-books">
                    {homeInfo && homeInfo.totalBooks}
                  </span>
                </h3>
                <div className="mt-4">
                  <h5 className="pl-3">
                    this year:{" "}
                    <span className="font-weight-normal">
                      {homeInfo && homeInfo.booksThisYear} /{" "}
                      {homeInfo && homeInfo.goals.books_this_year}
                    </span>
                  </h5>
                  <div id="books-this-year" className="graph">
                    {bookGraphData && thisYear(bookGraphData, "books", "set3")}
                  </div>
                  <h5 className="pl-3">
                    this month:{" "}
                    <span className="font-weight-normal">
                      {homeInfo && homeInfo.booksThisMonth} /{" "}
                      {homeInfo && homeInfo.goals.books_this_month}
                    </span>
                  </h5>
                  <h5 className="pl-3 mt-3">
                    most-read genre:{" "}
                    <span className="font-weight-normal">
                      {homeInfo && homeInfo.mostReadGenre.replace(/"/g, "")}
                    </span>
                  </h5>
                </div>
              </div>
              <div className="col-6-lg col-12-sm pl-5 mb-5 pr-5">
                <h3>
                  pages:{" "}
                  <span className="font-weight-normal" id="total-pages">
                    {homeInfo && homeInfo.totalPages}
                  </span>
                </h3>
                <div className="mt-4">
                  <h5 className="pl-3">
                    this year:{" "}
                    <span className="font-weight-normal">
                      {homeInfo && homeInfo.pagesThisYear} /{" "}
                      {homeInfo && homeInfo.goals.pages_this_year}
                    </span>
                  </h5>
                  <div id="page-this-year" className="graph">
                    {pageGraphData &&
                      thisYear(pageGraphData, "pages", "accent")}
                  </div>
                  <h5 className="pl-3">
                    this month:{" "}
                    <span className="font-weight-normal">
                      {homeInfo && homeInfo.pagesThisMonth} /{" "}
                      {homeInfo && homeInfo.goals.pages_this_month}
                    </span>
                  </h5>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
