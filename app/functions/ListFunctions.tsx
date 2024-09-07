import * as FileSystem from 'expo-file-system';
import React, { useState, useEffect } from 'react';
var DOMParser = require('xmldom').DOMParser;
import { jsonDict } from "@/app/functions/Structs";
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
    console.log(listData["Cost"])
    console.log(listData);
    let created = await SaveList(listData,true);
    if (created){
        return listData;
    }
    console.log("is a list already")
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
            FileSystem.deleteAsync(fileUri);
            return true;
        }
    }
    return false;
    
}

export async function SaveList(List : jsonDict<any>,check : Boolean = false){
    if ((List.hasOwnProperty("Units") && List.hasOwnProperty("Cost") && List.hasOwnProperty("Faction") && List.hasOwnProperty("CatFile") && List.hasOwnProperty("name") && List.hasOwnProperty("Size") )){
        await CheckDir();
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

export async function AddUnitToList(List : jsonDict<any>, unit : jsonDict<any>){
    console.log("Passed")
    if ((List.hasOwnProperty("Units")) && (List.hasOwnProperty("Cost"))){
        List["Cost"] += parseInt(unit["Cost"]);
        var Nextkey = 0;
        if (Object.keys(List["Units"]).length > 0){
            console.log((Object.keys(List["Units"])));
            console.log((Object.keys(List["Units"])[-1]));
            Nextkey = parseInt(Object.keys(List["Units"])[Object.keys(List["Units"]).length-1])+1;
            
        }
        var Total = 0
        for (const profkey of Object.keys(unit["Weapons"][unit["Default"]])){ 
            if (unit["Weapons"][unit["Default"]][profkey].hasOwnProperty("type") ){
                if (unit["Weapons"][unit["Default"]][profkey]["type"] == "max"){
                    Total = parseInt(unit["Weapons"][unit["Default"]][profkey]["value"]);
                }
            }
        }
        var Weapons = []
        let i : number  =0
        for ( i=0; i < Total ;i++){
            Weapons.push(unit["Default"]);
        }
        if (Object.keys(unit["Units"]).length > 0){
            Total+=Object.keys(unit["Units"]).length;
            for (const profkey of Object.keys(unit["Units"])){
                Weapons.push(profkey);
            }
        }
        List["Units"][Nextkey]  = {"size": Total, "ID":unit["ID"],"Weapons":Weapons,"Cost":unit["Cost"]}
    }
    console.log(List)
    SaveList(List);
    return List;
}
