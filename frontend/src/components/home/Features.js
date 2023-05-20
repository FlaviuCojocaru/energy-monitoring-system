import Feature from "./Feature";
import "../../styles/home.css";
import { ReactComponent as Icon1 } from "../../images/green2.svg";
import { ReactComponent as Icon2 } from "../../images/monitoring.svg";
import { ReactComponent as Icon3 } from "../../images/insight.svg";
import { ReactComponent as Separator } from "../../images/line2.svg";

const Features = () => {
  const feature1 =
    "Our energy sources are carefully chosen to minimize environmental impact while maximizing efficiency and reliability, ensuring a cleaner and greener future for generations to come.";
  const feature2 =
    "Seamlessly connect your devices to our platform, and watch as the data flows in real-time. Our user-friendly interface makes it easy to monitor and analyze the energy consumption of every device, all in one centralized hub.";
  const feature3 =
    "Our platform provides solutions for analyzing energy consumption, empowering users to make informed decisions, optimize energy usage, and achieve cost savings while reducing environmental impact.";

  return (
    <div className="feature-section">
      <h1 className="question">Why you should choose us?</h1>
      <Separator className="separator" />
      <ul className="feature-items">
        <li>
          <Feature
            icon={Icon1}
            title="Sustainable Solutions"
            description={feature1}
          />
        </li>
        <li>
          <Feature
            icon={Icon2}
            title="Real-time Monitoring"
            description={feature2}
          />
        </li>
        <li>
          <Feature
            icon={Icon3}
            title="Data-driven Insights"
            description={feature3}
          />
        </li>
      </ul>
    </div>
  );
};

export default Features;
