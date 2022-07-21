import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Icon } from "@rneui/themed";
import styles from "./styles/CustomAlert";
import { ModalPoup } from "./CustomAlert";
import { useDispatch, useSelector } from "react-redux";

const CustomAlertPayment = ({
  visible,
  flag,
  title,
  message,
  color,
  iconName,
}) => {
  const dispatch = useDispatch();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ModalPoup visible={visible}>
        <View style={{ alignItems: "center" }}></View>
        <View style={{ alignItems: "center" }}>
          <Icon
            name={iconName}
            type="material-community"
            size={100}
            color={color}
          />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{message}</Text>
        <View style={styles.bottom}>
          <TouchableOpacity
            onPress={() => {
              dispatch(setModalAlert(false))
              setTimeout(() =>{
                 dispatch(setFlag(true))
                }, 500);
            }}
            
            style={flag ? styles.buttonCloseSuccessful : styles.buttonCloseError}
          >
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </ModalPoup>
    </View>
  );
};

export default CustomAlertPayment;



{/* <CustomAlertPayment
              
flag={flag}
setFlag={setFlag}
title={
  flag
  ? "¡Su pago a sido exitoso!"
    : "¡Su pago a sido denegado!"
}
message={
  flag ? "Gracias por su compra" : "Por favor revise sus datos" 
}
color={flag ? "#01A601" : "#F70000"}
iconName={flag ? "check-decagram" : "alert-circle"}
/> */}