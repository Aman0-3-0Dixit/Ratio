import React, { useState, useEffect } from 'react';
import { View, Image, Pressable, Alert, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import img1 from './imgAssets/portrait.jpg';
import img2 from './imgAssets/groupFriends.jpg';
import img3 from './imgAssets/activity.jpg';
import img4 from './imgAssets/fullBody.jpg';
import img5 from './imgAssets/pets.jpg';
import img6 from './imgAssets/smiling.jpg';

const images = [img1, img2, img3, img4, img5, img6];
const imageTexts = ['Portrait', 'Group/Friends', 'Activity/Sports', 'Full Body', 'Pets/Outdoor', 'Smiling'];

export default function App() {
  const [selectedImages, setSelectedImages] = useState(Array(6).fill(null));
  const [remainingPictures, setRemainingPictures] = useState(3);
  const [buttonColor, setButtonColor] = useState('gray');
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (remainingPictures <= 0) {
      setButtonColor('#ff1493');
      setButtonDisabled(false);
    } else {
      setButtonColor('gray');
      setButtonDisabled(true);
    }
  }, [remainingPictures]);

  const pickImageAsync = async (index) => {
    console.log('pickImageAsync function called');
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log('Permission result:', permissionResult);
    if (!permissionResult.granted) {
      Alert.alert('Permission to access media library is required.');
      return;
    }
  
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
  
    console.log('Image picker result:', result);
  
    if (!result.cancelled) {
      const selectedImageUri = result.assets[0].uri;
      console.log('Selected image URI:', selectedImageUri);
      const newSelectedImages = [...selectedImages];
      
      // Checking if the box already has an image selected
      const isImageSelected = !!newSelectedImages[index];

      newSelectedImages[index] = selectedImageUri;
      setSelectedImages(newSelectedImages);

      // Decreasing remaining pictures count only if the box didn't have an image selected previously
      if (!isImageSelected) {
        setRemainingPictures(remainingPictures - 1);
      }
    } else {
      Alert.alert('You did not select any image.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pick the photos that make you stand out</Text>
      <Text style={styles.subtitle}>Use our guide to increase your matching. We want you to have the best experience!</Text>
      <View style={styles.imageContainer}>
        {selectedImages.map((uri, index) => (
          <Pressable
            key={index}
            style={[styles.imageBox, { backgroundColor: uri ? 'transparent' : 'lightgray' }]}
            onPress={() => pickImageAsync(index)}
          >
            <View style={styles.imageWrapper}>
              {uri && <Image source={{ uri }} style={styles.image} />}
              {!uri && (
                <>
                  <Image source={images[index]} style={[styles.image, { opacity: 0.5 }]} />
                  <Text style={styles.imageText}>{imageTexts[index]}</Text>
                </>
              )}
            </View>
          </Pressable>
        ))}
      </View>
      {remainingPictures > 0 && (
        <Text style={styles.remainingPicturesText}>
          We need {remainingPictures} more {remainingPictures === 1 ? 'picture' : 'pictures'} to finalize your profile.
          {'\n'}
          Tip: Make sure at least one of the pictures shows your face clearly!
        </Text>
      )}
      <Pressable
        style={[styles.button, { backgroundColor: buttonColor }]}
        onPress={() => Alert.alert('You are all set!')}
        disabled={buttonDisabled}
      >
        <Text style={styles.buttonText}>You are all set !</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 17,
    marginTop: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 30,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  imageBox: {
    width: 100,
    height: 150,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'lightgray',
    margin: 5,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  imageText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -40 }, { translateY: -7 }],
    textAlign: 'center',
    alignContent:'center',
    fontSize: 12,
    color: 'black',
  },
  remainingPicturesText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
















