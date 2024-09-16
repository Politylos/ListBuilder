import { StyleSheet, Text, View } from "react-native";

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
		fontSize: 14,
		fontStyle: 'normal',
		fontWeight: '900',
	  },
	  addAUnitEmptyCard: {
		color: 'rgba(0, 0, 0, 1)',
		textAlign: 'center',
		fontSize: 14,
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