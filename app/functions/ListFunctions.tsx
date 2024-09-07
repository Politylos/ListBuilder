import * as FileSystem from 'expo-file-system';
import React, { useState, useEffect } from 'react';
var DOMParser = require('xmldom').DOMParser;
import { jsonDict } from "@/app/functions/Structs";

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
    return listData;
}


export async function RemoveUnitFromList(List : jsonDict<any>, key: number){
    if ((List.hasOwnProperty("Units")) && (List.hasOwnProperty("Cost"))){
        if (List["Units"].hasOwnProperty(key)){
            List["Cost"] += - List["Units"][key]["Cost"];
            delete List["Units"][key];
        }
    }
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
    return List;
}
