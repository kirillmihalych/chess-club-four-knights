type ICarouselName = "features" | "players";
type IPagionation = "dot" | "number";

interface ICarouselOptions {
  name?: ICarouselName;
  autoplay?: boolean;
  pagination?: IPagionation;
  slidesToScroll?: number;
  breakpoints?: Record<string, ICarouselOptions>;
}

export default class Carousel {
  options!: ICarouselOptions;
  carousel!: HTMLElement;
  carouselContainer!: HTMLElement | null;
  slide!: HTMLElement | null;
  slides!: NodeListOf<HTMLElement>;
  slidesLength!: number;
  prevBtn!: HTMLElement | null;
  nextBtn!: HTMLElement | null;
  activeSlide: number = 0;
  pagination!: HTMLElement | null;
  pages!: NodeListOf<HTMLElement>;
  pageNumber!: HTMLElement | null;

  constructor(options: ICarouselOptions) {
    this.options = options;

    this.initElements();
    this.initControls();
    this.initPagination();
    this.handlePagination();
    this.updateControls();
    this.handleResize();
  }

  initElements() {
    const carouselAttrSelector = `[data-carousel="${this.options.name}"]`;
    const itemsSelector = `.carousel__items`;

    this.carousel = document.querySelector<HTMLElement>(
      carouselAttrSelector
    ) as HTMLElement;
    this.carouselContainer = document.querySelector<HTMLElement>(
      carouselAttrSelector + " " + itemsSelector
    );
    this.slide = document.querySelector<HTMLElement>(
      `${carouselAttrSelector} .carousel__item`
    );
    this.slides = document.querySelectorAll(
      `${carouselAttrSelector} .carousel__item`
    );
    this.slidesLength = this.slides.length - 1;
    this.prevBtn = document.querySelector<HTMLElement>(
      `${carouselAttrSelector} .carousel__prev`
    );
    this.nextBtn = document.querySelector<HTMLElement>(
      `${carouselAttrSelector} .carousel__next`
    );
  }

  initControls() {
    this.nextBtn?.addEventListener("click", () => this.nextSlide());
    this.prevBtn?.addEventListener("click", () => this.prevSlide());
  }

  initPagination() {
    const carouselAttrSelector = `[data-carousel="${this.options.name}"]`;
    this.pagination = document.querySelector(
      `${carouselAttrSelector} .pagination`
    );
    this.pages = document.querySelectorAll(
      `${carouselAttrSelector} .pagination__page`
    );
    this.pageNumber = document.querySelector(
      `${carouselAttrSelector} .pagination__text_number`
    );
  }

  getNextSlide(): number | undefined {
    let nextSlide;
    if (this.options.breakpoints) {
      Object.keys(this.options.breakpoints).forEach((key) => {
        if (matchMedia(key).matches && this.options.breakpoints) {
          if (this.options.breakpoints[key].slidesToScroll) {
            nextSlide = this.options.breakpoints[key].slidesToScroll;
          }
        }
      });
    }
    return nextSlide;
  }

  handlePagination() {
    const activePageClass = "pagination__page_active";
    if (this.options.pagination === "dot") {
      this.pages.forEach((page, index) => {
        if (index === this.activeSlide) {
          page.classList.add(activePageClass);
        } else {
          page.classList.remove(activePageClass);
        }
      });
    }

    if (this.options.pagination === "number") {
      if (!this.pageNumber) return;
      if (document.documentElement.clientWidth >= 1366) {
        this.pageNumber.textContent = `${this.activeSlide + 3}`;
      } else {
        this.pageNumber.textContent = `${this.activeSlide + 1}`;
      }
    }
  }

  nextSlide() {
    if (this.activeSlide >= this.slidesLength) return;
    else {
      let nextSlide = this.getNextSlide();
      if (nextSlide) {
        this.activeSlide += nextSlide;
      } else {
        this.activeSlide += 1;
      }
      this.updateSlidePosition();
      this.handlePagination();
      this.updateControls();
    }
  }

  prevSlide() {
    if (this.activeSlide <= 0) return;
    else {
      let nextSlide = this.getNextSlide();
      if (nextSlide) {
        this.activeSlide -= nextSlide;
      } else {
        this.activeSlide -= 1;
      }
      this.updateSlidePosition();
      this.handlePagination();
      this.updateControls();
    }
  }

  updateSlidePosition() {
    if (!this.slide || !this.carouselContainer) return;
    const width = this.slide.getBoundingClientRect().width + 20;
    const newPosition = this.activeSlide * width;
    this.carouselContainer.setAttribute(
      "style",
      `transform: translate3d(-${newPosition}px,0px,0px)`
    );
  }

  updateControls() {
    const isAtStart = this.activeSlide === 0;
    let isAtEnd = this.activeSlide === this.slidesLength;
    if (
      this.options.pagination === "number" &&
      document.documentElement.clientWidth >= 1366
    ) {
      isAtEnd = this.activeSlide + 3 >= this.slidesLength;
    }

    this.nextBtn?.toggleAttribute("disabled", isAtEnd);
    this.prevBtn?.toggleAttribute("disabled", isAtStart);
  }

  handleResize() {
    addEventListener("resize", () => {
      this.carouselContainer?.setAttribute(
        "style",
        `transform: translate3d(-0px,0px,0px)`
      );
      this.activeSlide = 0;
      this.handlePagination();
    });
  }
}
