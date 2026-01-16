# Capacitor Android Permissions

When you add the Android platform with `npx cap add android`, you need to add GPS permissions.

## Add these permissions to `android/app/src/main/AndroidManifest.xml`:

Inside the `<manifest>` tag, add:

```xml
<!-- Location Permissions for Qibla and Prayer Times -->
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />

<!-- Internet Permission -->
<uses-permission android:name="android.permission.INTERNET" />

<!-- Notification Permission for Prayer Reminders -->
<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
<uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM" />
<uses-permission android:name="android.permission.VIBRATE" />
```

## Status Bar Configuration

In `android/app/src/main/res/values/styles.xml`, update the theme to not cover the status bar:

```xml
<style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
    <item name="android:statusBarColor">@android:color/transparent</item>
    <item name="android:navigationBarColor">@android:color/transparent</item>
    <item name="android:windowDrawsSystemBarBackgrounds">true</item>
</style>
```

## Install Capacitor Plugins for GPS

Run these commands after adding Android:

```bash
npm install @capacitor/geolocation
npx cap sync android
```

Then in your code, you can request location permissions:

```typescript
import { Geolocation } from '@capacitor/geolocation';

// Request permissions
const permissions = await Geolocation.requestPermissions();

// Get current position
const position = await Geolocation.getCurrentPosition();
```
