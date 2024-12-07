import * as FileSystem from 'expo-file-system';
import React, { useState, useEffect } from 'react';
var DOMParser = require('xmldom').DOMParser;
import { jsonDict, IDict } from "@/app/functions/Structs";







function loadfaction(){
    var data = ""//require(file);
    return data
}
export const MainDir = FileSystem.cacheDirectory + 'ListBuilder/';
export const GetFileUri = (fileID: string) => MainDir + `${fileID.replace(" - ","").replace(" ","")}`;


export async function CheckDir() {
  const dirInfo = await FileSystem.getInfoAsync(MainDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(MainDir, { intermediates: true });
  }
}


export async function DownloadIndex(fileName: string,url: string) {
    await CheckDir();
    const fileUri = GetFileUri(fileName);
    console.log(fileUri)
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
  
    if (!fileInfo.exists) {
      console.log("Updating cache");
      await FileSystem.downloadAsync(url, fileUri);
    }
  
    return fileUri;
}

export async function GetW40Index(){
  return DownloadIndex("w40k_10e.json","http://michael.local:61265/wh40k_feed")
}

export async function ReadSystemData(file : string){
  const fileUri = GetFileUri(file);
  console.log(fileUri)
  const data = await FileSystem.readAsStringAsync(fileUri);

  return data;
}

export async function ReadW40Index(){
  return await ReadSystemData("w40k_10e.json");
}

export async function GetFactionDownload(url : string,faction : string){
  return await DownloadIndex(faction, url);
}
export async function GetSystemFactions(system_file : string){
  console.log("AA")
  console.log(system_file)
  const sys_data : any = JSON.parse(await ReadSystemData(system_file));
  console.log(sys_data)
  return sys_data["Files"];
}
export async function DownloadAllIndex(system_file : string){
  const sys_data : any = JSON.parse(await ReadSystemData(system_file));
  console.log("Downloading all");
  console.log(sys_data);
  for (const down_key of Object.keys(sys_data["Files"])) {
    console.log("downloading");
    var loc = await GetFactionDownload(sys_data["Download"][sys_data["Files"][down_key].split(".")[0]],sys_data["Files"][down_key]);
  }
  console.log("Done Loop");
}
function MoveThroughXML(element : any){
  
  var struct : jsonDict<any> = {}
  if (element == null){
    return struct;
  }
  if (element.hasOwnProperty("nodeName")){
    /*if ((element.nodeName == "sharedSelectionEntries") || (element.nodeName == "sharedSelectionEntryGroups") || (element.nodeName == "sharedRules")){
      console.log("Returning")
      return 0
    }*/
    console.log(element.nodeName)
  }
  if (element.hasOwnProperty("attributes")){
    if (element.attributes != null){
      if (element.attributes.hasOwnProperty("0")){
      for (const att of element.attributes){
          if ((att.hasOwnProperty("name")) & (att.hasOwnProperty("nodeValue"))){
            struct[att.name] = att.nodeValue
          }
          console.log(att)
        }
        
        //struct[att] = 
      }
    }
  }
  if (element.hasOwnProperty("nodeValue")){
    if (element.nodeValue != "\n    "){
      struct["nodeValue"] = element.nodeValue;
    }
  }
  var child_arr = [];
  if (element.hasOwnProperty("childNodes")){
    if (element.childNodes != null){
      if (Array.isArray(element.childNodes)){
        for (const child_ele of element.childNodes){
          MoveThroughXML(child_ele);
        }
      } else if ((element.childNodes.hasOwnProperty("data") |(element.childNodes.hasOwnProperty("localName"))| (element.childNodes.hasOwnProperty("firstChild")))){
        MoveThroughXML(element.childNodes);
      } else if  (element.childNodes.hasOwnProperty("1")){
        MoveThroughXML(element.childNodes[0]);
      }
    }
  }
  if (Object.keys(struct).length == 0){
    if (element.hasOwnProperty("nodeValue")){
    struct[element.nodeValue] = []
    } else{
      struct["children"]= []
    }
  }else{
    struct["children"] = []
  }
  if (element.hasOwnProperty("nextSibling")){
    if (element.nextSibling != null){
      if (Array.isArray(element.nextSibling)){
        for (const sib_ele of element.nextSibling){
          MoveThroughXML(sib_ele);
        }
      } else if ((element.nextSibling.hasOwnProperty("data") |(element.nextSibling.hasOwnProperty("localName"))| (element.nextSibling.hasOwnProperty("firstChild")))){
        MoveThroughXML(element.nextSibling);
      } else if (element.nextSibling.hasOwnProperty("1")){
          MoveThroughXML(element.nextSibling[0]);
      }
      
    }
  }
  return struct;
}
export async function ExplodeWepons(data : any){
  if (data["Weapons"] != null){
    for (const wep of Object.keys(data["Weapons"])){
      if (data["Weapons"][wep].hasOwnProperty("defaultSelectionEntryId")){
        
      }
    }
  }
}
export async  function PraseCat(file : string){
  const fileUri = GetFileUri(file);
  const FileData = await FileSystem.readAsStringAsync(fileUri);
  var rss = await new DOMParser().parseFromString(FileData, 'text/xml');
  var ele = rss.firstChild;
  return ele;
  //MoveThroughXML(ele);
  /*
  for (const elee of ele.){
    console.log("going over elee")
    await MoveThroughXML(elee);
  }*/
}
export async function FindTag(element : any,tag : string){
  if (element.hasOwnProperty("nodeName")){
    if (element.nodeName == tag){
      return element;
    }
  }
  if (element.hasOwnProperty("nextSibling")){
    if (element.nextSibling != null){
      if (Array.isArray(element.nextSibling)){
        for (const sib_ele of element.nextSibling){
          return await FindTag(sib_ele,tag);
        }
      } else if ((element.nextSibling.hasOwnProperty("data") |(element.nextSibling.hasOwnProperty("localName"))| (element.nextSibling.hasOwnProperty("firstChild")))){
        return await FindTag(element.nextSibling,tag);
      } else if (element.nextSibling.hasOwnProperty("1")){
        return await FindTag(element.nextSibling[0],tag);
      }
      
    }
  }
  if (element.hasOwnProperty("childNodes")){
    if (element.childNodes != null){
      if (Array.isArray(element.childNodes)){
          return await FindTag(element.childNodes[0],tag);
      } else if ((element.childNodes.hasOwnProperty("data") |(element.childNodes.hasOwnProperty("localName"))| (element.childNodes.hasOwnProperty("firstChild")))){
        return await FindTag(element.childNodes,tag);
      } else if  (element.childNodes.hasOwnProperty("1")){
        return await FindTag(element.childNodes[0],tag);
      }
    }
  }
  
}

