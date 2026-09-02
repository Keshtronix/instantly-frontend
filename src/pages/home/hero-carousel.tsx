import carouselImageThree from "@/assets/images/carosuel-img-3.png";
import carouselImageOne from "@/assets/images/carousel-img-1.png";
import carouselImageTwo from "@/assets/images/carousel-img-2.png";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PUBLIC_ROUTES } from "@/routes/route";
import { Link } from "react-router-dom";

const heroSlides = [
  {
    id: "carousel-2",
    subtitle: "New customers",
    // title: (
    //   <>
    //     <span className="mark-label">$0 delivery fees</span> <br /> on above $20
    //     orders
    //   </>
    // ),
    title: "$0 delivery fees on above $20 orders",
    action: "Shop now",
    note: "Min spend $20. No delivery or service fees apply.",
    image: carouselImageTwo,
  },
  {
    id: "carousel-3",
    subtitle: "Fresh picks daily",
    title: "Build your week around produce that tastes better",
    action: "Explore recipes",
    note: "Seasonal groceries delivered when you need them.",
    image: carouselImageThree,
  },
  {
    id: "carousel-1",
    subtitle: "Feeding Everyone x instant",
    title: "For 21M kids, summer break means no lunch",
    action: "Donate groceries",
    note: "Help families get fresh food this season.",
    image: carouselImageOne,
  },
];

const HeroCarousel = () => {
  return (
    <section className="w-full py-5">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {heroSlides.map((slide) => (
            <CarouselItem
              key={slide.id}
              className="basis-full pl-4 lg:basis-1/2"
            >
              <article
                className="relative h-[250px] overflow-hidden shadow-xs rounded-xl border
               border-black/10 bg-white md:h-[260px]"
              >
                <img
                  src={slide.image}
                  alt=""
                  className="absolute inset-0 size-full object-cover"
                />

                {/* Solid white panel behind text — no blending with image colors */}
                <div
                  className="absolute inset-y-0 left-0 w-full bg-white sm:w-[55%]
                      [mask-image:linear-gradient(to_right,white_75%,transparent_100%)]
                      sm:[mask-image:linear-gradient(to_right,white_80%,transparent_100%)]"
                                  />
                {/* subtle white wash so text panel blends with the mono image */}
                {/* <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent sm:from-white sm:via-white/40 sm:to-transparent" /> */}

                <div className="relative z-10 flex h-full sm:max-w-[50%] flex-col justify-center gap-5 p-7 md:p-9">
                  {slide.subtitle && (
                    <p className="text-sm font-bold uppercase tracking-wide text-black/60">
                      {slide.subtitle}
                    </p>
                  )}
                  <h1 className="text-2xl font-bold leading-tight md:text-2xl text-black">
                    {slide.title}
                  </h1>
                  <Button
                    asChild
                    variant="outline"
                    className="h-10 w-fit rounded-full border-2 border-black bg-transparent px-7 text-base
                     text-black hover:bg-black hover:text-white transition-colors"
                  >
                    <Link to={PUBLIC_ROUTES.PRODUCTS}>{slide.action}</Link>
                  </Button>
                </div>

                {/* <p className="absolute bottom-3 left-7 right-7 z-10
                 truncate text-center text-sm text-muted-foreground">
                  {slide.note}
                </p> */}
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="-left-4 size-10! hidden border border-black/20 bg-white text-black shadow-lg lg:inline-flex" />
        <CarouselNext className="-right-4 size-10! border border-black/20 bg-white text-black shadow-lg" />
      </Carousel>
    </section>
  );
};

export default HeroCarousel;
