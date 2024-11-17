import * as FileSystem from 'expo-file-system';
import React, { useState, useEffect } from 'react';
var DOMParser = require('xmldom').DOMParser;
import { jsonDict ,getCurrentDate } from "@/app/functions/Structs";
import { MainDir} from "@/app/functions/LoadData";

const ListDir = MainDir + "List/"
export const GetFileUri = (fileID: string) => ListDir + `${fileID.replace(" - ","").replace(" ","")}`;


export async function CheckDir() {
  const dirInfo = await FileSystem.getInfoAsync(ListDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(ListDir, { intermediates: true });
  }
}
export async function CreateFactionList(catfile : string, faction : string, name : string, Listsize : number){
    var listData : jsonDict<any> = {}
    listData["Faction"]= faction;
    listData["CatFile"]= catfile;
    listData["name"]= name;
    listData["Size"]= Listsize;
    listData["Units"]= {};
    listData["Cost"]= 0;
    listData["Date"] = getCurrentDate();
    console.log(listData["Cost"])
    console.log(listData);
    let created = await SaveList(listData,true);
    if (created){
        return listData;
    }
    console.log("is a list already")
    return {};
}

export async function LoadList(name : string){
    let fileUri = GetFileUri(name);
    let List = JSON.parse(await FileSystem.readAsStringAsync(fileUri));
    if ((List.hasOwnProperty("Units") && List.hasOwnProperty("Cost") && List.hasOwnProperty("Faction") && List.hasOwnProperty("CatFile") && List.hasOwnProperty("name") && List.hasOwnProperty("Size") )){
    return List;
    }
    return {};
}

export async function loadLists(){
    var listFiles = await FileSystem.readDirectoryAsync(ListDir);
    var Lists : jsonDict<any> = {}
    for (let file of listFiles){ 
        console.log(file)
        let fileUri = GetFileUri(file);
        let List = JSON.parse(await FileSystem.readAsStringAsync(fileUri));
        if ((List.hasOwnProperty("Units") && List.hasOwnProperty("Cost") && List.hasOwnProperty("Faction") && List.hasOwnProperty("CatFile") && List.hasOwnProperty("name") && List.hasOwnProperty("Size") )){
            Lists[List["name"]] = List;
        }
    }
    return Lists;
}

export async function DeleteListReload(List : jsonDict<any>){
    await DeleteList(List);
    return await loadLists();

}
export async function DeleteList(List : jsonDict<any>){
    if (List.hasOwnProperty("name")){
        let fileUri = GetFileUri(List["name"]);
        const fileInfo = await FileSystem.getInfoAsync(fileUri);
        if (fileInfo.exists){
            await FileSystem.deleteAsync(fileUri);
            return true;
        }
    }
    return false;
    
}
export async function NewestLists(){
    let AllLists : any = await loadLists();
    console.log("HILLL")
    console.log(Object.keys(AllLists))
    let TopLists : any = [null, null, null,null,null,null, null, null,null,null];
    for (const att of Object.keys(AllLists)){
        let CurrentMove = AllLists[att];
        console.log(CurrentMove)
        for (let i = 0;  i < 10;i++){
            console.log(TopLists[i])
            if (TopLists[i]==null){
                console.log("Data")
                let Store = TopLists[i];
                TopLists[i] = CurrentMove;
                CurrentMove = Store;
            } else{
                if (new Date(TopLists[i]["Date"]) < new Date(CurrentMove["Date"])){
                    let Store = TopLists[i];
                    TopLists[i] = CurrentMove;
                    CurrentMove = Store;
                }
            }
        }
    }
    let TopListsReturn : any = []
    for (let i = 0;  i < 10;i++){
        if (TopLists[i]==null){

        } else{
            TopListsReturn.push(TopLists[i])
        }
    }
    return TopListsReturn;
}

export async function SaveList(List : jsonDict<any>,check : Boolean = false){
    if ((List.hasOwnProperty("Date") && List.hasOwnProperty("Units") && List.hasOwnProperty("Cost") && List.hasOwnProperty("Faction") && List.hasOwnProperty("CatFile") && List.hasOwnProperty("name") && List.hasOwnProperty("Size") )){
        await CheckDir();
        List["Date"] = getCurrentDate();
        const fileUri = GetFileUri(List["name"]);
        console.log(fileUri)
        const fileInfo = await FileSystem.getInfoAsync(fileUri);
        if ((!check) || (!fileInfo.exists)){
            const fileInfo = await FileSystem.getInfoAsync(fileUri);
                await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(List));
                return true;
        }
        

    }
    return false;
    

}
export async function RemoveUnitFromList(List : jsonDict<any>, key: number){
    if ((List.hasOwnProperty("Units")) && (List.hasOwnProperty("Cost"))){
        if (List["Units"].hasOwnProperty(key)){
            List["Cost"] += - List["Units"][key]["Cost"];
            delete List["Units"][key];
        }
    }
    SaveList(List);
    return List;
}

