import Matter from "matter-js";
const triangleVertices = [
  { x: 0, y: 0 },
  { x: 15, y: 30 },
  { x: -15, y: 30 },
];
export const createBody = (
  x: number,
  y: number,
  shape: string
): Matter.Body => {
  const { Bodies } = Matter;
  if (shape === "plank") {
    return Bodies.rectangle(x, y, 15, 40, { label: "player" });
  } else if (shape === "circle") {
    return Bodies.circle(x, y, 20, { restitution: 0.7, label: "player" });
  } else {
    return Bodies.fromVertices(x, y, [triangleVertices], {
      isStatic: false,
      friction: 1,
      render: { fillStyle: "blue" },
      label: "player",
    });
  }
};
