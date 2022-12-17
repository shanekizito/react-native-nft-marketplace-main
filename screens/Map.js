import React, {useState,useEffect,useRef,useMemo,useCallback} from "react";
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { SafeAreaView, View, FlatList,ImageBackground, StyleSheet, Dimensions,Text,Image,TouchableOpacity} from 'react-native';
import * as Location from 'expo-location';
import {  HomeHeaderWhite} from "../components";
import { useBottomSheetModal } from '@gorhom/bottom-sheet';
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Barcode from 'react-native-barcode-svg';
import { useFocusEffect } from '@react-navigation/native';


import {BottomSheetModal,} from '@gorhom/bottom-sheet';



const Map = ({navigation}) => {
  const [origin, setOrigin] = useState({latitude:28.450127,
    longitude:-16.269045});
  const [errorMsg, setErrorMsg] = useState(null);
  const { width, height } = Dimensions.get('window');
  const bottomSheetModalRefVenue = useRef(null);
  const { dismiss, dismissAll } = useBottomSheetModal();
  const map = useRef();
  const [distance,setDistance]=useState(0);
  const [duration,setDuration]=useState(0);
  const snapPoints = useMemo(() => ['20%', '25%']);
  const [time,setTime]=useState(false);
  const GOOGLE_MAPS_APIKEY = 'AIzaSyCmcpx4SLKG6wLsdIeD6RT5ioDYihSRNM0';
  const [destination,setDestination]=useState({latitude: 37.771707, longitude: -122.4053769});



  
  const handlePresentModalPress = useCallback(() => {
    !bottomSheetModalRefVenue.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  






  useFocusEffect(

    
    useCallback(() => {
      handlePresentModalPress();
      getCordinates();
      
    }, [1]))
  

  useEffect(() => {
   
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      
    })();
  }, []);

 
const getCordinates= async ()=>{
      let location = await Location.getCurrentPositionAsync({});

      const currentLocation={
        latitude:location.coords.latitude,
        longitude:location.coords.longitude
      }
     
      setOrigin(currentLocation);
      console.log(currentLocation);
      
    
}





 

  return (
    <View style={styles.container}>
      <View >
      <HomeHeaderWhite navigation={navigation} header={'Go direction'}/>
     
    </View>
    <MapView ref={map}
      style={{width: '100%', height: '100%'}}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      initialRegion={{
        latitude: -1.3221119,
        longitude: 36.7983279,
        latitudeDelta: 0.0222,
        longitudeDelta: 0.0121,
      }}>
      <MapViewDirections
        origin={origin}
        languege="en"
        region="KE"
        destination="Mamboleo stage kisumu"
        onStart={(params) => {
          console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
        }}
        onReady={result => {
          setDestination(result.coordinates[result.coordinates.length-1]);
          console.log(`Distance: ${result.distance} km`)
          console.log(`Duration: ${result.duration} min.`)
          setDistance(result.distance);
          setDuration(result.duration);
          map.current.fitToCoordinates(result.coordinates, {
            edgePadding: {
              right: (width / 20),
              bottom: (height / 20),
              left: (width / 20),
              top: (height / 20),
            }})

        }}
        onError={(errorMessage) => {
          // console.log('GOT AN ERROR');
        }}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={5}
        strokeColor="red"
      />
      <Marker
        coordinate={origin}
        title={'Origin'}
      />
      <Marker
        coordinate={destination}
        image={{uri:'https://img.icons8.com/ios-filled/100/null/go.png'}}
      />
    </MapView>
    <BottomSheetModal
            ref={bottomSheetModalRefVenue}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            enablePanDownToClose >
          <View style={styles.contentContainer}>
          
               <View style={styles.ticket}>
                
                  <View style={styles.venueContainer}>
                    <Image style={styles.tinyBanner}resizeMode="cover"source={{ uri:"https://kenyaonthego.com/wp-content/uploads/2021/11/black-pearl-4-520x397.jpg" }}/>
                  <View style={styles.venueInfoContainer}>
                    <Text style={styles.place}>Club Da Place</Text>
                    <Text style={styles.venueLocation}>Mamboleo stage - Kisumu</Text>
                 </View>
               </View>
 
              <View style={styles.userInfoContainer}>
                <View style={styles.row1}>
                <Text style={styles.title}>{duration.toFixed(0)} KM </Text>
                <Text style={styles.title}>{distance.toFixed(0)} Minutes</Text>

                <Text style={styles.title}>Feb 29 2023</Text>
                </View>

              <View style={styles.row2}> 
                  <Text style={styles.title}>4:30 PM</Text>
                  
                  <View style={{marginTop:19}}>
        
          <Text  style={styles.title}><IconComponentProvider IconComponent={MaterialCommunityIcons}>
            
        <Icon name="tag-outline" size={25} color="#000"/>
           free 
        </IconComponentProvider></Text>
        </View>
              
              </View>


          </View>
      
              </View>
            
       </View>
        </BottomSheetModal>
    </View>
    
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
  bottomSheetRef: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  item:{
    marginTop:-10,
    height:'99%',
  },
  eventDetails:{
  marginTop:30,
  marginBottom:70,
  marginLeft:20,

  },
  dateTextContainer:{
    fontSize:15, 
    flexDirection:"column",
    justifyContent:"center",

  },
  
  bannerImage:{
    width:'100%',
    height:'98%',
    borderRadius:100,
  },
  card:{
     flexDirection:'column',
     position:'absolute',
     
     marginTop:70,
     borderRadius:35,
     borderBottomLeftRadius:0,
     borderBottomRightRadius:0,
     width:'100%',
     alignItems:'center',
     height:"100%",
  },
  linearGrd:{
    flex:1,
    height:'100%',
    alignItems:'flex-start',
    width:'100%',
    justifyContent:'flex-start',
    width:'100%',
     borderRadius:25,
     textAlign:'center',
     borderBottomLeftRadius:0,
     borderBottomRightRadius:0,
     borderTopRightRadius:0,
  },
  vibe:{
    lineHeight:25,
    fontSize:15,
    marginLeft:20,
    fontFamily: 'RalewayRegular',
    color:'#fff',
    marginBottom:15,
    
  },
  date:{
    fontFamily: 'RalewayRegular',
    fontSize:12,
    color:'grey',
     justifyContent:'flex-start',
     marginTop:30,
     backgroundColor:"#ffff",
     width:70,
     marginLeft:127,
     marginTop:-20,
     padding:12,
     borderRadius:12,

  },
  venueContent:{
 flexDirection:'row',
  },
  dateText:{
color:'#000',
borderTopWidth:3,
borderTopColor:'grey',
 
fontWeight:'bold',
fontSize:25,
fontFamily: 'RalewayRegular',

  },
  venue:{
    fontSize:15,
    alignItems:'center',
    flexDirection:'row',
    color:'#fff',
    fontFamily: 'RalewayRegular',
  },

  area:{
    fontSize:22,
    fontFamily: 'RalewayRegular',
    marginLeft:20,
    fontWeight:'600',
    marginTop:30,
    textAlign:'center',
    color:'white',
  },

  road:{
    fontSize:10,
    textAlign:'center',
    fontFamily: 'RalewayRegular',
    marginTop:20,
    alignSelf:'stretch',
  },CloseappButtonContainer: {
    elevation: 8,
     backgroundColor: "#000",
     flexDirection:"row",
     alignItems:"center",
     justifyContent:'center',
    marginTop:120,
    marginLeft:10,
    borderRadius: 115,
    width:320,
    height:45,
 
    zIndex:3
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#fff",
     flexDirection:"row",
     alignItems:"center",
     justifyContent:'center',
    marginTop:120,
    marginLeft:20,
    borderRadius: 115,
    width:320,
    height:45,
    paddingVertical:9,
    paddingHorizontal: 5,
    zIndex:3
  },
  appButtonText: {
    fontSize: 17,
    fontFamily: 'RalewayRegular',
    color: "#000",
    alignSelf: "center",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    marginRight:10,
    marginLeft:10

  },
  CloseappButtonText: {
    fontSize: 17,
    fontFamily: 'RalewayBold',
    color: "#fff",
     
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"flex-end",
    marginRight:10,
    marginLeft:10

  },
  BackButtonContainer:{
    backgroundColor:"black",
    borderRadius:200,
    alignItems:'center',
    justifyContent:'center',
    marginTop:-20,
    marginBottom:40,
    marginLeft:10,
    padding:5,
    width:40,
    height:40
  },
  place:{
    fontFamily: 'RalewayBold',
    fontSize:18,
    marginBottom:10,

},
barCode:{
height:100,
width:100,
color:"#0f0",


},
ticket:{
shadowColor: "#000",
flexDirection:'column',
backgroundColor: '#ffff',
padding:20,
borderRadius:10,
width:'95%',
justifyContent:'center',
marginVertical: 15,
marginTop:10,
marginHorizontal: 8,
shadowColor: "#000",
shadowOffset: {
    width: 0,
    height: 1,
},
shadowOpacity: 0.18,
shadowRadius: 1.00,
elevation: 1,
},
row3:{
marginTop:20,

alignItems:'center',
justifyContent:"center",


}
,
info:{
marginTop:0,
marginBottom:15,
color:"grey",
fontFamily: 'RalewayRegular',
},

venueContainer: {
    flexDirection:'row',
    alignItems:'center',
    borderBottomWidth:1,
    borderBottomColor:'#e4e3e3',
    
    paddingBottom:20
},
tinyBanner:{
    width:40,
    height:40,
    borderRadius:15,
    marginRight:20,
},

venueInfoContainer: {
    
}
,
title:{
  fontSize:15,
  fontFamily: 'RalewayBold',
  marginTop:5,
},

venueName: {
},
venueLocation: {
    fontSize:12,
    fontFamily: 'RalewayRegular',
},
});
export default Map;