export async function AddModel(List : jsonDict<any>, key: number, NewWeapon : string, stats : jsonDict<any>){
    let maxunits = 0;
    let minunits = 0;
    let WepStat : jsonDict<any> = {};
    let defualtWep : jsonDict<any> = {};
    if ((List.hasOwnProperty("Units")) && (List.hasOwnProperty("Cost"))){
        console.log("start")
        
        if (List["Units"].hasOwnProperty(key)){
            if (List["Units"][key].hasOwnProperty("size") && List["Units"][key].hasOwnProperty("Weapons") && List["Units"][key].hasOwnProperty("Cost")){
                
                if (stats.hasOwnProperty("Weapons")){
                    console.log(List["Units"][key])
                    if (stats["Weapons"].hasOwnProperty(NewWeapon)){
                        for (const profkey of Object.keys(stats["Weapons"])){
                            if (stats["Weapons"][profkey].hasOwnProperty("type")){
                                if (stats["Weapons"][profkey]["type"] == "max"){
                                    maxunits = parseInt(stats["Weapons"][profkey]["value"]);
                                } else if (stats["Weapons"][profkey]["type"] == "min") {
                                    minunits = parseInt(stats["Weapons"][profkey]["value"]);
                                } else if (profkey == NewWeapon){
                                    WepStat = stats["Weapons"][profkey];
                                } else if (stats["Default"] == profkey){
                                    defualtWep = stats["Weapons"][profkey];
                                }
                            }
                        }
                        let NewGroupsize = 1;
                        if ((List["Units"][key]["Weapons"].length+1) < maxunits+List["Units"][key]["HasLeader"]){
                            NewGroupsize = Math.ceil((List["Units"][key]["Weapons"].length+1)/(minunits+List["Units"][key]["HasLeader"]));
                        } else {
                            NewGroupsize = Math.ceil((maxunits+List["Units"][key]["HasLeader"])/(minunits+List["Units"][key]["HasLeader"]));
                        }
                        
                        console.log(NewGroupsize)
                        console.log("Groups size")
                        let totalamountofNew = 0
                        let countusing = 0;
                        for (const wepkey of Object.keys(WepStat)){
                            if (WepStat[wepkey].hasOwnProperty("type")){
                                if (WepStat[wepkey]["type"] == "max"){
                                    totalamountofNew = parseInt(WepStat[wepkey]["value"])*NewGroupsize
                                }
                            }
                        }
                        console.log("new to add",totalamountofNew);
                        for (const currentweps of Object.keys(List["Units"][key]["Weapons"])){
                            if (List["Units"][key]["Weapons"][currentweps] == NewWeapon){
                                countusing++;
                            }
                        }
                        console.log(countusing)
                        console.log("Yay made it",totalamountofNew)
                        if ((countusing < totalamountofNew)  && ((maxunits +List["Units"][key]["HasLeader"]) >= List["Units"][key]["size"]) && (((maxunits +List["Units"][key]["HasLeader"]) > List["Units"][key]["size"]) || (NewWeapon != stats["Default"])) ){
                            if ((NewWeapon != stats["Default"]) && (maxunits <= List["Units"][key]["size"])){
                                console.log(maxunits + minunits)
                        console.log(minunits)
                        console.log(WepStat)
                                List = await RemoveModel(List,key, stats["Default"],stats);
                            }
                            if (List["Units"][key]["Weapons"].length+1 > (minunits+List["Units"][key]["HasLeader"])){
                                List["Cost"]+= - List["Units"][key]["Cost"] 
                                List["Units"][key]["Cost"] = stats["Cost"]*NewGroupsize;
                                List["Cost"]+= List["Units"][key]["Cost"] 
                            }
                            List["Units"][key]["size"]++;
                            if (List["Units"][key]["Weapons"].hasOwnProperty(NewWeapon)){
                                List["Units"][key]["Weapons"][NewWeapon]++;
                            }else {
                                List["Units"][key]["Weapons"][NewWeapon]=1;
                            }
                            
                        }
                    }
                }
            }       
        }
    }
    return List;
}
    


