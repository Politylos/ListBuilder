import * as FileSystem from 'expo-file-system';
import React, { useState, useEffect } from 'react';
var DOMParser = require('xmldom').DOMParser;
import { jsonDict } from "@/app/functions/Structs";

export async function CreateFactionList(catfile : string, faction : string, name : string, Listsize : number){
    var listData : jsonDict<any> = {
        "Faction":faction,
        "CatFile":catfile,
        "name":name,
        "Size":Listsize,
        "Units":{},
        "TotalCost":0
    };
    return listData;
}

export async function AddUnitToList(List : jsonDict<any>, unit : jsonDict<any>){
    if ((List.hasOwnProperty("Units")) && (List.hasOwnProperty("TotalCost"))){
        List["TotalCost"] += unit["cost"];
        var Nextkey = 0;
        if (Object.keys(List["Units"]).length > 0){
            Nextkey = parseInt(Object.keys(List["Units"])[-1])+1;
            
        }
        var Total = 0
        for (const profkey of Object.keys(unit["Weapons"][unit["Default"]])){ 
            if (unit["Weapons"][unit["Default"]][profkey].hasOwnProperty("type") ){
                if (unit["Weapons"][unit["Default"]][profkey]["type"] == "max"){
                    Total = unit["Weapons"][unit["Default"]][profkey]["value"];
                }
            }
        }
        var Weapons = []
        for ( var i=0; i++; i < Total){
            Weapons.push(unit["Default"]);
        }

        if (Object.keys(unit["Units"]).length > 0){
            Total+=Object.keys(unit["Units"]).length;
            for (const profkey of Object.keys(unit["Units"])){
                Weapons.push(profkey);
            }
        }
        List["Units"][Nextkey]  = {"size": Total, "ID":unit["ID"],"Wepons":Weapons,"Cost":unit["cost"]}
    }
    return List;
}
