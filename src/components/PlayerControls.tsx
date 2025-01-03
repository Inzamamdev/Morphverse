import Matter from "matter-js";
import { useEffect, useState } from "react";

interface Props {
    playerBodyRef: React.RefObject<Matter.Body>;
}

export const PlayerControls = ({ playerBodyRef }: Props) => {
    const [jumpCount, setJumpCount] = useState(0);
    const [jumpKeyPressed, setJumpKeyPressed] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            updatePlayer(event.key);
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            if (event.key === " ") {
                setTimeout(() => {
                    setJumpKeyPressed(false);
                }, 100)
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [jumpCount, jumpKeyPressed]);

    const updatePlayer = (keyPressed: string) => {
        const { Body } = Matter;
        const playerBody = playerBodyRef.current;

        if (!playerBody) return;

        // Horizontal Movement
        if (keyPressed === "ArrowLeft") {
            Body.setVelocity(playerBody, { x: -1, y: playerBody.velocity.y });
        } else if (keyPressed === "ArrowRight") {
            Body.setVelocity(playerBody, { x: 1, y: playerBody.velocity.y });
        }

        // Jumping Logic
        if (keyPressed === " ") {
            if (!jumpKeyPressed && jumpCount < 2) { // Allow for single or double jump
                setJumpKeyPressed(true);
                Body.applyForce(playerBody, playerBody.position, {
                    x: 0,
                    y: -0.05,
                });
                setJumpCount((prevCount) => prevCount + 1);
            }
        }
        setTimeout(() => {
            if (keyPressed == " " && jumpCount == 2)
                setJumpKeyPressed(false);
        }, 10)

        // Reset jump count when the player lands
        if (Math.abs(playerBody.velocity.y) < 0.01 && jumpCount > 0) {
            setJumpCount(0); // Reset jumps on landing
        }
    };

    return <></>;
};
