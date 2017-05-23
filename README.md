## International Space Station - Simple React Native Application showing current position of ISS

### Usage instructions:
1. Download or clone app
2. [Generate new API Key](https://developers.google.com/maps/documentation/android-api/)
3. In file:
 >android\app\src\main\AndroidManifest.xml

   find and overwrite "PUT_YOUR_API_KEY_HERE" with generated key
4. Install dependecies:
```
npm install
```
5. Connect Android device or run [Android Virtual Device](https://developer.android.com/studio/run/managing-avds.html)
6. Start application with:
```
react-native run-android
```