import { CardList } from "./helpers/CardList";
import Card from "./components/ui/Card";
import Slider from "./components/Slider/HomeSlider";

export default function Home() {
  return (
    <div className="justify-center">
      <Slider />
      <div className="grid text-center lg:grid-cols-4 lg:text-left lg:pt-0">
        {CardList.map((item, index) => {
          return (
            <Card
              key={index}
              href={item.href}
              title={item.title}
              description={item.description}
            />
          );
        })}
      </div>
    </div>
  );
}
