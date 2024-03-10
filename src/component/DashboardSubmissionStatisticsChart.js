import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";
import { I18n } from "react-redux-i18n";
import { useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  animation: false,
  aspectRatio: 3,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: I18n.t("mainStatistics.lastWeekApplications"),
    },
  },
  scales: {
    y: {
      max: 10,
    },
  },
};

function DashboardSubmissionStatisticsChart(props) {
  const { submissionData } = props;

  const labels = Array(7)
    .fill(9)
    .map((_, i) => {
      let date = new moment();
      date.add(-i, "days");
      return date.format("YYYY-MM-DD");
    });
  labels.reverse();

  // if (submissionData){
  //   const maxValue = submissionData.reduce(
  //     (prev, current) =>
  //       (current.submissionCountTotal > prev.submissionCountTotal &&
  //         current.submissionCountTotal) ||
  //       prev.submissionCountTotal
  //   );
  // }

  const data = {
    labels,
    datasets: [
      {
        label: undefined,
        data: labels.map((date) => {
          return (
            submissionData.find((el) => el.date === date)
              ?.submissionCountTotal || 0
          );
        }),
      },
    ],
  };

  return <Line options={options} data={data} />;
}

export default DashboardSubmissionStatisticsChart;
