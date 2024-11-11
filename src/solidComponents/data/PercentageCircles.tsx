import { type Component } from 'solid-js';

// numbers that equal 100
// const data = [
//     {label: 'A', value: 10},
//     {label: 'B', value: 20},
//     {label: 'C', value: 30},
//     {label: 'D', value: 50},
//     {label: 'E', value: 20},
//     {label: 'F', value: 30},
//     {label: 'G', value: 90},
//     {label: 'H', value: 5},
//     {label: 'I', value: 25},
// ];

const colors = [
  // "#FF73E3",
  // "#56EEF4",
  // "#7F2982",
  // "#82D173",
  // "#CDCDCD", //grey #CDCDCD
  '#F5D925', //yellow #F5D925
  '#F51AA4', //pink #F51AA4
  '#B8A94D',
  // "#57FA93", //green #57FA93
  // "#1BBF57", //green #1BBF57
  // "#02A13C", //green #02A13C
  // "#59063B", //dark purple #59063B
  '#1D37DE', //blue #1D37DE
  '#C154F0', //purple #C154F0
  //  "#2B071E", //dark purple #2B071E

  // "#C045C4",
];

const containerWidth = 600;
const containerHeight = 600 / 2;
// const maxRadius = Math.min(containerWidth, containerHeight) / 4;
const maxRadius = containerHeight / 2;

const getRadius = (value: number) => (Math.sqrt(value) * maxRadius) / 10;

const calculateCircleSizeAndPosition = (data: IPercentageCircle[]) => {
  const circles: { x: number; y: number; radius: number; value: number; label: string }[] = [];

  data?.map(({ label, value }) => {
    const radius = getRadius(value);
    let x, y, overlap;
    let angle = 0;
    let distance = 0;
    do {
      overlap = false;
      x = containerWidth / 2 + distance * Math.cos(angle);
      y = containerHeight / 2 + distance * Math.sin(angle) * 0.5;
      for (const circle of circles) {
        const dx = circle.x - x;
        const dy = circle.y - y;
        const distanceBetween = Math.sqrt(dx * dx + dy * dy);
        if (distanceBetween < circle.radius + radius + 10) {
          overlap = true;
          break;
        }
      }
      angle += 0.3;
      distance += 2;
    } while (overlap);
    circles?.push({ x, y, radius, value, label });
  });

  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  circles?.forEach(({ x, y, radius }) => {
    minX = Math.min(minX, x - radius);
    minY = Math.min(minY, y - radius);
    maxX = Math.max(maxX, x + radius);
    maxY = Math.max(maxY, y + radius);
  });

  const groupWidth = maxX - minX;
  const groupHeight = maxY - minY;
  const offsetX = (containerWidth - groupWidth) / 2 - minX;
  const offsetY = (containerHeight - groupHeight) / 2 - minY;

  circles?.forEach((circle) => {
    circle.x += offsetX;
    circle.y += offsetY;
  });
  return circles;
};

interface IPercentageCircle {
  label: string;
  value: number;
  color?: string;
  x?: number;
  y?: number;
  radius?: number;
}

const PercentageCircles: Component = ({ data }: { data: IPercentageCircle[] }) => {
  const circles = calculateCircleSizeAndPosition(data);

  return (
    // style={{height: "100dvh"}}
    <div class="flex flex-col justify-center items-center">
      <div
        style={{ height: `${containerHeight}px`, width: `${containerWidth}px` }}
        class="relative justify-center items-center flex"
      >
        {circles?.map(({ x, y, radius, label }) => (
          <div
            class="absolute flex rounded-full items-center justify-center backdrop-blur border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900 shadow"
            style={{
              left: `${x - radius}px`,
              top: `${y - radius}px`,
              height: `${radius * 2}px`,
              width: `${radius * 2}px`,
              //   background: `${colors[index % colors.length]}E6`,
              //   "border-width": "4px",
              // "border-color": "black",
            }}
          >
            <p
              style={{
                // "flex-shrink": 1,
                // "max-width": `${radius}px`,
                'font-size': `${radius / 4}px`,
              }}
              class="text text-center px-4"
            >
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PercentageCircles;
