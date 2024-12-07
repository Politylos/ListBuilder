import {StyleSheet, Text, View} from "react-native";
import { useFonts } from "expo-font";



export const globalStyles = StyleSheet.create({
	TextInput: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
	rootEmptyCard: {
		height: 81,
		paddingTop: 5,
		paddingLeft: 5,
		paddingBottom: 5,
		paddingRight: 5,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		rowGap: 5,
		columnGap: 5,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		borderWidth: 2,
		borderStyle: 'dashed',
		borderColor: 'Placeholder.Grey',
	},
	plusEmptyCard: {
		color: 'rgba(0, 0, 0, 1)',
		textAlign: 'center',
		fontFamily: 'HankenGrotesk-Regular',
		fontSize: 14,
		fontStyle: 'normal',
		fontWeight: '900',
	},
	addAUnitEmptyCard: {
		color: 'rgba(0, 0, 0, 1)',
		textAlign: 'center',
		fontSize: 14,
		fontFamily: 'HankenGrotesk-Regular',
		fontStyle: 'normal',
		fontWeight: '700',
	},
	frame42EmptyCard: {
		flexDirection: 'column',
		justifyContent: 'flex-end',
		alignItems: 'center',
		rowGap: 5,
		columnGap: 5,
	},
	dashboardScrollViewParent: {
		width: '100%',
		paddingHorizontal: 20
	},
	dashboardScrollViewSection: {
		gap: 15,
		marginBottom: 10
	},
	scrollViewSectionTitle: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		// backgroundColor: 'green'
	},
	scrollViewSectionTitleHeading: {
		fontFamily: 'HankenGrotesk-Bold',
		fontSize: 24,
		fontWeight: '700',
		letterSpacing: -0.2
	},
	scrollViewSectionTitleButton: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		backgroundColor: 'grey',
		borderRadius: 5,
		borderCurve: 'continuous'
	},
	scrollViewSectionTitleButtonPressed: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		backgroundColor: 'grey',
		borderRadius: 5,
		borderCurve: 'continuous',
		opacity: 0.5
	},
	scrollViewSectionTitleButtonText: {
		fontFamily: 'HankenGrotesk-Bold',
		color: 'white'
	},
	dashboardGameCarousel: {
		maxWidth: '100%',
		height: 250,
		marginBottom: 10,
		flexDirection: 'row',
		gap: 20,
		overflow: 'scroll'
	},
	dashboardCardGame: {
		backgroundColor: 'grey',
		width: '100%',
		position: 'relative',
		borderRadius: 10,
		borderCurve: 'continuous',
		padding: 15
	},
	dashboardCardList: {
		backgroundColor: 'rgba(238, 248, 245, 1)',
		borderRadius: 10,
		borderCurve: 'continuous',
		padding: 15,
		display: 'flex',
		flexDirection: 'column',
		gap: 5
	},
	dashboardCardListFirstLine: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	dashboardCardListName: {
		fontSize: 18,
		fontFamily: 'HankenGrotesk-Bold'
	},
	dashboardCardListFactionName: {
		fontSize: 14
	},
	dashboardCardListPoints: {
		fontSize: 14
	}
});