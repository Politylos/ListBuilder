import { Image, Text, View, ScrollView, Button, Pressable,TextInput } from "react-native";
import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { globalStyles } from "@/app/stylesheet";
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { Link, router, Stack } from "expo-router";
import {Picker} from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import {GetSystemFactions} from "@/app/functions/LoadData"
import { useState, useEffect } from 'react';
import {CreateFactionList} from "@/app/functions/ListFunctions"
import  *  as LayoutFunctions from "@/app/functions/LayoutFunctions"
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";

async function CreatList(Name : any, Faction : any, size: any){
    const faction_files = await GetSystemFactions("w40k_10e.json")
    const newList = await CreateFactionList(faction_files[Faction],Faction,Name, parseInt(size));
    if (Object.keys(newList).length > 0){
        return router.replace({
            pathname: "/Lists/edit/Load",
            // /* 1. Navigate to the details route with query params */
            params: { ListName: Name },
          });
    }
    return router.replace({ pathname: "/"});
}
export default function Page() {
 const [text, onChangeText] = React.useState('List Name');
    const [ListName, ChangeListName]  : any = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [value, setValue] : any = React.useState(null);
    const [openFaction, setFOpen] = React.useState(false);
    const [Faction, setFaction] : any = React.useState(null);
    const [items, setItems] = React.useState([
             {label: '500 Points', value: '500'},                  
             {label: '1000 Points', value: '1000'},
             {label: '1500 Points', value: '1500'},
             {label: '2000 Points', value: '2000'},
               ]);
    const [factions, setFactions]  : any = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(() => {
     async function fetchData() {
        console.log("HI2")
       try{
        const factionsName = Object.keys(await GetSystemFactions("w40k_10e.json"));
        console.log(factionsName)
        let factions : any = [];
         for (const att of factionsName){
            factions.push({"label": att,"value": att})
         }
         console.log(factions)
         setFactions(factions);
        setLoading(false);
         }
       catch(error){
        console.log("Error")
         setError(false);
         setLoading(false);
       }
     }
     fetchData();
    }, []);
    if (error){
        return(<Text>Error</Text>);
    } else if (!loading){
        return (
            <View
                style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                }}
            >
            <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            />
            <DropDownPicker
            open={openFaction}
            value={Faction}
            items={factions}
            setOpen={setFOpen}
            setValue={setFaction}
            setItems={setFactions}
            />
        <TextInput
        style={globalStyles.TextInput}
            onChangeText={ChangeListName}
            value={ListName}
            placeholder="List Name"
            keyboardType="default"
        />
        <Pressable style={globalStyles.rootEmptyCard}
        onPress={() => {
            CreatList(ListName,Faction,value);
          }}>
            <View style={globalStyles.frame42EmptyCard} >
            <Text style={globalStyles.plusEmptyCard} >
            <FontAwesomeIcon icon={faPlus} />
            </Text>
            <Text style={globalStyles.addAUnitEmptyCard} >
                Create List
            </Text>
            </View>
        </Pressable>
        </View>
          
        );
    } else{
        return(<Text>Loading...</Text>);
    }
    
}
