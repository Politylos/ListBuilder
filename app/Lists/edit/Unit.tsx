import * as React from "react";
import {Text, StyleSheet, View, Pressable, TouchableOpacity} from "react-native";
import { faPencil } from '@fortawesome/free-solid-svg-icons/faPencil';
import { faAdd } from '@fortawesome/free-solid-svg-icons/faAdd';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faMinus} from '@fortawesome/free-solid-svg-icons/faMinus';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons/faPeopleGroup'; // Change to ball pile
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar'; 
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash'; 
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {AddModel, AddUnitToList, LoadList, RemoveModel, RemoveUnitFromList, SaveList} from "@/app/functions/ListFunctions";
import { GetAllUnitCosts, GetUnitData, GetunitStats, PraseCat } from '@/app/functions/LoadData';

function GetRawData(Listname : any,unitname : string){
    const [unitData, setunitData]  : any = useState({});
    const [dataunit, setdataunit]  : any = useState({});
    const [List, setList]  : any = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(() => {
        async function fetchData() {
            try{
                
                const Filedata : any = await PraseCat(Listname);
                console.log("Running get data")
                const gud = await GetUnitData(unitname,Filedata);
                const gus = await GetunitStats(unitname,Filedata)
                setunitData(gud);
                setdataunit(gus);
                console.log(dataunit);
                console.log(unitData);
                setList(Filedata)
                setLoading(false);
            } catch(error){
                console.log("Error")
                setError(true);
                setLoading(false);
            }
        }
        
        fetchData();
    }, []);
    
    const returndata : any ={"RawData": List, "Loading":loading, "Error":error, "dataunit":dataunit };
    return returndata;
    
}

