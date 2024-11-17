import { Image, Text, ScrollView, View, Button, Pressable, StyleSheet } from 'react-native';
import { useNavigation, useRouter, useLocalSearchParams, router } from "expo-router";
import {AddModel, AddUnitToList, LoadList} from "@/app/functions/ListFunctions"
import { useEffect, useState } from 'react';
import { globalStyles } from "@/app/stylesheet";
import Animated from 'react-native-reanimated';
import React, { useCallback, useMemo, useRef } from 'react';
import { useHeaderHeight } from "@react-navigation/elements"
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faPencil } from '@fortawesome/free-solid-svg-icons/faPencil';
import { faAdd } from '@fortawesome/free-solid-svg-icons/faAdd';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons/faPeopleGroup'; // Change to ball pile
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar'; 
import BottomSheet, {
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GetAllUnitCosts, GetUnitData, GetunitStats, PraseCat } from '@/app/functions/LoadData';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';


function GetRawData(Listname : any){
    const [List, setList]  : any = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(() => {
        async function fetchData() {
            try{
                
                const Filedata : any = await PraseCat(Listname);
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
    
    const returndata : any ={"RawData": List, "Loading":loading, "Error":error };
    return returndata;
    
}



export default function Page() {
    const [modalView, SetModalView]  = useState("NNN");//useState();
    const sheetRef : any = useRef<BottomSheet>(null);
    const headerHeight = useHeaderHeight();
    const subHeadings = ["Epic Hero","Character","Battleline","Infantry","Mounted","Vehicle","Monster","Dedicated Transport","Swarm","Fortification"];    
    const params : any = useLocalSearchParams();
    const UnitCostdataAll : any = JSON.parse(params["AllUnitData"]);
    const UnitdataID : any = UnitCostdataAll["ID"];
    const UnitCostdata : any = UnitCostdataAll["Name"];
    console.log(UnitCostdata);
    const [keyRender,setkeyState] : any = useState(params["List"]);
    const [ListData, SetListData] : any = useState(JSON.parse(params["List"]))
    //const [RawData, SetRawData] : any = useState({});
    const RawData : any = GetRawData(ListData["CatFile"]);


    const snapPoints = useMemo(() => ['30%','90%'], []);
    let handleSheetChange : any = useCallback((index : any) => {
    }, []);
    let handleSnapPress : any = useCallback((index : any,viewname : string) => {
        SetModalView(viewname);
        sheetRef.current?.snapToIndex(index);
    }, []);
    let handleClosePress : any = useCallback(() => {
        sheetRef.current?.close();
    }, []);
    let addUnitrenderItems : any = {};
    for (const profkey of Object.keys(UnitCostdata)){
        addUnitrenderItems[profkey] = useCallback(
            (item : any, name : string) => (
                AddNewUnitCard(item, name, RawData)
            ),
            [RawData]
          );
    }
    
    function unitCard(data : any){
        return (<View style={[styles.unitCard, styles.cardLayout]}>
                            
                                <View style={[styles.frameContainer, styles.frameParentFlexBox]}>
                                    <View style={styles.pointsParent}>
                                        <View style={styles.pencilShadowBox}>
                                            <FontAwesomeIcon icon={faPencil} style={[styles.pencil, styles.pencilTypo]} />
                                        </View>
                                        <View>
                                            <Text style={[styles.unitCard1, styles.pencilTypo]}>{data["Name"]}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.pointsParent}>
                                        <View style={styles.ballPileParent}>
                                            <FontAwesomeIcon icon={faPeopleGroup} style={styles.ballPile} />
                                            <Text style={[styles.points, styles.pointsTypo]}>{data["Size"]}</Text>
                                        </View>
                                        <View style={styles.ballPileParent}>
                                            <FontAwesomeIcon icon={faStar} style={styles.ballPile} />
                                            <Text style={[styles.points, styles.pointsTypo]}>{data["Cost"]}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.modelCard}>
                                    <View style={[styles.frameParent2, styles.frameParentFlexBox]}>
                                        <View style={styles.plusParent}>
                                            <FontAwesomeIcon icon={faPlus} style={styles.ballPile} />
                                            <Text style={styles.modelCard1}>Model Card</Text>
                                        </View>
                                        <View style={styles.swordParent}>
                                            <View style={styles.swordParent}>
                                                <Text style={[styles.points, styles.pointsTypo]}>2</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                        </View>);
    }

    function CreateSubHeading(Name : string, handleSnapPress : any){
        if((ListData["Units"] != undefined)){
            return(
                <View style={styles.frameGroup}>
                        <View style={[styles.charactersParent, styles.frameParentFlexBox]}>
                            <Text style={[styles.detachment1, styles.pointsTypo]}>{Name}</Text>
                            <View style={[styles.chevronDownWrapper, styles.plusParent4FlexBox]}>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </View>
                        </View>
                        {
                            Object.keys(ListData["Units"]).map((unit:any) => {
                                return RenderUnitCards(ListData["Units"][unit],Name,unit);
                            }, [])
                        }
                        {modalbtn(handleSnapPress,Name)}
                </View>
            );
        }
        return(
            <View style={styles.frameGroup}>
                    <View style={[styles.charactersParent, styles.frameParentFlexBox]}>
                        <Text style={[styles.detachment1, styles.pointsTypo]}>{Name}</Text>
                        <View style={[styles.chevronDownWrapper, styles.plusParent4FlexBox]}>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </View>
                    </View>
                    {modalbtn(handleSnapPress,Name)}
            </View>
        );
    }

    function RenderUnitCards(data : any, type : string, unitindex : number){
        if (data["Type"] == type){
            return (<View style={[styles.unitCard, styles.cardLayout]}>          
                <TouchableOpacity style={[styles.frameContainer, styles.frameParentFlexBox]} onPress={()=>{router.navigate({ pathname: "/Lists/edit/Unit", params: {"UnitIndex":unitindex,"UnitCostdataAll":JSON.stringify(UnitCostdataAll),"unit": JSON.stringify(data), "List":JSON.stringify(ListData) } })}}>
                    <View style={styles.pointsParent}>
                        <View style={styles.pencilShadowBox}>
                            <FontAwesomeIcon icon={faPencil} style={[styles.pencil, styles.pencilTypo]} />
                        </View>
                        <View>
                            <Text style={[styles.unitCard1, styles.pencilTypo]}>{UnitdataID[data["ID"]]}</Text>
                        </View>
                    </View>
                    <View style={styles.pointsParent}>
                        <View style={styles.ballPileParent}>
                            <FontAwesomeIcon icon={faPeopleGroup} style={styles.ballPile} />
                            <Text style={[styles.points, styles.pointsTypo]}>{data["size"]}</Text>
                        </View>
                        <View style={styles.ballPileParent}>
                            <FontAwesomeIcon icon={faStar} style={styles.ballPile} />
                            <Text style={[styles.points, styles.pointsTypo]}>{data["Cost"]}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.modelCard}>
                    <View style={[styles.frameParent2, styles.frameParentFlexBox]}>
                        <View style={styles.plusParent}>
                            <FontAwesomeIcon icon={faPlus} style={styles.ballPile} />
                            <Text style={styles.modelCard1}>Model Card</Text>
                        </View>
                        <View style={styles.swordParent}>
                            <View style={styles.swordParent}>
                                <Text style={[styles.points, styles.pointsTypo]}>2</Text>
                            </View>
                        </View>
                    </View>
                </View>
             </View>);
        }
    }
    function Scrollmodal(sheetRef : any,snapPoints : any,handleSheetChange : any,list : any = "NNN", data : any, addUnitrenderItems : any){
        
        return (<BottomSheet
            ref={sheetRef}
            index={-1}
            snapPoints={snapPoints}
            onChange={handleSheetChange}
            enablePanDownToClose={true}
        >
            <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
            <Text>{list}</Text>
                {
                    Object.keys(data).map((unit:any) => {
                        if (data[unit]["Type"] == list){
                            return addUnitrenderItems[unit](data[unit],unit);
                        }
                    })
                }
            </BottomSheetScrollView>
        </BottomSheet>);
    }
    async function AddNewmodel(ModelName : string, RawData : any){
        //Name of model
        //var unitData = await GetUnitData(ModelName,RawData);
        var dataunit = await GetunitStats(ModelName,RawData["RawData"]);
        console.log("unit stats",dataunit);
        SetListData(await AddUnitToList(ListData,dataunit));
        console.log("new list",ListData);

        
    }

    function modalbtn(handleSnapPress : any,Name : string){
        return (
            <TouchableOpacity style={[styles.emptyCard, styles.cardLayout]} onPress={() => handleSnapPress(0,Name)}>
        <View style={[styles.plusParent4, styles.plusParent4FlexBox]}>
            <FontAwesomeIcon icon={faPlus} style={styles.plus6} />
            <Text style={[styles.points, styles.pointsTypo]}>Add a unit</Text>
        </View>
        </TouchableOpacity>);
        
    }
    function AddNewUnitCard(data : any, type : string,RawData : any){
        console.log(data)
        return (
            <View style={styles.modelCard}>
            <View style={[styles.frameParent, StyleAddUnit.unitCardSpaceBlock]}>
            <View style={StyleAddUnit.unitNameParent}>
            <Text style={[StyleAddUnit.unitName, StyleAddUnit.addFlexBox]}>{data["Name"]}</Text>
            <View style={[styles.frameGroup, styles.frameParentFlexBox]}>
            <View style={[styles.ballPileParent, styles.frameParentFlexBox]}>
            <FontAwesomeIcon icon={faPeopleGroup} style={[styles.ballPile, StyleAddUnit.textTypo]} />
            <Text style={[StyleAddUnit.text, StyleAddUnit.textTypo]}>{data["Size"]}</Text>
            </View>
            <View style={[styles.ballPileParent, styles.frameParentFlexBox]}>
            <FontAwesomeIcon icon={faStar} style={[styles.ballPile, StyleAddUnit.textTypo]} />
            <Text style={[StyleAddUnit.text, StyleAddUnit.textTypo]}>{data["Cost"]}</Text>
            </View>
            </View>
            </View>
            <TouchableOpacity style={StyleAddUnit.back} onPress={()=>AddNewmodel(data["Name"],RawData)}>
            <FontAwesomeIcon icon={faAdd} style={[StyleAddUnit.add, StyleAddUnit.addFlexBox]} />
            </TouchableOpacity>
            </View>
            <View style={[styles.unitCard, StyleAddUnit.unitCardSpaceBlock]}>
            <Text style={StyleAddUnit.standardUnitConfiguration}>Standard unit configuration:</Text>
            <Text style={[StyleAddUnit.informationHereAbout, StyleAddUnit.addFlexBox]}>{`Information here about the default models & weapons`}</Text>
            </View>
            </View>);
    }
    if ((Object.keys(RawData).length > 0) && RawData.hasOwnProperty("RawData")){
        
        if (RawData["Loading"] == true){
            return (<GestureHandlerRootView style={{ flex: 1 }}>
                <ScrollView style={[globalStyles.dashboardScrollViewParent, {marginTop: headerHeight}]} key={keyRender}>
                    <View style={styles.header}>
                        <TouchableOpacity style={[styles.listCard, styles.frameParentFlexBox]} onPress={()=>{}}>
                            <View style={styles.nameAndType}>
                                <Text style={[styles.boppysBops, styles.pointsTypo]}>{params["ListName"]}</Text>
                                    <View style={styles.frameParent}>
                                        <View style={styles.swordParent}>
                                            <Text style={styles.sword}>sword</Text>
                                            <Text style={styles.sword1}>sword</Text>
                                        </View>
                                        <Text style={[styles.faction, styles.pointsTypo]}>{ListData["Faction"]}</Text>
                                    </View>
                                </View>
                                <View style={styles.pointsParent}>
                                    <Text style={[styles.points, styles.pointsTypo]}>{ListData["Cost"]} points</Text>
                                    <Text style={styles.validity}></Text>
                                </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.detachment}>
                        <View style={[styles.detachmentWrapper, styles.charactersGroupLayout]}>
                            <Text style={[styles.detachment1, styles.pointsTypo]}>Detachment</Text>
                            <View>
                                <Text>List Size: {ListData["Size"]}</Text>
                            </View>
                        </View>
                    </View>
                    
            
                
                    {
                        Object.keys(subHeadings).map((list:any) => {
                            return CreateSubHeading(subHeadings[list],handleSnapPress);
                        })
                        
                        //Object.keys(subHeadings).map((list : any) => {
                        //return AddUnitToListBtn()//(subHeadings[list]);
                    //})
                    }
                    
                </ScrollView>
                {
                    Scrollmodal(sheetRef,snapPoints,handleSheetChange,modalView,UnitCostdata,addUnitrenderItems)
                }
                </GestureHandlerRootView>);
        }else if (RawData["Error"] == true){
            return (<GestureHandlerRootView style={{ flex: 1 }}>
                <ScrollView style={[globalStyles.dashboardScrollViewParent, {marginTop: headerHeight}]} key={keyRender}>
                    <View style={styles.header}>
                        <TouchableOpacity style={[styles.listCard, styles.frameParentFlexBox]} onPress={()=>{}}>
                            <View style={styles.nameAndType}>
                                <Text style={[styles.boppysBops, styles.pointsTypo]}>{params["ListName"]}</Text>
                                    <View style={styles.frameParent}>
                                        <View style={styles.swordParent}>
                                            <Text style={styles.sword}>sword</Text>
                                            <Text style={styles.sword1}>sword</Text>
                                        </View>
                                        <Text style={[styles.faction, styles.pointsTypo]}>{ListData["Faction"]}</Text>
                                    </View>
                                </View>
                                <View style={styles.pointsParent}>
                                    <Text style={[styles.points, styles.pointsTypo]}>{ListData["Cost"]} points</Text>
                                    <Text style={styles.validity}></Text>
                                </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.detachment}>
                        <View style={[styles.detachmentWrapper, styles.charactersGroupLayout]}>
                            <Text style={[styles.detachment1, styles.pointsTypo]}>Detachment</Text>
                            <View>
                                <Text>List Size: {ListData["Size"]}</Text>
                            </View>
                        </View>
                    </View>
                    
            
                
                    {
                        Object.keys(subHeadings).map((list:any) => {
                            return CreateSubHeading(subHeadings[list],handleSnapPress);
                        })
                        
                        //Object.keys(subHeadings).map((list : any) => {
                        //return AddUnitToListBtn()//(subHeadings[list]);
                    //})
                    }
                    
                </ScrollView>
                {
                    Scrollmodal(sheetRef,snapPoints,handleSheetChange,modalView,UnitCostdata,addUnitrenderItems)
                }
                </GestureHandlerRootView>);
        }else {
            return (
                <GestureHandlerRootView style={{ flex: 1 }}>
                <ScrollView style={[globalStyles.dashboardScrollViewParent, {marginTop: headerHeight}]} key={keyRender}>
                    <View style={styles.header}>
                        <TouchableOpacity style={[styles.listCard, styles.frameParentFlexBox]} onPress={()=>{}}>
                            <View style={styles.nameAndType}>
                                <Text style={[styles.boppysBops, styles.pointsTypo]}>{params["ListName"]}</Text>
                                    <View style={styles.frameParent}>
                                        <View style={styles.swordParent}>
                                            <Text style={styles.sword}>sword</Text>
                                            <Text style={styles.sword1}>sword</Text>
                                        </View>
                                        <Text style={[styles.faction, styles.pointsTypo]}>{ListData["Faction"]}</Text>
                                    </View>
                                </View>
                                <View style={styles.pointsParent}>
                                    <Text style={[styles.points, styles.pointsTypo]}>{ListData["Cost"]} points</Text>
                                    <Text style={styles.validity}></Text>
                                </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.detachment}>
                        <View style={[styles.detachmentWrapper, styles.charactersGroupLayout]}>
                            <Text style={[styles.detachment1, styles.pointsTypo]}>Detachment</Text>
                            <View>
                                <Text>List Size: {ListData["Size"]}</Text>
                            </View>
                        </View>
                    </View>
                    
            
                
                    {
                        Object.keys(subHeadings).map((list:any) => {
                            return CreateSubHeading(subHeadings[list],handleSnapPress);
                        })
                        
                        //Object.keys(subHeadings).map((list : any) => {
                        //return AddUnitToListBtn()//(subHeadings[list]);
                    //})
                    }
                    
                </ScrollView>
                {
                    Scrollmodal(sheetRef,snapPoints,handleSheetChange,modalView,UnitCostdata,addUnitrenderItems)
                }
                </GestureHandlerRootView>
            );
        }
    }else{
        return (<GestureHandlerRootView style={{ flex: 1 }}>
            <ScrollView style={[globalStyles.dashboardScrollViewParent, {marginTop: headerHeight}]} key={keyRender}>
                <View style={styles.header}>
                    <TouchableOpacity style={[styles.listCard, styles.frameParentFlexBox]} onPress={()=>{}}>
                        <View style={styles.nameAndType}>
                            <Text style={[styles.boppysBops, styles.pointsTypo]}>{params["ListName"]}</Text>
                                <View style={styles.frameParent}>
                                    <View style={styles.swordParent}>
                                        <Text style={styles.sword}>sword</Text>
                                        <Text style={styles.sword1}>sword</Text>
                                    </View>
                                    <Text style={[styles.faction, styles.pointsTypo]}>{ListData["Faction"]}</Text>
                                </View>
                            </View>
                            <View style={styles.pointsParent}>
                                <Text style={[styles.points, styles.pointsTypo]}>{ListData["Cost"]} points</Text>
                                <Text style={styles.validity}></Text>
                            </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.detachment}>
                    <View style={[styles.detachmentWrapper, styles.charactersGroupLayout]}>
                        <Text style={[styles.detachment1, styles.pointsTypo]}>Detachment</Text>
                        <View>
                            <Text>List Size: {ListData["Size"]}</Text>
                        </View>
                    </View>
                </View>
                
        
            
                {
                    Object.keys(subHeadings).map((list:any) => {
                        return CreateSubHeading(subHeadings[list],handleSnapPress);
                    })
                    
                    //Object.keys(subHeadings).map((list : any) => {
                    //return AddUnitToListBtn()//(subHeadings[list]);
                //})
                }
                
            </ScrollView>
            {
                Scrollmodal(sheetRef,snapPoints,handleSheetChange,modalView,UnitCostdata,addUnitrenderItems)
            }
            </GestureHandlerRootView>);
    }
}

