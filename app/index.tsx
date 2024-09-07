import { Text, View } from "react-native";
import {GetW40Index, ReadW40Index, DownloadAllIndex, GetAllUnitCosts, SelectUnitsfromType, PraseCat, GetUnitData, GetunitStats} from "@/app/functions/LoadData";
import {CreateFactionList, AddUnitToList, RemoveUnitFromList, loadLists,DeleteList, DeleteListReload,RemoveModel, AddModel} from "@/app/functions/ListFunctions";
import { jsonDict } from "@/app/functions/Structs";

export async function Startup(){
  await GetW40Index();
  await ReadW40Index();
  await DownloadAllIndex("w40k_10e.json");
  var unitcosts = await GetAllUnitCosts("ImperiumAdeptusMechanicus.cat");
  console.log(unitcosts)
  var battleunits = await SelectUnitsfromType("Battleline",unitcosts)
  console.log(battleunits);
  var Filedata = await PraseCat("ImperiumAdeptusMechanicus.cat");
  var unitData = await GetUnitData("Skitarii Vanguard",Filedata);
  var dataunit = await GetunitStats("Skitarii Vanguard",Filedata);
  var list = await CreateFactionList("ImperiumAdeptusMechanicus.cat", "AdMech", "rw4455grgefd42t",1000);
  list =  await AddUnitToList(list,dataunit)
  list =  await RemoveUnitFromList(list,0)
  list =  await AddUnitToList(list,dataunit)
  list =  await AddUnitToList(list,dataunit)
  list =  await AddUnitToList(list,dataunit)
  list =  await AddUnitToList(list,dataunit)
  list = await AddModel(list, 1, "3e45-6c2d-267f-b7cf",dataunit);
  list = await AddModel(list, 1, "3e45-6c2d-267f-b7cf",dataunit);
  list = await RemoveModel(list, 1, "3e45-6c2d-267f-b7cf",dataunit);
  list = await AddModel(list, 1, "54ca-f341-b75a-6c29",dataunit);
  
  //list =  await RemoveUnitFromList(list,2)
  console.log(list)
  console.log("Done")
  console.log("bdddddsdsdsddidwwwdtch")
  await DeleteList(list)
  let lists = await loadLists()
  console.log(lists)
}

export default function Index() {
  Startup();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
