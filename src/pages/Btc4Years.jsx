import { Helmet } from "react-helmet";
import AthTimeLine from "../components/BitcoinComponents/athTimeLine";
import CountFromLastATH from "../components/BitcoinComponents/CountFromLastATH";

function Btc4Years() {
    return (
        <div className="w-full flex flex-col items-center">
            <Helmet>
                <title>Bitcoin 4 Year Cycle - Understanding Bitcoin's Halving & Price History</title>
                <meta
                    name="description"
                    content="Explore Bitcoin's 4-year halving cycle, historical all-time highs (ATH), and the countdown to the next cycle. Learn how Bitcoin's scarcity drives its price action."
                />
                <meta
                    name="keywords"
                    content="bitcoin, 4-year cycle, halving, all-time high, ATH, price history, bitcoin halving, cryptocurrency, blockchain, investment"
                />
            </Helmet>

            {/* Main Content Container */}
            <div className="container mx-auto px-4 py-8">

                {/* Introduction to the 4-Year Cycle */}
                <section className="mb-8">
                    <div className="divider text-2xl font-bold">What is the Bitcoin 4-Year Cycle?</div>
                    <div className="mb-4 text-center">
                        <p>
                            The Bitcoin 4-year cycle refers to the observation that Bitcoin's price often experiences a
                            significant bull run roughly every four years. 
                           
                        </p>
                        <p>
                            Historically, each halving has been followed by a substantial increase in Bitcoin's price.
        
                        </p>
                    </div>
                </section>

                {/* ATH Timeline Section */}
                <section className="mb-8">
                    <div className="divider text-2xl font-bold">Bitcoin's All-Time Highs (ATH) Timeline</div>
                    <p className="mb-4 text-center">
                        Explore Bitcoin's historical price peaks throughout its 4-year cycles.
                    </p>
                    <AthTimeLine />
                </section>
                

                {/* Countdown to the Next Cycle */}
                <section className="mb-8">
                    <div className="divider text-2xl font-bold">Countdown to the End of the Current Cycle</div>
                    <p className="mb-4 text-center">
                        How much time remains in the current Bitcoin cycle?
                    </p>
                    <CountFromLastATH />
                </section>
                
            </div>
        </div>
    );
}

export default Btc4Years;