const StyleAddUnit = StyleSheet.create({
    unitCardSpaceBlock: {
        paddingHorizontal: 0,
        alignSelf: "stretch"
        },
        addFlexBox: {
        textAlign: "left",
        color: "#000"
        },
        frameParentFlexBox: {
        alignItems: "center",
        flexDirection: "row"
        },
        textTypo: {
        textAlign: "center",
        fontSize: 14,
        color: "#000"
        },
        unitName: {
        fontSize: 15,
        fontWeight: "600",
        
        },
        ballPile: {
        
        },
        text: {
        fontWeight: "700",
        
        },
        ballPileParent: {
        gap: 5
        },
        frameGroup: {
        gap: 10
        },
        unitNameParent: {
        justifyContent: "center",
        gap: 5
        },
        add: {
        position: "absolute",
        marginTop: -10,
        marginLeft: -9,
        top: "50%",
        left: "50%",
        fontSize: 20,
        
        },
        back: {
        shadowColor: "rgba(0, 0, 0, 0.15)",
        shadowOffset: {
        width: 0,
        height: 1
        },
        shadowRadius: 1,
        elevation: 1,
        shadowOpacity: 1,
        borderRadius: 100,
        backgroundColor: "#fff",
        width: 30,
        height: 30,
        overflow: "hidden"
        },
        frameParent: {
        justifyContent: "space-between",
        paddingVertical: 15,
        alignItems: "center",
        flexDirection: "row"
        },
        standardUnitConfiguration: {
        fontSize: 14,
        textAlign: "left",
        color: "#000",
        
        alignSelf: "stretch"
        },
        informationHereAbout: {
        fontSize: 12,
        
        alignSelf: "stretch"
        },
        unitCard: {
        borderStyle: "solid",
        borderColor: "#dfdfdf",
        borderTopWidth: 1,
        paddingVertical: 10,
        gap: 10
        },
        modelCard: {
        borderRadius: 10,
        backgroundColor: "#f3f3f3",
        flex: 1,
        width: "100%",
        paddingHorizontal: 15,
        paddingVertical: 0,
        alignSelf: "stretch"
        }
    });

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 200,
      },
      contentContainer: {
        backgroundColor: "white",
      },
      itemContainer: {
        padding: 6,
        margin: 6,
        backgroundColor: "#eee",
      },

