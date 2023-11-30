import { useEffect, useState } from "react";
// import '@stripe/stripe-js '
import AOS from "aos";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);

  const getOnLineStatus = () => navigator.onLine;

  const useNavigatorOnLine = () => {
    const [status, setStatus] = useState(getOnLineStatus());

    const setOnline = () => setStatus(true);
    const setOffline = () => setStatus(false);

    useEffect(() => {
      window.addEventListener("online", setOnline);
      window.addEventListener("offline", setOffline);

      return () => {
        window.removeEventListener("online", setOnline);
        window.removeEventListener("offline", setOffline);
      };
    }, []);
    console.log(status);
    return status;
  };


  return <></>;
}

export default App;
