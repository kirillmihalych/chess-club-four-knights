// css
import "/src/css/styles.css";
import "/src/css/normalize.css";
import "/src/css/fonts.css";
import "/src/css/utils.css";
// css blocks
import "/src/css/blocks/hero.css";
import "/src/css/blocks/button.css";
import "/src/css/blocks/links.css";
import "/src/css/blocks/running_line.css";
import "/src/css/blocks/content.css";
import "/src/css/blocks/logo.css";
import "/src/css/blocks/info.css";
import "/src/css/blocks/table.css";
import "/src/css/blocks/title.css";
import "/src/css/blocks/paginations.css";
import "/src/css/blocks/carousel.css";
import "/src/css/blocks/feature-card.css";
import "/src/css/blocks/player-card.css";
import "/src/css/blocks/footer.css";
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
