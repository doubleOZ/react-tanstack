import { useEffect, useState } from 'react';
import './App.css';
import { useQuery } from "react-query";
import { CovidPage } from "./components/CovidPage";
import { CovidByProvince } from "./models/user";
import { getAll, getCurrentTime } from "./services/api";
import { LoadingOutlined } from "@ant-design/icons";
const App = () => {
    //const [result, setResult] = useState<CovidByProvince[]>([])

    const [timeDisplay, setTimeDisplay] = useState<number>();
    const [timeDisplay2, setTimeDisplay2] = useState<number>();
    const [isEnabled, setIsEnabled] = useState<boolean>(false);

    // Queries
    const {
        isLoading: isLoadingData,
        refetch: getData,
        data: result,
        isError
    } = useQuery<CovidByProvince[]>(["summary"], getAll, {
        enabled: true,
        refetchIntervalInBackground: false,
        //initialData: [],
        //onSuccess: (res: CovidByProvince[]) => setResult(res),
        //onError: (err: any) => setResult(err),
    })

    useQuery(["cTime"], getCurrentTime, {
        onSuccess: (res: number) => setTimeDisplay(res),
        refetchIntervalInBackground: true,
        refetchInterval: 1000,
        enabled: true,
    });

    const getAllData = () => {
        try {
            //setResult([]);
            getData();
        } catch (err: any) {
            //setResult(err);
        }
    };

    useEffect(() => {
        if (isEnabled)
            setTimeout(() => {
                setTimeDisplay2(Date.now());
            }, 1000);
    }, [timeDisplay2, isEnabled]);

    return (
        <div className="App">
            {isLoadingData && <LoadingOutlined/>}
            {/*<Button onClick={getAllData}>Force Get Data</Button>*/}
            {result && <CovidPage data={result} setEnabled={setIsEnabled} isEnabled={isEnabled}/>}
        </div>
    );
}

export default App;