frameParentFlexBox: {
justifyContent: "space-between",
flexDirection: "row"
},
pointsTypo: {
fontWeight: "700",

},
charactersGroupLayout: {
width: 320,
flexDirection: "row"
},
plusParent4FlexBox: {
justifyContent: "flex-end",
alignItems: "center"
},
cardLayout: {
padding: 5,
width: 320,
borderRadius: 10
},
pencilTypo: {
fontSize: 16,
color: "#000"
},
boppysBops: {
fontSize: 32,
textAlign: "left",
color: "#000"
},
sword: {

fontSize: 14,
textAlign: "left",
color: "#000"
},
sword1: {
fontWeight: "300",
marginLeft: -6,

fontSize: 14,
textAlign: "left",
color: "#000"
},
swordParent: {
flexDirection: "row",
alignItems: "center"
},
faction: {
width: 113,
fontSize: 14,
textAlign: "left",
color: "#000"

},
frameParent: {
gap: 5,
flexDirection: "row",
alignSelf: "stretch",
alignItems: "center"
},
nameAndType: {
gap: 5
},
points: {
textAlign: "center",
fontSize: 14,
color: "#000"

},
validity: {
color: "#e3001e",
display: "none",
textAlign: "center",

fontSize: 14
},
pointsParent: {
gap: 10,
flexDirection: "row",
alignItems: "center"
},
listCard: {
top: 126,
left: 0,
width: 360,
height: 125,
padding: 20,
alignItems: "flex-end",
position: "absolute",
borderRadius: 10,
backgroundColor: "#d1d1d1"
},
header: {
height: 251,
overflow: "hidden",
backgroundColor: "#d1d1d1",
alignSelf: "stretch"
},
detachment1: {
fontSize: 15,
textAlign: "left",
color: "#000"

},
detachmentWrapper: {
top: 22,
left: 20,
alignItems: "flex-end",
position: "absolute"
},
detachment: {
backgroundColor: "#f3f3f3",
height: 191,
alignSelf: "stretch"
},
//
chevronDown: {
fontSize: 18,

textAlign: "left",
color: "#000"
},
chevronDownWrapper: {
flexDirection: "row"
},
charactersParent: {
height: 18,
alignSelf: "stretch",
alignItems: "center"
},
pencil: {
top: 6,
left: 7,
textAlign: "center",

position: "absolute",
fontSize: 16
},
pencilShadowBox: {
height: 29,
width: 29,
backgroundColor: "#fff",
borderRadius: 100,
shadowOpacity: 1,
elevation: 1,
shadowRadius: 1,
shadowOffset: {
width: 0,
height: 1
},
shadowColor: "rgba(0, 0, 0, 0.25)"
},
unitCard1: {
textAlign: "left",
fontWeight: "700",
alignSelf: "stretch"
},
ballPile: {
textAlign: "center",
fontSize: 14,
color: "#000"
},
ballPileParent: {
gap: 5,
flexDirection: "row",
alignItems: "center"
},
frameContainer: {
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
plusParent: {
width: 133,
height: 17,
paddingHorizontal: 0,
paddingVertical: 2,
gap: 5,
flexDirection: "row",
alignItems: "center"
},
frameParent2: {
width: 290,
paddingBottom: 10,
alignItems: "center"
},
modelCard: {
backgroundColor: "#ececec",
width: 310,
paddingHorizontal: 10,
paddingTop: 10,
borderRadius: 10
},
unitCard: {
gap: 5,
backgroundColor: "#d1d1d1"
},
//
plus6: {
fontSize: 24,
textAlign: "center",

color: "#000"
},
plusParent4: {
gap: 5
},
emptyCard: {
borderStyle: "dashed",
borderColor: "#d1d1d1",
borderWidth: 2,
height: 81,
justifyContent: "center",
alignItems: "center"
},
frameGroup: {
gap: 25,
padding: 20,
alignSelf: "stretch",
alignItems: "center"
},
charactersGroup: {
gap: 224
},
frameChild: {
width: 322,
height: 63,
overflow: "hidden"
},
frameParent11: {
gap: 10,
padding: 20,
alignSelf: "stretch"
},
scrollView: {
flex: 1,
width: "100%",
height: 800,
paddingBottom: 100,
alignItems: "center"
}
});
