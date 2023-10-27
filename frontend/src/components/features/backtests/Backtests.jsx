import DividendStats from "./dividends/DividendStats"
import { useState } from "react"
import SideNav from "./SideNav";

export default function Backtests() {

    const [currentComponent, setCurrentComponent] = useState(null);

    const components = {
        dividendStats: <DividendStats />
    }

    return <div className="flex m-4 w-full">
        <SideNav setCurrentComponent={setCurrentComponent} components={components} />
        <div className="flex flex-col items-center w-full">
            {currentComponent ? currentComponent : <h1>wtf</h1>}
        </div>
    </div>
}