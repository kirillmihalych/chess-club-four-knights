// css
import "./assets/css/styles.css";
import "./assets/css/normalize.css";
import "./assets/css/fonts.css";
import "./assets/css/utils.css";
// css blocks
import "./assets/css/blocks/hero.css";
import "./assets/css/blocks/button.css";
import "./assets/css/blocks/links.css";
import "./assets/css/blocks/running_line.css";
import "./assets/css/blocks/content.css";
import "./assets/css/blocks/logo.css";
import "./assets/css/blocks/info.css";
import "./assets/css/blocks/table.css";
import "./assets/css/blocks/title.css";
import "./assets/css/blocks/paginations.css";
import "./assets/css/blocks/carousel.css";
import "./assets/css/blocks/feature-card.css";
import "./assets/css/blocks/player-card.css";
import "./assets/css/blocks/footer.css";
// ts
import Carousel from "./ts/carousel";

document.addEventListener("DOMContentLoaded", () => {
  new Carousel({ name: "features", pagination: "dot" });
  new Carousel({
    name: "players",
    autoplay: true,
    pagination: "number",
    breakpoints: {
      "(min-width: 1366px)": {
        slidesToScroll: 3,
      },
    },
  });
});