export async function MoveOverUnit(data: any, store: any){
  if (data.hasOwnProperty("attributes")){
    for (const att of Object.keys(data.attributes)){
      if ((data.attributes[att].hasOwnProperty("name")) & (data.attributes[att].hasOwnProperty("nodeValue"))){
        store[data.attributes[att]["name"]]=data.attributes[att]["nodeValue"];
      }
    }
  }
  if (data.hasOwnProperty("childNodes")){
    for (const child_ele of Object.keys(data.childNodes)){
      var elementData : jsonDict<any> = {}
      //store[] = MoveOverUnit(data,store);
    }
  }
  return store;
}

export async function GetUnitData(name: string, data: any){
  var units_xml = await FindTag(data, "sharedSelectionEntries");
  for (const child_ele of Object.keys(units_xml.childNodes)){
    if (units_xml.childNodes[child_ele].hasOwnProperty("attributes")){
      var elementData : jsonDict<any> = {}
      for (const att of Object.keys(units_xml.childNodes[child_ele].attributes)){
        if ((units_xml.childNodes[child_ele].attributes[att].hasOwnProperty("name")) & (units_xml.childNodes[child_ele].attributes[att].hasOwnProperty("nodeValue"))){
          if(units_xml.childNodes[child_ele].attributes[att]["name"] == "name"){
            if (units_xml.childNodes[child_ele].attributes[att]["nodeValue"] == name){
              elementData = await MoveOverUnit(units_xml.childNodes[child_ele],elementData)
              return units_xml.childNodes[child_ele]
            } else{
              break;
            }
          } 
        }
      }
    }
  }
  return null;
}
export async function GetUnits(data: any){
  
  var units_xml = await FindTag(data, "entryLinks");//await FindTag(data, "categoryEntries");
  var units: any[] = [];
  for (const child_ele of Object.keys(units_xml.childNodes)){
    if (units_xml.childNodes[child_ele].hasOwnProperty("attributes")){
      var elementData : jsonDict<any> = {}
      console.log(units_xml.childNodes[child_ele].attributes);
      for (const att of Object.keys(units_xml.childNodes[child_ele].attributes)){
        if ((units_xml.childNodes[child_ele].attributes[att].hasOwnProperty("name")) & (units_xml.childNodes[child_ele].attributes[att].hasOwnProperty("nodeValue"))){
          elementData[units_xml.childNodes[child_ele].attributes[att]["name"]]=units_xml.childNodes[child_ele].attributes[att]["nodeValue"];
        }
        
      }
      if (Object.keys(elementData).length > 0){
        units.push(elementData);
      }
    }
  }
  return units;
}



