import React from "react";

const DonutChart = () => {
  // Portfolio data based on the screenshot
  const portfolioData = [
    { name: "Bitcoin (BTC)", percentage: 21.0, color: "#F97316" }, // Orange
    { name: "Ethereum (ETH)", percentage: 64.6, color: "#A855F7" }, // Purple
    { name: "Solana (SOL)", percentage: 14.4, color: "#3B82F6" }, // Blue
    { name: "Dogecoin (DOGE)", percentage: 14.4, color: "#06B6D4" }, // Cyan
    { name: "Solana (SOL)", percentage: 14.4, color: "#10B981" }, // Green
    { name: "Solana (SOL)", percentage: 14.4, color: "#EF4444" }, // Red
  ];

  // Function to create SVG path for donut segment
  const createArcPath = (startAngle, endAngle, innerRadius, outerRadius) => {
    const start = polarToCartesian(0, 0, outerRadius, endAngle);
    const end = polarToCartesian(0, 0, outerRadius, startAngle);
    const innerStart = polarToCartesian(0, 0, innerRadius, endAngle);
    const innerEnd = polarToCartesian(0, 0, innerRadius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      "M",
      start.x,
      start.y,
      "A",
      outerRadius,
      outerRadius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
      "L",
      innerEnd.x,
      innerEnd.y,
      "A",
      innerRadius,
      innerRadius,
      0,
      largeArcFlag,
      1,
      innerStart.x,
      innerStart.y,
      "Z",
    ].join(" ");
  };

  // Helper function to convert polar coordinates to cartesian
  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  // Calculate angles for each segment
  const total = portfolioData.reduce((sum, item) => sum + item.percentage, 0);
  let currentAngle = 0;

  const segments = portfolioData.map((item) => {
    const angle = (item.percentage / total) * 360;
    const segment = {
      ...item,
      startAngle: currentAngle,
      endAngle: currentAngle + angle,
      path: createArcPath(currentAngle, currentAngle + angle, 60, 100),
    };
    currentAngle += angle;
    return segment;
  });

  return (
    <div className="flex items-center gap-6">
      {/* SVG Donut Chart */}
      <div className="relative">
        <svg
          width="200"
          height="200"
          viewBox="-100 -100 200 200"
          className="transform -rotate-90"
        >
          {segments.map((segment, index) => (
            <path
              key={index}
              d={segment.path}
              fill={segment.color}
              className="hover:opacity-80 transition-opacity duration-200"
            />
          ))}
        </svg>
      </div>

      {/* Custom Legend */}
      <div className="flex flex-col gap-2">
        {portfolioData.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4 min-w-[200px]"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-[#A1A1AA]">{item.name}</span>
            </div>
            <span className="text-sm text-[#F4F4F5] font-medium">
              {item.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChart;
