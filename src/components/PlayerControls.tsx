import Matter from "matter-js";
import { useEffect, useState } from "react";

interface Props {
    playerBodyRef: React.RefObject<Matter.Body>;
}

export const PlayerControls = ({ playerBodyRef }: Props) => {
    const [keysPressed, setKeysPressed] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            setKeysPressed((prev) => ({ ...prev, [event.key]: true }));
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            setKeysPressed((prev) => ({ ...prev, [event.key]: false }));
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    useEffect(() => {
        const { Body } = Matter;

        const playerBody = playerBodyRef.current;

        if (!playerBody) return;

        let jumpCount = 0;
        let jumpKeyPressed = false;

        const interval = setInterval(() => {
            if (keysPressed["ArrowLeft"]) {
                Body.setVelocity(playerBody, { x: -3, y: playerBody.velocity.y });
            } else if (keysPressed["ArrowRight"]) {
                Body.setVelocity(playerBody, { x: 2.5, y: playerBody.velocity.y });
            }

            if (keysPressed[" "] && !jumpKeyPressed) {
                if (jumpCount < 1) {
                    Body.applyForce(playerBody, playerBody.position, {
                        x: 0,
                        y: (-0.025 * playerBody.mass), 
                    });
                    jumpCount++; 
                }
                jumpKeyPressed = true; 
            }

            if (!keysPressed[" "]) {
                jumpKeyPressed = false; 
            }

            if (Math.abs(playerBody.velocity.y) < 0.01 && jumpCount > 0) {
                jumpCount = 0; 
            }
        }, 50);

        return () => clearInterval(interval);
    }, [keysPressed, playerBodyRef]);

    return <></>;
};
