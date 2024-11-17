import { LoadList } from "@/app/functions/ListFunctions";
import { GetAllUnitCosts, PraseCat } from "@/app/functions/LoadData";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function GEtList(Listname : any){
    const [List, setList]  : any = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [UnitDataAll, setUDA] = useState({});
    useEffect(() => {
        async function fetchData() {
            try{
                
                const Listin : any = await LoadList(Listname);
                setList(Listin)
                const UnitDataAllin :any = await GetAllUnitCosts(Listin["CatFile"],true)
                setUDA(UnitDataAllin)
                setLoading(false);
            } catch(error){
                console.log("Error")
                setError(true);
                setLoading(false);
            }
        }
        fetchData();
    }, []);
    const returndata : any = {"List": JSON.stringify(List), "Loading":loading, "Error":error,"AllUnitData":JSON.stringify(UnitDataAll) };
    console.log("Return data",returndata)
    return returndata;
    
}
export default function Page() {
    let params = useLocalSearchParams();
    if (params.hasOwnProperty("ListName")){
        const Listdata : any = GEtList(params["ListName"]);
        if (Listdata["Loading"]){
            
            return(<GestureHandlerRootView style={{ flex: 1 }}>
                <View>
                </View>
                </GestureHandlerRootView>);
        } else if (Listdata["Error"]){
            return router.replace({ pathname: "/"});
        }else{
            console.log(Listdata["AllUnitData"])
            router.replace({ pathname: "/Lists/edit", params: Listdata });
            //return <Redirect href={{
            //    pathname: "/Lists/edit",
                // /* 1. Navigate to the details route with query params */
            //    params:  {"data":Listdata["AllUnitData"]},
            //  }} />;
        }
    } else {
        return router.replace({ pathname: "/"});
    }
    
}