import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ImageBackground
} from "react-native";

export default class BMIScreen extends React.Component {
  state = {
    height: '',
    mass: '',
    resultNumber: '',
    resultText: ""
  };

  handleCalculate = () => {
    const imc = this.state.mass/(this.state.height/100*this.state.height/100);
    this.setState({ resultNumber: imc.toFixed(2)});

    if (imc < 18.5) {
      this.setState({ resultText: "Kekurangan berat badan" });
    } else if (imc > 18.5 && imc < 25) {
      this.setState({ resultText: "Berat Badan Ideal" });
    } else if (imc >= 25 && imc < 30) {
      this.setState({ resultText: "Kelebihan berat badan" });
    } else {
      this.setState({ resultText: "Obesitas" });
    }
  };

  render() {
    return (
      <ImageBackground
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.container}>
          <Text
            style={{
              justifyContent: "center",
              alignSelf: "center",
              marginTop: 30,
              fontSize: 15
            }}
          >
            BMI Calculator
          </Text>
          <View style={styles.intro}>
            <TextInput
              placeholder="Tinggi"
              keyboardType="numeric"
              style={styles.input}
              onChangeText={height => {
                this.setState({ height });
              }}
            />
            <TextInput
              placeholder="Berat"
              keyboardType="numeric"
              style={styles.input}
              onChangeText={mass => {
                this.setState({ mass });
              }}
            />
          </View>

          <TouchableOpacity
            onPress={this.handleCalculate}
          >
            <Text style={styles.buttonText}>Hitung BMI</Text>
          </TouchableOpacity>
          <Text style={styles.result}>{this.state.resultNumber}</Text>
          <Text style={[styles.result, { fontSize: 20 }]}>
            {this.state.resultText}
          </Text>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  intro: {
    flexDirection: "row"
  },
  input: {
    height: 80,
    textAlign: "center",
    width: "50%",
    fontSize: 40,
    marginTop: 24,
    color: "#05375a"
  },
  buttonText: {
    alignSelf: "center",
    textAlign:"center",
    padding: 20,
    fontSize: 25,
    color: "#ff00ff",
    fontWeight: "bold"
  },
  result: {
    alignSelf: "center",
    textAlign:"center",
    color: "#05375a",
    fontSize: 40,
    padding: 15
  }
});