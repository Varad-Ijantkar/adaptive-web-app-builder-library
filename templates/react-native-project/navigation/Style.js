import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#FFF',   // White background for the tab bar
    borderTopColor: 'transparent',  // No border at the top
    elevation: 0,  // No shadow for the tab bar
    height: 80,  // Height of the tab bar
    paddingBottom: 10,  // Padding at the bottom to align the icons correctly
    borderRadius: 20,  // Round corners of the tab bar
    marginHorizontal: 10,  // Add margins on the sides for spacing
    position: 'absolute',  // Positioning to make the tab bar float
    bottom: 20,  // Space between the tab bar and bottom of the screen
    shadowColor: '#000',  // Add shadow for a floating effect
    shadowOffset: { width: 0, height: 5 },  // Shadow position
    shadowOpacity: 0.1,  // Shadow transparency
    shadowRadius: 15,  // Shadow blur radius
    elevation: 5,  // Elevation for Android shadow
  },
  tabBarLabelStyle: {
    fontSize: 12,  // Font size for tab labels
    marginBottom: 5,  // Margin below the label
  },
  tabBarIconStyle: {
    marginTop: 5,  // Margin above the icons
  },
  tabBarItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    paddingVertical: 5,
  },
  tabBarIcon: {
    width: 26,
    height: 26,
  },
});
