import { StyleSheet } from "react-native";
import { vh, vw } from "react-native-expo-viewport-units";
let styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    letterSpacing: 6,
    padding: 20,
  },
  containerText: {
    alignItems: "center",
    marginVertical: 20,
  },
  text: {
    fontSize: 20,
    letterSpacing: 2,
    textAlign: "center",
  },
  containerTextLinked: {
    flexDirection: "row",
  },
  textLinked: {
    fontSize: 20,
    color: "#DD8643",
    letterSpacing: 2,
  },
  container: {
    height: "100%",
    alignItems: "center",
  },
  /******************* ESTILOS DE PRODUCTOS *************************/
  containerProduct: {
    flexDirection: "row",
    height: 150,
    width: vw(95) /* VERSATIL */,
    paddingLeft: 10,
    marginTop: 9,
    marginHorizontal: 5,

    shadowColor: "#00000076",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.79,
    shadowRadius: 1.65,
    elevation: 1,
    borderRadius: 30,
    backgroundColor: "#ffffff",
  },
  containerProductInfo: {
    justifyContent: "space-around",
    width: "70%",
    height: "100%",
  },
  containerProductImage: {
    width: vw(35),
    height: 160,
    justifyContent: "center",
  },
  productName: {
    flexWrap: "wrap",
    width: vw(45),
    fontSize: 15,
    letterSpacing: 2,
    color: "#000000",
  },
  productInfo: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
  productImage: {
    width: "70%",
    height: "70%",
  },
  productPrice: {
    fontSize: 15,
    letterSpacing: 2,
  },
  productBrand: {
    color: "#777777",
  },
  productCount: {
    fontSize: 20,
    marginHorizontal: 15,
    letterSpacing: 2,
  },
  containerTrash: {
    justifyContent: "center",
    alignItems: "center",
  },
  containerNameTrash: {
    width: "85%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  /*************** HOME FAV ******************/
  containerFavHome: {
    width: vw(90),
    height: vh(45),
    borderRadius: 50,
    marginHorizontal: 20,
    backgroundColor: '#000000',
    shadowColor: "#ff994b",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    marginHorizontal: 5,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
  },
  titleFavHome: {
    fontSize: 20,
    letterSpacing: 6,
    padding: 20,
    color: "#DD8643",
  },
  productsFavHome: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  productFavHome: {
    width: '50%',
    height: vh(16),
    borderWidth: 0.5,
  },
});

export default styles;
