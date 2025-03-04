export default function Footer() {
    return (
        <footer className="footer footer-center bg-base-300 text-base-content p-3">
            <aside className="flex items-center mt-2 ">
                <p>Copyright © {new Date().getFullYear()} - All right reserved by ChainMonitor. </p>
                <div className="flex flex-row w-10 px-2">
                    <p className="mx-2">Question? </p>
                    <a href="https://x.com/Chain_Monitor" target="_blank" rel="noopener noreferrer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            className="fill-current mb-3">
                            <path d="m0,0v24h24V0H0Zm15.063,19.232l-3.87-5.055-4.422,5.055h-2.458l5.733-6.554-6.046-7.91h5.062l3.494,4.621,4.043-4.621h2.455l-5.361,6.126,6.307,8.337h-4.937Z"></path>
                        </svg>
                        
                    </a>
                </div>
            </aside>            

        </footer>
        // <footer className="footer footer-center bg-base-300 text-base-content pt-4 ">
        //     <aside className="flex flex-row">
        //         <p>Copyright © {new Date().getFullYear()} - All right reserved by ChainMonitor.
        //             {/* X Icon */}
        //             <a
        //                 href="https://x.com/Chain_Monitor"
        //                 target="_blank"
        //                 rel="noopener noreferrer"

        //             >
        //             <div className="w-2 h-2">

        //                 <svg xmlns="http://www.w3.org/2000/svg" id="Capa_1" data-name="Capa 1" viewBox="0 0 24 24">
        //                     <polygon points="6.861 6.159 15.737 17.764 17.097 17.764 8.322 6.159 6.861 6.159" />
        //                     <path d="m0,0v24h24V0H0Zm15.063,19.232l-3.87-5.055-4.422,5.055h-2.458l5.733-6.554-6.046-7.91h5.062l3.494,4.621,4.043-4.621h2.455l-5.361,6.126,6.307,8.337h-4.937Z" />
        //                 </svg>
        //             </div>

        //                 Contract Dev?
        //             </a>
        //         </p>

        //     </aside>
        // </footer>
    )
};

