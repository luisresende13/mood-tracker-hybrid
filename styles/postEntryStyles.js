const styles = {
  
  entrances: {
    marginTop: 27.5,
    borderWidth: 0,
    flex:1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: '0%',
    paddingHorizontal: '0%',
  },
  content: {
    flexGrow: 1,
    // paddingVertical: '5%',
    paddingBottom: '0%',
    paddingHorizontal: '6%',
    alignSelf: 'stretch',
    // justifyContent: 'space-between',
    borderColor: 'black',
    // borderWidth: 3,
    // backgroundColor: 'blue',
  },
  section: {
    // flex: 1,
    paddingVertical: '10%',
    paddingHorizontal: '10%',
    justifyContent: 'flex-start',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  contentRow: {
    // flex: 1,
    // alignSelf: 'stretch', 
    flexDirection: 'column',
    padding: 10,
    marginTop: 22,
    borderWidth: 1,
    borderColor: 'rgba(155,155,155, 0.4)',
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255, 0.3)',

  },
  entryTitle: {
    paddingBottom: 3,
    paddingLeft: 5,
    fontSize: 19,
    // textAlign: 'center',
    color: 'white'
  },
  postButtonView: {
    // flexDirection: 'row',
    height: 60,
    width: 60,
    borderRadius: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  postButton: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderColor: 'black',
    // borderWidth: 3,
    // backgroundColor: 'blue',
  },
  postButtonLabel: {
    // alignSelf: 'center',
    fontSize: 45,
    fontWeight: 'bold',
  },
  moodButton: {
      borderRadius: 30,
      justifyContent: 'center',
  },
  date: {
    position: 'relative',
    left: '60%',
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 15,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 20
  },
  diaryText: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    minHeight:100,
    width: '100%',
    borderRadius: 20,
    color: 'white',
    fontSize: 14,
  },
  saveButton: {
    // position: 'absolute',
    // bottom: 0,
    height: 50,
    width: '100%',
    // alignSelf: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  card: {
    marginTop: '5%',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
},
cardRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    // justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'blue',  
    // borderWidth: 2,  
},
moodBadge: {
    backgroundColor: 'green',
    borderRadius: 30,
    paddingVertical: 6,
    width: 130,
    fontSize: 16,
    textAlign: 'center',
    // left: 5,
},
emotionBadge: {
    backgroundColor: 'rgba(1,1,1,0.5)',
    borderRadius: 30,
    paddingVertical: 7,
    paddingHorizontal: 12.5,
    marginRight: 6,
    // width: '100%', //must be removed, badge should have text width
    fontSize: 15,
    textAlign: 'center',
},

}

export default styles;