export async function RemoveModel(List : jsonDict<any>, key: number, RemoveWeapon : string, stats : jsonDict<any>){
    let maxunits = 0;
    let minunits = 0;
    let WepStat : jsonDict<any> = {};
    let defualtWep : jsonDict<any> = {};
    if ((List.hasOwnProperty("Units")) && (List.hasOwnProperty("Cost"))){
        if (List["Units"].hasOwnProperty(key)){
            if (List["Units"][key].hasOwnProperty("size") && List["Units"][key].hasOwnProperty("Weapons") && List["Units"][key].hasOwnProperty("Cost")){
                if (stats.hasOwnProperty("Weapons")){
                    if (stats["Weapons"].hasOwnProperty(RemoveWeapon)){
                        for (const profkey of Object.keys(stats["Weapons"])){
                            if (stats["Weapons"][profkey].hasOwnProperty("type")){
                                if (stats["Weapons"][profkey]["type"] == "max"){
                                    maxunits = parseInt(stats["Weapons"][profkey]["value"]);
                                } else if (stats["Weapons"][profkey]["type"] == "min") {
                                    minunits = parseInt(stats["Weapons"][profkey]["value"]);
                                } else if (profkey == RemoveWeapon){
                                    WepStat = stats["Weapons"][profkey];
                                } else if (stats["Default"] == profkey){
                                    defualtWep = stats["Weapons"][profkey];
                                }
                            }
                        }
                        let NewGroupsize = Math.ceil((List["Units"][key]["Weapons"].length-1)/(minunits+List["Units"][key]["HasLeader"]));
                        let totalamountofNew = 0
                        let countusing = 0;
                        console.log("Remove")
                        console.log((RemoveWeapon != stats["Default"]) )
                        console.log((minunits+List["Units"][key]["HasLeader"] >= List["Units"][key]["size"]-1))
                        
                        List["Cost"]+= - List["Units"][key]["Cost"] 
                        List["Units"][key]["Cost"] = stats["Cost"]*NewGroupsize;
                        List["Cost"]+= List["Units"][key]["Cost"]
                        List["Units"][key]["size"]--;
                        if (List["Units"][key]["Weapons"].hasOwnProperty(RemoveWeapon)){
                            if (List["Units"][key]["Weapons"][RemoveWeapon] > 1){
                                List["Units"][key]["Weapons"][RemoveWeapon]--;
                            } else {
                                delete List["Units"][key]["Weapons"][RemoveWeapon];
                            }
                        }
                        if ((RemoveWeapon != stats["Default"]) && (minunits+List["Units"][key]["HasLeader"] >= List["Units"][key]["size"])){
                            List = await AddModel(List,key, stats["Default"],stats);
                        }                       
                    }
                }
            }
        }
    }
    return List;

}

export async function ChangeWeapon(List : jsonDict<any>, key: number, NewWeapon : string, OldWeapon: string){

}

export async function AddUnitToList(List : jsonDict<any>, unit : jsonDict<any>){
    console.log("unit dat:",unit)
    if ((List.hasOwnProperty("Units")) && (List.hasOwnProperty("Cost"))){
        
        List["Cost"] += parseInt(unit["Cost"]);
        var Nextkey = 0;
        if (Object.keys(List["Units"]).length > 0){
            console.log((Object.keys(List["Units"])));
            console.log((Object.keys(List["Units"])[-1]));
            Nextkey = parseInt(Object.keys(List["Units"])[Object.keys(List["Units"]).length-1])+1;
            
        }

        var Total = 0
        /*
        for (const profkey of Object.keys(unit["Weapons"][unit["Default"]])){ 
            if (unit["Weapons"][unit["Default"]][profkey].hasOwnProperty("type") ){
                if (unit["Weapons"][unit["Default"]][profkey]["type"] == "min"){
                    Total = parseInt(unit["Weapons"][unit["Default"]][profkey]["value"]);
                }
            }
        }
        */
    var Weapons : any = {}
    console.log("this i sthe defualt for unit",unit["Default"],unit,unit.hasOwnProperty("Default"));
        if (unit.hasOwnProperty("Default")){
            if (unit["Weapons"] != null){
                if (unit["Default"] != null){
                for (const profkey of Object.keys(unit["Weapons"])){ 
                    if (unit["Weapons"][profkey].hasOwnProperty("type") ){
                        if (unit["Weapons"][profkey]["type"] == "min"){
                            Total = parseInt(unit["Weapons"][profkey]["value"]);
                        }
                    }
                }
                console.log(Total)
                Weapons[unit["Default"]] = Total;
            }
            else {
                for (const profkey of Object.keys(unit["Weapons"])){ 
                    if (unit["Weapons"][profkey].hasOwnProperty("Default") || unit["Weapons"][profkey].hasOwnProperty("defaultSelectionEntryId")){
                        console.log("got wep",unit["Weapons"][profkey])
                        for (const profkey2 of Object.keys(unit["Weapons"][profkey])){
                            if (unit["Weapons"][profkey][profkey2].hasOwnProperty("type") ){
                                if (unit["Weapons"][profkey][profkey2]["type"] == "min"){
                                    Weapons[unit["Weapons"][profkey]["defaultSelectionEntryId"]] = unit["Weapons"][profkey][profkey2]["value"];
                                }
                            }
                        }
                    }
                }
            }
            }
        } 
        console.log("pushed weps",unit["Units"])
        if ((unit["Units"] != undefined) && (unit["Units"] != null)){
            if (Object.keys(unit["Units"]).length > 0){
                Total+=Object.keys(unit["Units"]).length;
                for (const profkey of Object.keys(unit["Units"])){
                    if (Weapons.hasOwnProperty(profkey)){
                        Weapons[profkey]+=1
                    }else{
                        Weapons[profkey]=1
                    }
                }
            }
        }
        if ((unit["Type"]  != "Battleline") && (unit["Type"]  != "Infantry") || (unit["defualtSize"] > 1)){
            Total = parseInt(unit["defualtSize"]);
        }
        List["Units"][Nextkey]  = {"size": Total, "ID":unit["ID"],"Weapons":Weapons,"Cost":unit["Cost"],"HasLeader":1,"Type":unit["Type"]}
        console.log(List["Units"][Nextkey]["ID"])
        console.log(unit)
    }
    
    SaveList(List);
    console.log(List)
    return List;
}
