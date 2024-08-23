import * as FileSystem from 'expo-file-system';
import React, { useState, useEffect } from 'react';
var DOMParser = require('xmldom').DOMParser;

interface jsonDict<TValue> {
  [id: string]: TValue;
}

function loadfaction(){
    var data = ""//require(file);
    return data
}
const MainDir = FileSystem.cacheDirectory + 'ListBuilder/';
const GetFileUri = (fileID: string) => MainDir + `${fileID.replace(" - ","").replace(" ","")}`;

// Checks if gif directory exists. If not, creates it
async function CheckDir() {
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

export async function GEtW40Index(){
  return DownloadIndex("w40k_10e.json","http://10.0.0.144:4444/wh40k_feed")
}

export async function ReadSystemData(file : string){
  const fileUri = GetFileUri(file);
  const data = await FileSystem.readAsStringAsync(fileUri);
  console.log("Got saved file")
  console.log(data);
  return data;
}

export async function ReadW40Index(){
  return await ReadSystemData("w40k_10e.json");
}

export async function GetFactionDownload(url : string,faction : string){
  return await DownloadIndex(faction, url);
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
    console.log(tag);
    console.log(element.nodeName);
    if (element.nodeName == tag){
      return element;
    }
  }
  if (element.hasOwnProperty("nextSibling")){
    console.log("sib");
    if (element.nextSibling != null){
      if (Array.isArray(element.nextSibling)){
        for (const sib_ele of element.nextSibling){
          return FindTag(sib_ele,tag);
        }
      } else if ((element.nextSibling.hasOwnProperty("data") |(element.nextSibling.hasOwnProperty("localName"))| (element.nextSibling.hasOwnProperty("firstChild")))){
        return FindTag(element.nextSibling,tag);
      } else if (element.nextSibling.hasOwnProperty("1")){
        return FindTag(element.nextSibling[0],tag);
      }
      
    }
  }
  if (element.hasOwnProperty("childNodes")){
    console.log("choild");
    if (element.childNodes != null){
      if (Array.isArray(element.childNodes)){
        for (const child_ele of element.childNodes){
          return FindTag(child_ele,tag);
        }
      } else if ((element.childNodes.hasOwnProperty("data") |(element.childNodes.hasOwnProperty("localName"))| (element.childNodes.hasOwnProperty("firstChild")))){
        return FindTag(element.childNodes,tag);
      } else if  (element.childNodes.hasOwnProperty("1")){
        return FindTag(element.childNodes[0],tag);
      }
    }
  }
  
}
export async function GetUnits(file: string){
  var data = await PraseCat(file);
  var units_xml = await FindTag(data, "categoryEntries");
  var units: any[] = [];
  for (const child_ele of Object.keys(units_xml.childNodes)){
    if (units_xml.childNodes[child_ele].hasOwnProperty("attributes")){
      var elementData : jsonDict<any> = {}
      for (const att of Object.keys(units_xml.childNodes[child_ele].attributes)){
        if ((units_xml.childNodes[child_ele].attributes[att].hasOwnProperty("name")) & (units_xml.childNodes[child_ele].attributes[att].hasOwnProperty("nodeValue"))){
          elementData[units_xml.childNodes[child_ele].attributes[att]["name"]]=units_xml.childNodes[child_ele].attributes[att]["nodeValue"];
        }
        
        //console.log(units_xml.childNodes[child_ele].attributes[att]);
      }
      if (Object.keys(elementData).length > 0){
        units.push(elementData);
      }
    }
  }
  console.log(units);
}

export async function Startup(){
  await GEtW40Index();
  await ReadW40Index();
  await DownloadAllIndex("w40k_10e.json");
  GetUnits("ImperiumAdeptusMechanicus.cat");
  //var Data = await PraseCat("ImperiumAdeptusMechanicus.cat");
  //console.log("Loading done")
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