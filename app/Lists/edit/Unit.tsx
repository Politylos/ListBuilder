import * as React from "react";
import {Text, StyleSheet, View, Pressable} from "react-native";
const ScrollView1 = () => {
return (
<View style={styles.scrollView}>
<View style={styles.frameParent}>
<Pressable onPress={()=>{}}>
<View style={styles.unitCard}>
<View style={[styles.frameGroup, styles.frameFlexBox]}>
<View style={styles.wrapperFlexBox}>
<View style={styles.nameAndType}>
<Text style={[styles.unitCard1, styles.cardFlexBox]}>Unit Card</Text>
</View>
</View>
<View style={[styles.frameContainer, styles.wrapperFlexBox]}>
<View style={[styles.ballPileParent, styles.wrapperFlexBox]}>
<Text style={[styles.ballPile, styles.textTypo]}>ball-pile</Text>
<Text style={[styles.text, styles.textTypo]}>4</Text>
</View>
<View style={[styles.ballPileParent, styles.wrapperFlexBox]}>
<Text style={[styles.ballPile, styles.textTypo]}>star</Text>
<Text style={[styles.text, styles.textTypo]}>1,240</Text>
</View>
</View>
</View>
<View style={styles.modelCard}>
<View style={[styles.frameView, styles.frameFlexBox]}>
<View style={[styles.modelCardWrapper, styles.wrapperFlexBox]}>
<Text style={[styles.modelCard1, styles.cardFlexBox]}>Model Card</Text>
</View>
<View style={styles.wrapperFlexBox}>
<View style={[styles.frameContainer, styles.wrapperFlexBox]}>
<View style={styles.plusFrameShadowBox}>
<Text style={[styles.minus, styles.cardFlexBox]}>minus</Text>
</View>
<Text style={[styles.text, styles.textTypo]}>2</Text>
<View style={styles.plusFrameShadowBox}>
<Text style={[styles.minus, styles.cardFlexBox]}>plus</Text>
</View>
</View>
</View>
</View>
<View style={[styles.unitCard2, styles.frameFlexBox]}>
<Text style={[styles.weapon, styles.cardFlexBox]}>Weapon</Text>
<View style={styles.wrapperFlexBox}>
<View style={styles.wrapperFlexBox}>
<View style={[styles.frameContainer, styles.wrapperFlexBox]}>
<View style={styles.plusFrameShadowBox}>
<Text style={[styles.minus, styles.cardFlexBox]}>minus</Text>
</View>
<Text style={[styles.text, styles.textTypo]}>2</Text>
<View style={styles.plusFrameShadowBox}>
<Text style={[styles.minus, styles.cardFlexBox]}>plus</Text>
</View>
</View>
</View>
</View>
</View>
</View>
<View style={styles.modelCard}>
<View style={[styles.frameView, styles.frameFlexBox]}>
<View style={[styles.modelCardWrapper, styles.wrapperFlexBox]}>
<Text style={[styles.modelCard1, styles.cardFlexBox]}>Model Card</Text>
</View>
<View style={styles.wrapperFlexBox}>
<View style={[styles.frameContainer, styles.wrapperFlexBox]}>
<View style={styles.plusFrameShadowBox}>
<Text style={[styles.minus, styles.cardFlexBox]}>minus</Text>
</View>
<Text style={[styles.text, styles.textTypo]}>2</Text>
<View style={styles.plusFrameShadowBox}>
<Text style={[styles.minus, styles.cardFlexBox]}>plus</Text>
</View>
</View>
</View>
</View>
<View style={[styles.unitCard2, styles.frameFlexBox]}>
<Text style={[styles.weapon, styles.cardFlexBox]}>Weapon</Text>
<View style={styles.wrapperFlexBox}>
<View style={styles.wrapperFlexBox}>
<View style={[styles.frameContainer, styles.wrapperFlexBox]}>
<View style={styles.plusFrameShadowBox}>
<Text style={[styles.minus, styles.cardFlexBox]}>minus</Text>
</View>
<Text style={[styles.text, styles.textTypo]}>2</Text>
<View style={styles.plusFrameShadowBox}>
<Text style={[styles.minus, styles.cardFlexBox]}>plus</Text>
</View>
</View>
</View>
</View>
</View>
</View>
<View style={styles.modelCard}>
<View style={[styles.frameView, styles.frameFlexBox]}>
<View style={[styles.modelCardWrapper, styles.wrapperFlexBox]}>
<Text style={[styles.modelCard1, styles.cardFlexBox]}>Model Card</Text>
</View>
<View style={styles.wrapperFlexBox}>
<View style={[styles.frameContainer, styles.wrapperFlexBox]}>
<View style={styles.plusFrameShadowBox}>
<Text style={[styles.minus, styles.cardFlexBox]}>minus</Text>
</View>
<Text style={[styles.text, styles.textTypo]}>2</Text>
<View style={styles.plusFrameShadowBox}>
<Text style={[styles.minus, styles.cardFlexBox]}>plus</Text>
</View>
</View>
</View>
</View>
<View style={[styles.unitCard2, styles.frameFlexBox]}>
<Text style={[styles.weapon, styles.cardFlexBox]}>Weapon</Text>
<View style={styles.wrapperFlexBox}>
<View style={styles.wrapperFlexBox}>
<View style={[styles.frameContainer, styles.wrapperFlexBox]}>
<View style={styles.plusFrameShadowBox}>
<Text style={[styles.minus, styles.cardFlexBox]}>minus</Text>
</View>
<Text style={[styles.text, styles.textTypo]}>2</Text>
<View style={styles.plusFrameShadowBox}>
<Text style={[styles.minus, styles.cardFlexBox]}>plus</Text>
</View>
</View>
</View>
</View>
</View>
</View>
</View>
</Pressable>
<View style={styles.emptyCard}>
<View style={styles.plusParent}>
<Text style={[styles.plus6, styles.plus6Clr]}>plus</Text>
<Text style={[styles.addAUnit, styles.plus6Clr]}>Add Models</Text>
</View>
</View>
</View>
</View>);
};
const styles = StyleSheet.create({
frameFlexBox: {
justifyContent: "space-between",
flexDirection: "row"
},
cardFlexBox: {
textAlign: "left",
color: "#000"
},
wrapperFlexBox: {
flexDirection: "row",
alignItems: "center"
},
textTypo: {
textAlign: "center",
fontSize: 14,
color: "#000"
},
plus6Clr: {
color: "#fff",
textAlign: "center"
},
unitCard1: {
fontSize: 16,
fontFamily: "Inter Display",
fontWeight: "700",
alignSelf: "stretch"
},
nameAndType: {
paddingLeft: 10,
paddingTop: 5,
paddingBottom: 5
},
ballPile: {
fontFamily: "Font Awesome 6 Pro"
},
text: {
fontFamily: "Inter Display",
fontWeight: "700"
},
ballPileParent: {
gap: 5
},
frameContainer: {
gap: 10
},
frameGroup: {
paddingRight: 10,
alignSelf: "stretch",
alignItems: "center"
},
modelCard1: {
fontWeight: "600",
fontSize: 14,
fontFamily: "Inter Display"
},
modelCardWrapper: {
height: 17,
paddingVertical: 2,
width: 133,
paddingHorizontal: 0
},
minus: {
fontFamily: "Font Awesome 6 Pro",
fontSize: 14
},
plusFrameShadowBox: {
paddingVertical: 6,
paddingHorizontal: 15,
overflow: "hidden",
height: 18,
width: 18,
backgroundColor: "#fff",
borderRadius: 5,
shadowOpacity: 1,
elevation: 1,
shadowRadius: 1,
shadowOffset: {
width: 0,
height: 1
},
shadowColor: "rgba(0, 0, 0, 0.25)",
justifyContent: "center",
flexDirection: "row",
alignItems: "center"
},
frameView: {
width: 290,
paddingBottom: 10,
alignItems: "center"
},
weapon: {
width: 133,
fontSize: 14,
fontFamily: "Inter Display"
},
unitCard2: {
borderStyle: "solid",
borderColor: "#dfdfdf",
borderTopWidth: 1,
paddingVertical: 10,
alignSelf: "stretch",
paddingHorizontal: 0
},
modelCard: {
backgroundColor: "#ececec",
width: 310,
paddingHorizontal: 10,
paddingTop: 10,
borderRadius: 10
},
unitCard: {
backgroundColor: "#d1d1d1",
gap: 5,
padding: 5,
width: 320,
borderRadius: 10
},
plus6: {
fontSize: 24,
fontFamily: "Font Awesome 6 Pro"
},
addAUnit: {
fontSize: 14,
fontFamily: "Inter Display",
fontWeight: "700"
},
plusParent: {
justifyContent: "flex-end",
gap: 5,
alignItems: "center"
},
emptyCard: {
borderStyle: "dashed",
borderColor: "#d1d1d1",
borderWidth: 2,
height: 80,
justifyContent: "center",
padding: 5,
width: 320,
borderRadius: 10,
alignItems: "center"
},
frameParent: {
height: 740,
padding: 20,
gap: 25,
alignSelf: "stretch",
alignItems: "center"
},
scrollView: {
flex: 1,
width: "100%",
height: 800,
paddingVertical: 60,
paddingHorizontal: 0,
alignItems: "center"
}
});
export default ScrollView1;