import useSWR from "swr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Slip = {
  id: number;
  advice: string;
};

const url = "https://api.adviceslip.com/advice";

const fetcher = async (url: string): Promise<Slip> => {
  const res = await fetch(url);
  const data = await res.json();
  return data.slip;
};

const RandomQuote = () => {
  const {
    data: quote,
    error,
    isLoading,
    mutate,
  } = useSWR<Slip>(url, fetcher, {
    revalidateOnFocus: false,
  });

  const copyToClipboard = () => {
    if (!quote) return;
    navigator.clipboard.writeText(quote.advice);
    toast.success("Quote copied to clipboard!");
  };

  return (
    <div className="App">
      <p className="advice">ADVICE #{quote?.id ?? "..."}</p>
      <p className="quote-text">
        {isLoading
          ? "Loading..."
          : error
          ? "Failed to load quote"
          : `“${quote.advice}”`}
      </p>
      <div className="divider">
        <span className="lines">||</span>
      </div>
      <div className="button-container">
        <button className="button" onClick={() => mutate()}>
          <span className="icon-dice"></span>
        </button>
        <button className="button" onClick={copyToClipboard}>
          <span className="icon-copy"></span>
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RandomQuote;
