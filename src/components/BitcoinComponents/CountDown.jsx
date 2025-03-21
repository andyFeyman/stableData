function CountDownSection({ days, hours, minutes, seconds }) {
    return (
        <div className="flex flex-row gap-5 text-center justify-center"> {/* Change grid to flex here */}
            <div className="flex flex-col">
                <span className=" font-mono text-5xl">
                    {days}
                </span>
                days
            </div>
            <div className="flex flex-col">
                <span className=" font-mono text-5xl">
                    {hours}
                </span>
                hours
            </div>
            <div className="flex flex-col">
                <span className=" font-mono text-5xl">
                    {minutes}
                </span>
                min
            </div>
            <div className="flex flex-col">
                <span className=" font-mono text-5xl">
                    {seconds}
                </span>
                sec
            </div>
        </div>
    );
}

export default CountDownSection;