export async function StepOverProf(data: any, tag : string,jsonData : any,keyStack : any){
  if(tag == "#text"){
    
    if((data.data.trim() == "\n") || (data.data.trim() == "")){
      if (data.hasOwnProperty("nextSibling")){
        if (data.nextSibling != null){
            jsonData = await StepOverProf(data.nextSibling,data.nextSibling.nodeName,jsonData,keyStack);
        }
      }
    } else {
      jsonData["value"] = data.data;
    }
  }
  else if (data.nodeName == tag){
    
    var subjson : jsonDict<any> = {} ; 
    var ID = 0;
    var IDexists = 0
    if (Object.keys(data.attributes).length > 1){
      for (const att of Object.keys(data.attributes)){
        if ((data.attributes[att].hasOwnProperty("name")) && (data.attributes[att].hasOwnProperty("nodeValue"))){
          if (data.attributes[att].name== "id"){
            ID = data.attributes[att].nodeValue;
            IDexists=1;
          }
          if ((data.attributes[att].name== "typeId") && (!IDexists)){
            ID =data.attributes[att].nodeValue
          }
          subjson[data.attributes[att].name] = data.attributes[att].nodeValue;
        }

        
      }
      jsonData[ID] = subjson;
    }
    
    if (data.hasOwnProperty("firstChild")){
      
      if (data.firstChild != null){  
           

          if (Object.keys(jsonData).length > 0 ){

            var childreturn = await StepOverProf(data.firstChild,data.firstChild.nodeName,{},keyStack);

            if ((Object.keys(childreturn).length < 3) && (childreturn.hasOwnProperty("value"))){
              jsonData[ID]["value"] = childreturn["value"]
            }
            else{
              if (ID != 0){
                for (const att of Object.keys(childreturn)){
                  jsonData[ID][att] = childreturn[att];
                }
              }else{
                for (const att of Object.keys(childreturn)){
                  jsonData[att] = childreturn[att];
                }
              }
            }
          }else {
            
            if(data.nodeName != "#text"){
               jsonData = await StepOverProf(data.firstChild,data.firstChild.nodeName,jsonData,keyStack);
            } else {
              jsonData= await StepOverProf(data.firstChild,data.firstChild.nodeName,jsonData,keyStack);
            }
          }
      }
    }
    
  }
  if(tag != "#text"){
    if (data.hasOwnProperty("nextSibling")){
      if (data.nextSibling != null){
          
          if (data.nextSibling.nodeName != "#text"){
            jsonData = await StepOverProf(data.nextSibling,data.nextSibling.nodeName,jsonData,keyStack);//tag,jsonData,keyStack);
          } else{
            jsonData = await StepOverProf(data.nextSibling,tag,jsonData,keyStack);
          }
      }
    }
  }
  return jsonData
}

export async function GetUnitcat(data : any){
  return await GetUnitSection(data, "categoryLinks")
}

export async function GetUnitMods(data : any){
  return await GetUnitSection(data, "modifiers")
}

export async function GetUnitsectionEntries(data : any){
  return await GetUnitSection(data, "selectionEntries")
}

export async function GetUnitsectionGroups(data : any){
  return await GetUnitSection(data, "selectionEntryGroups")
}

