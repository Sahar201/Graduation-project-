import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js';
import { MOOD_MAP, SCORE_LABELS } from '../data/moods.js';

// Register only the Chart.js pieces we use.
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

/**
 * Renders the 7-day emotional trend as a soft bar chart.
 * Each bar's height reflects that day's mood score and its color matches the
 * mood, mirroring the Mood Tracker design.
 * @param {{trend: Array<{label, score, mood, date}>}} props
 */
const MoodChart = ({ trend }) => {
  const labels = trend.map((d) => d.label);
  const scores = trend.map((d) => d.score);
  const colors = trend.map((d) =>
    d.mood ? MOOD_MAP[d.mood]?.color || '#cfd6d3' : '#e3e7e5'
  );

  const data = {
    labels,
    datasets: [
      {
        label: 'Mood',
        data: scores,
        backgroundColor: colors,
        borderRadius: 10,
        borderSkipped: false,
        maxBarThickness: 46,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#2D2D2D',
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (ctx) =>
            ctx.parsed.y != null
              ? SCORE_LABELS[Math.round(ctx.parsed.y)] || ''
              : 'No entry',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        ticks: {
          stepSize: 1,
          callback: (value) => SCORE_LABELS[value] || '',
          color: '#6b6b6b',
          font: { family: 'Poppins', size: 11 },
        },
        grid: { color: 'rgba(0,0,0,0.05)', drawBorder: false },
      },
      x: {
        ticks: { color: '#6b6b6b', font: { family: 'Poppins', size: 12 } },
        grid: { display: false, drawBorder: false },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default MoodChart;
