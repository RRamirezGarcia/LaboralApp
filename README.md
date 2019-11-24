# LaboralApp: Una aplicación para determinar cálculos relacionados a aspectos laborales

## Desarrollo

Esta aplicación fue desarrollada en PhoneGap (Bajo Apache Córdova), que como sabemos es un framework para el desarrollo de aplicaciones móviles. Principalmente, PhoneGap permite a los programadores desarrollar aplicaciones para dispositivos móviles utilizando herramientas genéricas tales como JavaScript, HTML5 y CSS3.

El framework provee una estructura propia, a la cual podemos adaptarnos fácilmente.

De la misma forma para las pruebas del aplicativo podemos realizarlo a través de PhoneGap App, la cual deberá descargar desde su respectivo store. 

## Versión y características de la aplicación

La versión que se muestra en este repositorio es 1.1, la cual incluye: Registrar el perfil de usuario de acuerdo a sus condiciones laborales, calcular la estructura de su sueldo, calcular el monto de boleta del mes que requiera y calcular la liquidación de beneficios sociales. 

## Despliegue en Play Store

El aplicativo se encuentra registrado en mi cuenta personal de Play Store, al cual pueden acceder a través de la siguiente ruta: 
https://play.google.com/store/apps/details?id=com.phonegap.laboralapp

Brindo los pasos que utilicé para desplegar mi aplicativo en dicha plataforma, y que puede ser de gran utilidad para ustedes:

**#generar apk:**
cordova build android --release

**#generar el almacen de llaves:**
keytool -genkey -v -keystore laboralapp.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000

**#firmar la aplicacion:**
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore laboralapp.keystore app-release-unsigned.apk laboralapp

**#verificar el almacen de firmas:**
keytool -keystore laboralapp.keystore -list -v

**#optimizar y renombrar la aplicacion:**
zipalign -v 4 app-release-unsigned.apk laboralapp.apk


**#En carpeta ./platforms/android/ ejecutar el siguiente comando, para generar bundle con la finalidad de subirlo al google play:**
gradlew app:bundleRelease

**#El nombre laboralapp deberá ser reemplazado por el nombre de su aplicación.**
