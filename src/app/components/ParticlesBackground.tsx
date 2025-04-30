'use client';

import { useCallback } from "react";
import type { Container, Engine } from "tsparticles-engine";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function ParticlesBackground() {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                fullScreen: {
                    enable: true,
                    zIndex: -1
                },
                background: {
                    color: {
                        value: "#020617",
                    },
                },
                particles: {
                    number: {
                        value: 100,
                        density: {
                            enable: true,
                            area: 800
                        }
                    },
                    color: {
                        value: "#ffffff"
                    },
                    shape: {
                        type: "circle"
                    },
                    opacity: {
                        value: { min: 0.1, max: 0.5 },
                        random: true
                    },
                    size: {
                        value: { min: 1, max: 2 },
                        random: true
                    },
                    move: {
                        enable: false
                    }
                },
                interactivity: {
                    events: {
                        onHover: {
                            enable: false
                        },
                        onClick: {
                            enable: false
                        }
                    }
                },
                detectRetina: true,
                responsive: [
                    {
                        maxWidth: 1024,
                        options: {
                            particles: {
                                number: {
                                    value: 50
                                }
                            }
                        }
                    },
                    {
                        maxWidth: 768,
                        options: {
                            particles: {
                                number: {
                                    value: 30
                                }
                            }
                        }
                    }
                ]
            }}
        />
    );
} 