export default function Page() {

    const params : any = useLocalSearchParams();
    console.log(params)
    const [ListData, SetListData] : any = useState(JSON.parse(params["List"]))
    const [UnitData, SetUnitData] : any = useState(JSON.parse(params["unit"]))
    const [UnitCostdataAll, SetUCAData] : any = useState(JSON.parse(params["UnitCostdataAll"]))
    const unitIndex = params["UnitIndex"];

    const RawData : any = GetRawData(ListData["CatFile"],UnitCostdataAll["ID"][UnitData["ID"]]);

    console.log(UnitCostdataAll);
    console.log(UnitData);
    var unitAll = {};
    async function AddNewWep(wepID : string){
        console.log("This is the new weps");
        const Newlistdata = await AddModel(ListData,unitIndex,wepID,RawData["dataunit"])
        SaveList(Newlistdata);
        console.log("Added model")
        SetListData(Newlistdata);
        console.log("New list data")
        SetUnitData(Newlistdata["Units"][unitIndex])
        console.log("Set unitdata")
        //forceRender((prev: any) => !prev);
        console.log("Updated the data yay", UnitData)
    }
    async function RemoveWep(wepID : string){
        const Newlistdata = await RemoveModel(ListData,unitIndex,wepID,RawData["dataunit"])
        SaveList(Newlistdata);
        console.log("Added model")
        SetListData(Newlistdata);
        console.log("New list data")
        SetUnitData(Newlistdata["Units"][unitIndex])
        console.log("Set unitdata")
        //forceRender((prev: any) => !prev);
        console.log("Updated the data yay", UnitData)
    }
    async function RemoveUnit(){
        const Newlistdata = await RemoveUnitFromList(ListData,unitIndex);
        SetListData(Newlistdata);
        router.back()
    }
    function Finish(){
        router.back()
    }
    function CheckifUnit(wep : string){
        if (RawData["dataunit"].hasOwnProperty("Units")){
            if(RawData["dataunit"]["Units"] != null){
                return Object.keys(RawData["dataunit"]["Units"]).includes(wep);
            }
        }
        return false;
    }
    function CheckifWep(wep : string){
        console.log(RawData["dataunit"].hasOwnProperty("Weapons"), RawData["dataunit"])
        if (RawData["dataunit"].hasOwnProperty("Weapons")){
            if(RawData["dataunit"]["Weapons"] != null){
                return Object.keys(RawData["dataunit"]["Weapons"]).includes(wep);
            }
        }
        return false;
    }
    function CurrentWep(name : any, UnitData : any, unitAll  :any){
        var wepName = RawData["dataunit"]["Weapons"][name]["name"];
        if (wepName.includes("w/")){
            wepName = wepName.split("w/")[1];
        }
        return (<View style={[styles.unitCard2, styles.frameFlexBox]}>
            <Text style={[styles.weapon, styles.cardFlexBox]}>{wepName}</Text>
            <View style={styles.wrapperFlexBox}>
                <View style={styles.wrapperFlexBox}>
                    <View style={[styles.frameContainer, styles.wrapperFlexBox]}>
                        <TouchableOpacity style={styles.plusFrameShadowBox} onPressOut={()=>RemoveWep(name)}>
                            <FontAwesomeIcon icon={faMinus} style={[styles.minus, styles.cardFlexBox]} />
                        </TouchableOpacity>
                        <Text style={[styles.text, styles.textTypo]}>{UnitData["Weapons"][name]}</Text>
                        <TouchableOpacity style={styles.plusFrameShadowBox} onPressOut={()=>AddNewWep(name)}>
                            <FontAwesomeIcon icon={faPlus} style={[styles.minus, styles.cardFlexBox]} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>)
    }
    function AddWepCard(name : any, UnitData : any, unitAll  :any){
        console.log("Adding a wep",name)
        if (RawData["dataunit"]["Weapons"][name].hasOwnProperty("name")){
            if (RawData["dataunit"]["Weapons"][name]["typeName"] != "Abilities"){
                var wepName = RawData["dataunit"]["Weapons"][name]["name"];
                console.log("what is happeing to this ", wepName)
                if (wepName.includes("w/")){
                    wepName = wepName.split("w/")[1];
                }
                return (<View style={[styles.unitCard2, styles.frameFlexBox]}>
                    <Text style={[styles.weapon, styles.cardFlexBox]}>{wepName}</Text>
                    <View style={styles.wrapperFlexBox}>
                        <View style={styles.wrapperFlexBox}>
                            <View style={[styles.frameContainer, styles.wrapperFlexBox]}>
                                <TouchableOpacity style={styles.plusFrameShadowBox} onPressOut={()=>AddNewWep(name)}>
                                    <FontAwesomeIcon icon={faPlus} style={[styles.minus, styles.cardFlexBox]} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>)
            }
        }
    }
    function CurrentUnitBase(UnitData : any, unitAll  :any){
        var hasbaseunit = false;
        Object.keys(UnitData["Weapons"]).map((unit:any) => {
            if (CheckifWep(unit)){
                hasbaseunit = true;
            }
        })
        if (hasbaseunit){
            console.log("unit base",UnitData["Weapons"] != null,UnitData["Weapons"])
            return(<View style={styles.modelCard}>
                <View style={[styles.frameView, styles.frameFlexBox]}>
                    <View style={[styles.modelCardWrapper, styles.wrapperFlexBox]}>
                        <Text style={[styles.modelCard1, styles.cardFlexBox]}>{UnitCostdataAll["ID"][UnitData["ID"]]}</Text>
                    </View>
                    <View style={styles.wrapperFlexBox}>
            <View style={[styles.frameContainer, styles.wrapperFlexBox]}>
                    <Text style={[styles.text, styles.textTypo]}>{9}</Text>
            </View>
        </View>
                </View>
                {
                    Object.keys(UnitData["Weapons"]).map((unit:any) => {
                                            if (CheckifWep(unit)){
                                                console.log("Adding wep",unit)
                                                return CurrentWep(unit, UnitData, unitAll);
                                            }
                                        })
                    }
            </View>)
        }
    }
    function AddUnitBase(UnitData : any, unitAll  :any){
        console.log(RawData["dataunit"]["Weapons"])
        if (RawData["dataunit"]["Weapons"] != null){
            console.log("what why");
            return(<View style={styles.modelCard}>
                <View style={[styles.frameView, styles.frameFlexBox]}>
                    <View style={[styles.modelCardWrapper, styles.wrapperFlexBox]}>
                        <Text style={[styles.modelCard1, styles.cardFlexBox]}>{UnitCostdataAll["ID"][UnitData["ID"]]}</Text>
                    </View>
                    <View style={styles.wrapperFlexBox}>
        </View>
                </View>
                {
                    Object.keys(RawData["dataunit"]["Weapons"]).map((unit:any) => {
                        console.log("This is the unitdagtttt",Object.keys(UnitData["Weapons"]),unit)
                                            if (!Object.keys(UnitData["Weapons"]).includes(unit)){
                                                console.log(unit)
                                                return AddWepCard(unit, UnitData, unitAll);
                                            }
                                        })
                }
            </View>)
        }
    return(<View style={styles.modelCard}>
        <View style={[styles.frameView, styles.frameFlexBox]}>
            <View style={[styles.modelCardWrapper, styles.wrapperFlexBox]}>
                <Text style={[styles.modelCard1, styles.cardFlexBox]}>{UnitCostdataAll["ID"][UnitData["ID"]]}</Text>
            </View>
            <View style={styles.wrapperFlexBox}>
            </View>
        </View>
        
    </View>)
}
    function CurrentUnit(name : any, UnitData : any, unitAll  :any){
        if (RawData["Loading"] == false){
            var wepName = RawData["dataunit"]["Units"][name]["name"];
            return(<View style={styles.modelCard}>
                <View style={[styles.frameView, styles.frameFlexBox]}>
                    <View style={[styles.modelCardWrapper, styles.wrapperFlexBox]}>
                        <Text style={[styles.modelCard1, styles.cardFlexBox]}>{wepName}</Text>
                    </View>
                    <View style={styles.wrapperFlexBox}>
                        <View style={[styles.frameContainer, styles.wrapperFlexBox]}>
                            <TouchableOpacity style={styles.plusFrameShadowBox}>
                                <FontAwesomeIcon icon={faMinus} style={[styles.minus, styles.cardFlexBox]} />
                            </TouchableOpacity>
                                <Text style={[styles.text, styles.textTypo]}>{UnitData["Weapons"][name]}</Text>
                            <TouchableOpacity style={styles.plusFrameShadowBox}>
                                <FontAwesomeIcon icon={faPlus} style={[styles.minus, styles.cardFlexBox]} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                
            </View>)
        }
    }
    function CreateUnitWepsFromUnits(){
        if (RawData["dataunit"]["Units"]!=null){
            return (Object.keys(RawData["dataunit"]["Units"]).map((unit:any) => {
                if (!Object.keys(UnitData["Weapons"]).includes(unit)){
                    return CurrentUnit(unit, UnitData, unitAll);
                }
            }))
        }
    }
    console.log("Parent rendered");
    if ((Object.keys(RawData).length > 0) && RawData.hasOwnProperty("RawData")){
        
        if (RawData["Loading"] == false){
            var unitcardunit;
            
            return (
            <Pressable style={styles.editAUnit} onPress={() =>{}}>
                <View style={styles.scrollView}>
                    <View style={styles.frameParent}>
                        <Pressable onPress={() => {}}>
                            <View style={styles.unitCard}>
                                <View style={[styles.frameGroup, styles.frameFlexBox]}>
                                    <View style={styles.wrapperFlexBox}>
                                        <View style={styles.nameAndType}>
                                            <Text style={[styles.unitCard1, styles.cardFlexBox]}>{UnitCostdataAll["ID"][UnitData["ID"]]}</Text>
                                        </View>
                                    </View>
                                    <View style={[styles.frameContainer, styles.wrapperFlexBox]}>
                                        <View style={[styles.ballPileParent, styles.wrapperFlexBox]}>
                                            <FontAwesomeIcon icon={faPeopleGroup} style={styles.ballPile} />
                                            <Text style={[styles.text, styles.textTypo]}>{UnitData["size"]}</Text>
                                        </View>
                                        <View style={[styles.ballPileParent, styles.wrapperFlexBox]}>
                                            <FontAwesomeIcon icon={faStar} style={styles.ballPile} />
                                            <Text style={[styles.text, styles.textTypo]}>{UnitData["Cost"]}</Text>
                                        </View>
                                    </View>
                                </View>
                                
                                {
                                    Object.keys(UnitData["Weapons"]).map((unit:any) => {
                                        if (CheckifUnit(unit)){
                                            return CurrentUnit(unit, UnitData, unitAll);
                                        }
                                    })
                                }
                                {
                                    CurrentUnitBase(UnitData, unitAll)
                                }
                            </View>
                            
                        </Pressable>
                        <View style={styles.unitCard}>
                                <View style={[styles.frameGroup, styles.frameFlexBox]}>
                                    <View style={styles.wrapperFlexBox}>
                                        <View style={styles.nameAndType}>
                                            <Text style={[styles.unitCard1, styles.cardFlexBox]}>Add Model</Text>
                                        </View>
                                    </View>
                                    <View style={[styles.frameContainer, styles.wrapperFlexBox]}>
                                        <View style={[styles.ballPileParent, styles.wrapperFlexBox]}>
                                            <FontAwesomeIcon icon={faPlus} style={styles.ballPile} />
                                        </View>
                                    </View>
                                </View>
                                
                                {
                                    CreateUnitWepsFromUnits()
                                }
                                {
                                    AddUnitBase(UnitData, unitAll)
                                }
                            </View>
                    </View>
                </View>
                    <TouchableOpacity style={[styles.back1, styles.backShadowBox]} onPress={() => Finish()}>
                        <FontAwesomeIcon icon={faCheck} style={[styles.check, styles.closePosition]} />
                    </TouchableOpacity>
                    <Text style={styles.editUnit}>Edit Unit</Text>
                    <TouchableOpacity style={[styles.back, styles.backShadowBox]} onPress={() => RemoveUnit()}>
                        <FontAwesomeIcon icon={faTrash} style={[styles.check, styles.closePosition]} />
                    </TouchableOpacity>
            </Pressable>);
        }
    }
    return (
        <Pressable style={styles.editAUnit} onPress={() =>{}}>
            <View style={styles.scrollView}>
                <View style={styles.frameParent}>
                    <Pressable onPress={() => {}}>
                        <View style={styles.unitCard}>
                            <View style={[styles.frameGroup, styles.frameFlexBox]}>
                                <View style={styles.wrapperFlexBox}>
                                    <View style={styles.nameAndType}>
                                        <Text style={[styles.unitCard1, styles.cardFlexBox]}>{UnitCostdataAll["ID"][UnitData["ID"]]}</Text>
                                    </View>
                                </View>
                                <View style={[styles.frameContainer, styles.wrapperFlexBox]}>
                                    <View style={[styles.ballPileParent, styles.wrapperFlexBox]}>
                                        <FontAwesomeIcon icon={faPeopleGroup} style={styles.ballPile} />
                                        <Text style={[styles.text, styles.textTypo]}>{UnitData["size"]}</Text>
                                    </View>
                                    <View style={[styles.ballPileParent, styles.wrapperFlexBox]}>
                                        <FontAwesomeIcon icon={faStar} style={styles.ballPile} />
                                        <Text style={[styles.text, styles.textTypo]}>{UnitData["Cost"]}</Text>
                                    </View>
                                </View>
                            </View>
                            {
                                Object.keys(UnitData["Weapons"]).map((unit:any) => {
                                        return CurrentUnit(unit, UnitData, unitAll);
                                })
                            }
                        </View>
                    </Pressable>
                    <View style={styles.emptyCard}>
                        <View style={styles.plusParent}>
                            <Text style={[styles.plus6, styles.plus6Clr]}>plus</Text>
                            <Text style={[styles.addAUnit, styles.plus6Clr]}>Add Models</Text>
                        </View>
                    </View>
                </View>
            </View>
                <TouchableOpacity style={[styles.back1, styles.backShadowBox]} onPress={() => Finish()}>
                    <FontAwesomeIcon icon={faCheck} style={[styles.check, styles.closePosition]} />
                </TouchableOpacity>
                <Text style={styles.editUnit}>Edit Unit</Text>
                <TouchableOpacity style={[styles.back, styles.backShadowBox]} onPress={() => RemoveUnit()}>
                    <FontAwesomeIcon icon={faTrash} style={[styles.check, styles.closePosition]} />
                </TouchableOpacity>
        </Pressable>);

};
const styles = StyleSheet.create({
    frameFlexBox: {
    justifyContent: "space-between",
    flexDirection: "row"
    },
    minusFlexBox: {
    textAlign: "left",
    color: "#000"
    },
    wrapperFlexBox: {
    flexDirection: "row",
    alignItems: "center"
    },
    textTypo: {
    textAlign: "center",
    fontSize: 14,
    color: "#000"
    },
    plus6Clr: {
    color: "#fff",
    textAlign: "center"
    },
    backShadowBox: {
    height: 40,
    width: 40,
    borderRadius: 100,
    shadowColor: "rgba(0, 0, 0, 0.15)",
    top: 20,
    shadowOpacity: 1,
    elevation: 1,
    shadowRadius: 1,
    shadowOffset: {
    width: 0,
    height: 1
    },
    position: "absolute",
    overflow: "hidden"
    },
    closePosition: {
    fontSize: 20,
    top: "50%",
    marginTop: -10,
    left: "50%",
    
    textAlign: "left",
    color: "#000",
    position: "absolute"
    },
    unitCard1: {
    fontSize: 16,
    
    fontWeight: "700",
    alignSelf: "stretch"
    },
    nameAndType: {
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5
    },
    ballPile: {
    
    },
    text: {
    
    fontWeight: "700"
    },
    ballPileParent: {
    gap: 5
    },
    frameContainer: {
    gap: 10
    },
    frameGroup: {
    paddingRight: 10,
    alignSelf: "stretch",
    alignItems: "center"
    },
    modelCard1: {
    fontWeight: "600",
    fontSize: 14,
    textAlign: "left",
    color: "#000",
    
    },
    modelCardWrapper: {
    height: 17,
    paddingVertical: 2,
    width: 133,
    paddingHorizontal: 0
    },
    minus: {
    
    fontSize: 14
    },
    plusFrameShadowBox: {
    paddingVertical: 6,
    paddingHorizontal: 15,
    height: 18,
    width: 18,
    borderRadius: 5,
    shadowOpacity: 1,
    elevation: 1,
    shadowRadius: 1,
    shadowOffset: {
    width: 0,
    height: 1
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    justifyContent: "center",
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden"
    },
    frameView: {
    width: 290,
    paddingBottom: 10,
    alignItems: "center"
    },
    weapon: {
    width: 133,
    fontSize: 14,
    
    },
    unitCard2: {
    borderStyle: "solid",
    borderColor: "#dfdfdf",
    borderTopWidth: 1,
    paddingVertical: 10,
    alignSelf: "stretch",
    paddingHorizontal: 0
    },
    modelCard: {
    backgroundColor: "#ececec",
    width: 310,
    paddingHorizontal: 10,
    paddingTop: 10,
    borderRadius: 10
    },
    unitCard: {
    backgroundColor: "#d1d1d1",
    gap: 5,
    padding: 5,
    width: 320,
    borderRadius: 10
    },
    plus6: {
    fontSize: 24,
    
    },
    addAUnit: {
    fontSize: 14,
    
    fontWeight: "700"
    },
    plusParent: {
    justifyContent: "flex-end",
    gap: 5,
    alignItems: "center"
    },
    emptyCard: {
    borderStyle: "dashed",
    borderColor: "#d1d1d1",
    borderWidth: 2,
    height: 80,
    justifyContent: "center",
    padding: 5,
    width: 320,
    borderRadius: 10,
    alignItems: "center"
    },
    frameParent: {
    height: 740,
    padding: 20,
    gap: 25,
    alignSelf: "stretch",
    alignItems: "center"
    },
    scrollView: {
    top: 0,
    left: 0,
    width: 360,
    paddingVertical: 60,
    paddingHorizontal: 0,
    alignItems: "center",
    position: "absolute",
    height: 800
    },
    close: {
    marginLeft: -6
    },
    back: {
    left: 300,
    height: 40,
    width: 40,
    borderRadius: 100,
    backgroundColor: "#ff4d4d",
    shadowColor: "rgba(0, 0, 0, 0.15)",
    top: 20
    },
    editUnit: {
    marginLeft: -35,
    top: 30,
    fontSize: 18,
    left: "50%",
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
    
    
    position: "absolute"
    },
    check: {
    marginLeft: -9
    },
    back1: {
    left: 20,
    backgroundColor: "#00ff8c"
    },
    editAUnit: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    flex: 1,
    width: "100%",
    overflow: "hidden",
    height: 800
    }
    });

function forceRender(arg0: (prev: any) => boolean) {
    throw new Error("Function not implemented.");
}
