
import { Image, Text, View, ScrollView, Button, Pressable } from "react-native";
import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { globalStyles } from "@/app/stylesheet";
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
export function RenderListcard (name : string, Cost: any, Faction: string){
    return (
        <>
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
        </>
      );
}



export function EmptyCard(Type : string) { 
    return (        
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
    );
  }