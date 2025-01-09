import { useEffect } from "react"
import Matter from "matter-js";

interface Props {
    engine: Matter.Engine;
    count: number;
}

export default function Particles({ engine, count = 250 }: Props) {
    useEffect(() => {
        const { World } = Matter;

        const particles = [];
        const particleOptions = {
            friction: 0, // No surface friction
            frictionAir: 0.05, // Simulates drag in air
            restitution: 0.2, // Some bounce to simulate interaction
            render: {
                fillStyle: "orange",
            },
        };

        // Generate particles
        for (let i = 0; i < count; i++) {
            const particle = Matter.Bodies.circle(
                200 + Math.random() * 50 - 50, // Random x position
                -100 + Math.random() * 100, // Random y position
                1, // Radius
                particleOptions
            );
            particles.push(particle);
        }

        World.add(engine.world, particles);
    }, [engine])
    return null
}