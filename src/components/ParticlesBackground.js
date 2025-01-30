import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadLinksPreset } from "tsparticles-preset-links";

const ParticlesBackground = () => {
  // The init callback – here we load the preset
  const particlesInit = useCallback(async (engine) => {
    await loadLinksPreset(engine);
  }, []);

  // Here we override default preset settings:
  // - Transparent background
  // - White particle color
  // - "repulse" on hover and "push" on click
  // - Move speed, link distance, etc.
  const particlesOptions = {
    preset: "links", // Use the links preset
    background: {
      color: {
        value: "transparent", 
      },
    },
    // Additional customizations below
    particles: {
      // This overrides the default color used by the preset
      color: { value: "#fcfcfc" },
      // The links preset automatically includes "links" functionality, but
      // you can override them here:
      links: {
        color: "#fcfcfc",
        distance: 150,
        enable: true,
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1,
        outModes: {
          default: "bounce",
        },
      },
      number: {
        value: 80, 
        density: {
          enable: true,
          area: 800,
        },
      },
      opacity: {
        value: 0.5,
      },
      size: {
        value: { min: 1, max: 5 },
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "repulse", 
        },
        onClick: {
          enable: true,
          mode: "push", 
        },
      },
      modes: {
        push: {
          quantity: 3,
        },
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    detectRetina: true,
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={particlesOptions}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1, // ensure particles are behind other content
      }}
    />
  );
};

export default ParticlesBackground;
