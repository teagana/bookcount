import React from "react";
import Navbar from "./Navbar";
import { ResponsiveLine } from "@nivo/line";

export default function Home() {
  // make sure parent container have a defined height when using
  // responsive component, otherwise height will be 0 and
  // no chart will be rendered.
  // website examples showcase many properties,
  // you'll often use just a few of them.

  let data = [
    {
      id: "japan",
      color: "hsl(289, 100%, 57%)",
      data: [
        {
          x: "jan",
          y: 6,
        },
        {
          x: "feb",
          y: 110,
        },
        {
          x: "mar",
          y: 192,
        },
        {
          x: "apr",
          y: 1000,
        },
        {
          x: "jun",
          y: 140,
        },
        {
          x: "jul",
          y: 252,
        },
        {
          x: "aug",
          y: 139,
        },
        {
          x: "sep",
          y: 45,
        },
        {
          x: "oct",
          y: 218,
        },
        {
          x: "nov",
          y: 57,
        },
        {
          x: "dec",
          y: 273,
        },
      ],
    },
  ];
  const thisYear = (data, yAxisName, colorScheme) => (
    <ResponsiveLine
      data={data}
      colors={{ scheme: colorScheme }}
      margin={{ top: 30, right: 20, bottom: 60, left: 60 }}
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
        legend: "months",
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
      }}
      pointSize={4}
      pointColor={{ theme: "background" }}
      pointBorderWidth={4}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom",
          direction: "column",
          justify: false,
          translateX: 160,
          translateY: 50,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0, // make key disappear
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            // {
            //   on: "hover",
            //   style: {
            //     itemBackground: "rgba(0, 0, 0, .03)",
            //     itemOpacity: 1,
            //   },
            // },
          ],
        },
      ]}
    />
  );

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row justify-content-center mt-4">
          <div className="col-6 pl-5">
            <h3>books</h3>
            <div id="books-this-year" className="graph">
              {thisYear(data, "books", "set3")}
            </div>
          </div>
          <div className="col-6 pl-5">
            <h3>pages</h3>
            <div id="page-this-year" className="graph">
              {thisYear(data, "pages", "accent")}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