export async function GetUnitcosts(data : any){
  return await GetUnitSection(data, "costs")
}
export async function GetUnitLinks(data : any){
  return await GetUnitSection(data, "infoLinks")
}

export async function GetUnitSection(data : any,tagname : string){
  var xml_profile = null;
  if (data.childNodes != null){
    if (1){
      for (const child of Object.keys(data.childNodes)){
        if (data.childNodes[child].nodeName == tagname){
          xml_profile = data.childNodes[child];
          var jsonprof : jsonDict<any> = {}
          if (tagname == "selectionEntries"){
            return StepOverProf(data.childNodes[child].firstChild,"selectionEntry",jsonprof,"");
          } else {
            return StepOverProf(data.childNodes[child].firstChild,tagname.substring(0, tagname.length - 1),jsonprof,"");
          }
        }
    }  
  }
 
 }
 return null; 
}

export async function GetUnitProf(data : any){
  return await GetUnitSection(data, "profiles")
}

export async function GetAllUnitCosts(catFile : string, IDDict : boolean = false){
  var Filedata = await PraseCat(catFile);
  var AllUnits : jsonDict<any> = await GetUnits(Filedata);
  var JsdonUnits : jsonDict<any> = {}
  var JsdonUnitsID : jsonDict<any> = {}
  for (const ID of Object.keys(AllUnits)){
    
    if (AllUnits[ID]["hidden"] == 'false'){
      //console.log(AllUnits[ID]["name"]);
      var unitData = await GetUnitData(AllUnits[ID]["name"],Filedata);
      //console.log(unitData);
      if (unitData != null){
        if (unitData.hasOwnProperty("nodeName")){
          var unitcost : jsonDict<any> = await GetUnitcosts(unitData);
          var unitmod : jsonDict<any> = await GetUnitMods(unitData);
          var unitCats : jsonDict<any> = await GetUnitcat(unitData);
          //console.log(unitcost);
          if (unitcost != null){
            if (unitmod != null){
            JsdonUnits[AllUnits[ID]["name"]] = {"Name":AllUnits[ID]["name"], "ID":AllUnits[ID]["targetId"], "Cost": unitcost[IDict["Cost"]]["value"], "Size":unitmod[0]["value"], "Type": "None"};
            
            } else{
              JsdonUnits[AllUnits[ID]["name"]] = {"Name":AllUnits[ID]["name"],"ID":AllUnits[ID]["targetId"], "Cost": unitcost[IDict["Cost"]]["value"], "Size":'1',"Type":"None"};
            }
            JsdonUnitsID[AllUnits[ID]["targetId"]] = AllUnits[ID]["name"];
            if (unitCats != null){
              var toptype = false;
              for (const Catkey of Object.keys(unitCats)){
                if (!toptype){
                  if ((unitCats[Catkey]["name"] == "Vehicle") || (unitCats[Catkey]["name"] == "Battleline") || (unitCats[Catkey]["name"] == "Infantry") || (unitCats[Catkey]["name"] == "Mounted") || (unitCats[Catkey]["name"] == "Fortification") || (unitCats[Catkey]["name"] == "Monster") || (unitCats[Catkey]["name"] == "Swarm") || (unitCats[Catkey]["name"] == "Character") || (unitCats[Catkey]["name"] == "Epic Hero") || (unitCats[Catkey]["name"] == "Dedicated Transport")){
                    JsdonUnits[AllUnits[ID]["name"]]["Type"] = unitCats[Catkey]["name"]
                    if ((unitCats[Catkey]["name"] == "Battleline") || (unitCats[Catkey]["name"] == "Epic Hero") || (unitCats[Catkey]["name"] == "Character")){
                      toptype = true;
                    }
                  }
                }
              }
              
            }
          }
          //console.log(JsdonUnits);
          
        }
      }
    } 
  } 
  if (IDDict){
    return {"Name" : JsdonUnits, "ID": JsdonUnitsID};
  }
  return JsdonUnits;
  //await GetUnitcosts(data);
}
export async function GetunitStats(unit : string, data : any){
  console.log("passed data",unit, data)
  var unitData = await GetUnitData(unit,data);
  console.log("unitdata!!",unitData);
  var unitCats : jsonDict<any> = await GetUnitcat(unitData);
  console.log("unitcats!!", unitCats)
  let mainID = null;
  if (unitData != null){
    if (unitData != null){
      if (unitData.hasOwnProperty("attributes")){
        if (Object.keys(unitData.attributes).length > 0){
          for (const unitkey of Object.keys(unitData.attributes)){
            if (unitData.attributes[unitkey].hasOwnProperty("nodeName")){
              if (unitData.attributes[unitkey]["nodeName"] == "id"){
                mainID = unitData.attributes[unitkey]["nodeValue"];
                console.log("MAINID",mainID)
              }
            }
          }
        }
      }
    }
    var unitProf =  await GetUnitProf(unitData);
    var unitsectionGroups =  await GetUnitsectionGroups(unitData);
    var unitentriers=  await GetUnitsectionEntries(unitData);
    console.log("more data", unitProf, unitsectionGroups, unitentriers)
    var unitjson :  jsonDict<any> = {"ID":mainID,"Stats": null,"Invul":null,"Abilities":[], "Units":null,"Weapons":null,"Default":null,"Cost":0, "Type":null, "defualtSize":1};
    var unitcost : jsonDict<any> = await GetUnitcosts(unitData);
    if (unitCats != null){
      if (Object.keys(unitCats).length > 0){
        var toptype = false;
        for (const Catkey of Object.keys(unitCats)){
          if (!toptype){
            if ((unitCats[Catkey]["name"] == "Vehicle") || (unitCats[Catkey]["name"] == "Battleline") || (unitCats[Catkey]["name"] == "Infantry") || (unitCats[Catkey]["name"] == "Mounted") || (unitCats[Catkey]["name"] == "Fortification") || (unitCats[Catkey]["name"] == "Monster") || (unitCats[Catkey]["name"] == "Swarm") || (unitCats[Catkey]["name"] == "Character") || (unitCats[Catkey]["name"] == "Epic Hero") || (unitCats[Catkey]["name"] == "Dedicated Transport")){
              unitjson["Type"] = unitCats[Catkey]["name"]
              if ((unitCats[Catkey]["name"] == "Battleline") || (unitCats[Catkey]["name"] == "Epic Hero")){
                toptype = true;
              }
            }
          }
        }
        unitjson["Type"]
      }
      
    }
    var unitmod : jsonDict<any> = await GetUnitMods(unitData);
    if (unitmod != null){
      unitjson["defualtSize"] = unitmod[0]["value"]
    }
    if (unitcost != null){
      unitjson["Cost"] = parseInt(unitcost[IDict["Cost"]]["value"]);
    }
    if (unitProf != null){
      for (const profkey of Object.keys(unitProf)){
        if (unitProf[profkey]["typeName"]=="Unit"){
          unitjson["Stats"] = {
                              "e703-ecb6-5ce7-aec1":unitProf[profkey][IDict["Movement"]],
                              "d29d-cf75-fc2d-34a4":unitProf[profkey][IDict["Toughness"]],
                              "450-a17e-9d5e-29da":unitProf[profkey][IDict["Save"]],
                              "750a-a2ec-90d3-21fe":unitProf[profkey][IDict["Wounds"]],
                              "58d2-b879-49c7-43bc":unitProf[profkey][IDict["Leadership"]],
                              "bef7-942a-1a23-59f8":unitProf[profkey][IDict["OC"]]
                              };
        }
        if (unitProf[profkey]["name"] == "Invulnerable Save"){
          unitjson["Invul"] = unitProf[profkey];
        } else if (unitProf[profkey]["typeName"] == "Abilities") {
          unitjson["Abilities"].push(unitProf[profkey]);
        }
      }
    }
    console.log("json before wep",unitjson)
    if (unitsectionGroups != null){
      unitjson["Weapons"] = {}
      if (Object.keys(unitsectionGroups).length == 1){
        unitsectionGroups = unitsectionGroups[Object.keys(unitsectionGroups)[0]]
      }
      for (const sectionkey of Object.keys(unitsectionGroups)){
        if (typeof unitsectionGroups[sectionkey] === 'string'){
          if (sectionkey == "defaultSelectionEntryId"){
            unitjson["Default"] = unitsectionGroups[sectionkey];
          }

        } else if (Object.keys(unitsectionGroups[sectionkey]).length){
          unitjson["Weapons"][sectionkey] = unitsectionGroups[sectionkey];
        }
      }

    }
    console.log("json after wep",unitjson,unitjson["Default"],unitjson["Default"] == null)
    if ((unitjson["Default"] == null) && (unitjson["Weapons"] != null)){
      console.log(unitjson["Weapons"])
      for (const sectionkey of Object.keys(unitjson["Weapons"])){
        
        if (unitjson["Weapons"][sectionkey].hasOwnProperty("name")){
          console.log(unitjson["Weapons"][sectionkey]["name"],unit, unitjson["Weapons"][sectionkey]["name"]==unit)
          if ((unitjson["Weapons"][sectionkey]["name"] == unit) || (unit.slice(0, -1) == unitjson["Weapons"][sectionkey]["name"])){
            unitjson["Default"] = sectionkey;
          }
        }
      }
    }
    console.log("bee bop")
    if (unitentriers != null){
      unitjson["Units"] = unitentriers;
    }
    console.log(unitjson)
  return unitjson;
  }
  console.log("Bad")
  return {};

}

