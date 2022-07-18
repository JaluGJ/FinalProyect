import { Alert, TouchableOpacity, Text, TextInput, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { CardField, useConfirmPayment, CardForm } from '@stripe/stripe-react-native';
import { fetchPaymentIntent, fetchStatusPayment } from "../helpers/payments.js";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { removeItems } from "../../../redux/slices/products.js";
import styles from '../Styles/CartPayment.jsx'
import logo from '../../../../assets/instrumentos/logo2.png'
import { vh, vw } from "react-native-expo-viewport-units";
import { create } from "../../../redux/slices/signin.js";
const CartModalBotton = ({ modal, setModal }) => {
  const [email, setEmail] = useState("");
  const [cardDetails, setCardDetails] = useState("");
  const [body, setBody] = useState({});
  const { user ,token } = useSelector(state => state.signin);
  const { confirmPayment, loading } = useConfirmPayment()
  const dispatch = useDispatch();

  useEffect(() => {
    AsyncStorage.getItem("@shoppingCart").then(res => {
      setBody({
        items: JSON.parse(res),
        userId: user.id
      })
    }).catch(err => {
      console.log(err);
    });
  }, [])


  const handlerPayPress = async () => {
    if (!email || !cardDetails?.complete) {
      Alert.alert("Error", "Por favor, complete los datos requeridos");
      return;
    }
    try {
      const { clientSecret, error } = await fetchPaymentIntent(body);

      if (error) {
        alert(error);
        return;
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          type: "Card",
          billing_details: {
            email,
          },
        })

        if (error) {
          const { err } = await fetchStatusPayment(body, 'Failed');
          if (err) {
            console.log(err);
          }
          Alert.alert(`${error.message}`);
          return;
        } else if (paymentIntent) {
          const { msg, err } = await fetchStatusPayment(body, 'Successful');
          if (msg) {
            console.log('articulo pagado y agregado correctamente')
          } else if (err) {
            console.log(err)
          }
          dispatch(create(token))
          Alert.alert('Estado de pago', 'Exitoso', [{
            text: 'OK', onPress: () => {
              setModal(false)
              dispatch(removeItems())
            }
          }]);
        } else {
          await fetchStatusPayment(body, 'Failed');
          Alert.alert('Estado de pago', 'Fallido', [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);
        }
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  }

  return (
      <View style={styles.containerCard}>
        <Image
          style={{
            width: vw(70),
            height: vh(35),
            top: vh(5),
            right: vw(-20),
            padding: 10,
            position: 'absolute',
            opacity: 0.7,

        }}
        resizeMode="contain"
        source={logo}
        />
        <View style={styles.containerInput}>
          <TextInput
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="Ingresa tu email"
            onChange={(event) => {
              setEmail(event.nativeEvent.text);
            }}
            style={styles.input}
          />
        </View>
        <CardField
          postalCodeEnabled={true}
          AdressFieldsEnabled={true}
          placeholder='4242 4242 4242 4242'
          cardStyle={styles.card}
          style={styles.cardContainer}
          onCardChange={(card) => {
            setCardDetails(card);
          }}
        />
        
        

        {/* <Button title="Pay" onPress={handlerPayPress} disabled={loading} /> */}
        <TouchableOpacity
          onPress={handlerPayPress}
          style={styles.buttoPage}
          disabled={loading}
        >
          <Text style={styles.buttoPageText}>PAGAR</Text>
        </TouchableOpacity>
      </View>
  );
};

export default CartModalBotton;
