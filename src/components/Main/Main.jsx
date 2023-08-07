import Header from "../Header/Header";
import AboutProject from "./AboutProject/AboutProject";
import Promo from "./Promo/Promo";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "./Portfolio/Portfolio";
import Footer from "../Footer/Footer";

export default function Main() {
  return (
    <>
      <Header backgroundColor="#073042" theme={{ default: false }} />
      <main>
        <Promo />
        <AboutProject/>
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </>
  )
}