export async function SelectUnitsfromType(type : string, data : jsonDict<any>){
  var unitsOfType : jsonDict<any> = {}
  for (const ID of Object.keys(data)){
    if (data[ID]["Type"] == type){
      unitsOfType[ID] = data[ID];
    }
  }
  return unitsOfType
}


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
  await GetunitStats("Skitarii Vanguard",Filedata);
  console.log("Done")
  /* var unitData = await GetUnitData("Serberys Sulphurhounds","ImperiumAdeptusMechanicus.cat");
  await GetUnitMods(unitData);
 var unitProf =  await GetUnitProf(unitData);
 console.log("profile")
 console.log(unitProf)
 unitProf =  await GetUnitcat(unitData);
 console.log("cat")
 console.log(unitProf)
 unitProf =  await GetUnitMods(unitData);
 console.log("Modifier")
 console.log(unitProf)
 unitProf =  await GetUnitsectionEntries(unitData);
 console.log("Section Entries")
 console.log(unitProf)
 unitProf =  await GetUnitsectionGroups(unitData);
 console.log("Section Geroups")
 console.log(unitProf)
 unitProf =  await GetUnitcosts(unitData);
 console.log("UNit Cost")
 console.log(unitProf)
 unitProf =  await GetUnitLinks(unitData);
 console.log("UNit Links")
 console.log(unitProf)
 var Data = await PraseCat("ImperiumAdeptusMechanicus.cat");
 console.log("Loading done")*/
}

