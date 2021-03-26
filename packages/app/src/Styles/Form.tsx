import { Platform, StyleSheet } from "react-native";

export const FormStyles = StyleSheet.create({
  FormControl: {
    marginBottom: 5,
  },
  Inline: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  // Label
  InputLabel: {
    marginBottom: 4,
    color: "dimgrey",
  },
  // Field
  InputField: {
    borderWidth: 1,
    borderColor: "lightgrey",
    backgroundColor: "#e8e8e8",
    padding: 8,
    paddingVertical: 4,
    borderRadius: 5,
    marginBottom: 5,
    color: "dimgrey",
  },
  WrongField: {
    borderColor: "indianred",
    color: "indianred",
  },
  FieldError: {
    color: "indianred",
    fontSize: 12,
    fontWeight: "600",
  },
  HelperText: {
    color: "grey",
    fontSize: 12,
  },
  // Checkbox
  Checkbox: {},
  // Datepicker
  Datepicker: {
    marginHorizontal: 8,
    marginBottom: 7,
  },
  // Buttons
  PrimaryButton: {
    alignSelf: "flex-start",
    backgroundColor: "brown",
    padding: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  PrimaryButtonText: {
    color: "white",
    fontWeight: "600",
    textAlign: "center",
  },
  // Footer
  FooterText: {
    color: "grey",
    fontSize: 13,
  },
});
