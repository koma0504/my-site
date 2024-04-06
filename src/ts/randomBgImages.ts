// imageDisplay.ts

import { getCurrentTheme } from "./themeState";
import { addObserver } from "./util/observer";

export function displayImageBasedOnTheme(): void {
  const darkImages = document.querySelectorAll("#dark_images img");
  const lightImages = document.querySelectorAll("#light_images img");

  const updateImage = (theme) => {
    const darkRandomImg = darkImages[Math.floor(Math.random() * darkImages.length)];
    const lightRandomImg = lightImages[Math.floor(Math.random() * lightImages.length)];

    // Hide all images first
    darkImages.forEach((img) => (img.style.display = "none"));
    lightImages.forEach((img) => (img.style.display = "none"));

    // Display a random image based on the theme
    if (theme === "dark") {
      darkRandomImg.style.display = "block";
      console.log("Displayed a random dark mode image");
    } else {
      lightRandomImg.style.display = "block";
      console.log("Displayed a random light mode image");
    }
  };

  addObserver(updateImage);
  updateImage(getCurrentTheme());
}

document.addEventListener("DOMContentLoaded", displayImageBasedOnTheme);
