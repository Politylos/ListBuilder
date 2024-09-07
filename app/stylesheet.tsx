import { StyleSheet, Text, View } from "react-native";

export const globalStyles = StyleSheet.create({
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
		fontSize: 24,
		fontWeight: '700'
	},
	scrollViewSectionTitleButton: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		backgroundColor: 'grey',
		fontWeight: '700',
		borderRadius: 5,
		borderCurve: 'continuous'
	},
	scrollViewSectionTitleButtonPressed: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		backgroundColor: 'grey',
		fontWeight: '700',
		borderRadius: 5,
		borderCurve: 'continuous',
		opacity: 0.5
	},
	scrollViewSectionTitleButtonText: {
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
		backgroundColor: 'grey',
		borderRadius: 10,
		borderCurve: 'continuous',
		padding: 15,
	}
});