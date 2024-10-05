import { Text, View } from "react-native";
import { Input } from '@/components/input';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingHorizontal: 10,
        gap: 15
      }}
    >
      <Input placeholder="Enter"  onTextChange={() => {}} error="" icon="user" type="text"/>
      <Input placeholder="Enter"  onTextChange={() => {}} error="" keyboardType="email-address" icon="email" type="email"/>
      <Input placeholder="Enter"  onTextChange={() => {}} error="" icon="eye" type="password"/>
      <Input placeholder="Enter"  onTextChange={() => {}} error="A senha digitada não é igual a do campo anterior" icon="eye" type="password"/>
    </View>
  );
}
