import { Fragment } from "react";
import Header from "./components/layout/Header";
import HomeSection from "./components/home/HomeSection";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <Fragment>
      <Header />
      <HomeSection />
      <Footer />
    </Fragment>
  );
}

export default App;
