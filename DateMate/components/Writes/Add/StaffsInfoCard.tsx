import {useMemo} from 'react';
import {Pressable, View} from 'react-native';
import {useUserContext} from '../../../contexts/UserContext';

const StaffsInfoCard = ({
  name,
  phoneNumber,
  country,
  description,
  address,
  id,
  createdAt,
}: any) => {
  const date = useMemo(
    () => (createdAt ? new Date(createdAt._seconds * 1000) : new Date()),
    [createdAt],
  );

  const {name: me} = useUserContext();
  const isMyPost = me.id === name.id;

  return (
    <View>
      <View>
        <Pressable>{name.name}</Pressable>
      </View>
    </View>
  );
};

export default StaffsInfoCard;