/*
export async  function PraseCat(data : string){
  interface jsonDict<TValue> {
    [id: string]: TValue;
  }
  const Cat_Lines = data.split("\n");
  const Regex_End = /<\/.*>/;
  const Regex_Start = /<.*>/;
  const Regex_Single = /<.*\/>/;
  let NewTag = [];
  let TagName = [];
  var jsonData: jsonDict<any>;
  jsonData = {};
  for (var line of Cat_Lines) {
    if ((Regex_Start.test(line)) && (!Regex_End.test(line)) && (!Regex_Single.test(line))){
      NewTag.push(true);
      let split_line = line.split(" ");
      if (split_line.length > 1){
        if (NewTag.length > 0){
          jsonData[TagName[-1]].push({});
          for (var feild of split_line){
            jsonData[TagName[-1]]
          } 
        }
        TagName.push(split_line[0].replace("<","").replace(">",""));
      } else {
        TagName.push(split_line[0].replace("<","").replace(">",""));
        let Mainkey = split_line[0].replace("<","").replace(">","");  
        Object.assign({},jsonData,{Mainkey: []});
      }
    }
    if (Regex_End.test(line)){
      NewTag.pop();
      NewTag.pop();
    }
    if (Regex_Single.test(line)){

    }
    /<*>/.test('<data>')
    //line.includes())
    
  } 
  let filteredData = data.filter(x => String(x.approval).includes(approvalVariable));
}
*/
export {
    loadfaction
}