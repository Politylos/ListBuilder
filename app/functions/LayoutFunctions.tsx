
import { Image, Text, View, ScrollView, Button, Pressable } from "react-native";
import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { globalStyles } from "@/app/stylesheet";
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { Link, Stack } from "expo-router";
export function RenderListcard (name : string, Cost: any, Faction: string){
    return (
        <>
        <Link href={{
        pathname: "/Lists/edit/Load",
        // /* 1. Navigate to the details route with query params */
        params: { ListName: name},
      }} asChild>
            <Pressable style={globalStyles.dashboardCardList}>
                <View style={globalStyles.dashboardCardListFirstLine}>
                <Text style={globalStyles.dashboardCardListName}>{name}</Text>
                <Text style={globalStyles.dashboardCardListPoints}>{Cost}</Text>
                </View>
                <View style={globalStyles.dashboardCardListSecondLine}>
                <View style={globalStyles.dashboardCardListFaction}>
                    <Text style={globalStyles.dashboardCardListFactionName}>{Faction}</Text>
                </View>
                </View>
            </Pressable>
          </Link>
        </>
      );
}



export function EmptyCard(Type : string) { 
    return (    
    <Link href={{
        pathname: "/Lists/Create",
        // /* 1. Navigate to the details route with query params */
        params: { id: 86, other: "anything you want here" },
      }} asChild>    
        <Pressable style={globalStyles.rootEmptyCard} >
            <View style={globalStyles.frame42EmptyCard} >
            <Text style={globalStyles.plusEmptyCard} >
            <FontAwesomeIcon icon={faPlus} />
            </Text>
            <Text style={globalStyles.addAUnitEmptyCard} >
                {Type}
            </Text>
            </View>
        </Pressable>
      </Link>
    );
  }