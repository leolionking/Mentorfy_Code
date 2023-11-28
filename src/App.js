import { useEffect } from "react";
// import '@stripe/stripe-js '
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);
  return (
    <>
    </>
  )
}

export default App
