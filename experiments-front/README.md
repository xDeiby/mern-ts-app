# Manual de instalación

### Intalacion de node
Se debe intalar versiones de node sobre la v14

Instalación de node en ubuntu
~~~ 
sudo apt install nodejs 
~~~
Instalación npm en ubuntu
~~~
sudo apt install npm
~~~

- Si se esta usando windows, simplemente desargar en <https://nodejs.org/es/>

### Instalación de paquetes
- Ya habiendo descargado el proyecto, con node y npm instalados, se deben instalar las dependencias del proyecto mediante el siguiente script (Estando dentro del directorio del proyecto en la cmd).
~~~
npm install
~~~
- o si esta utilizando yarn
~~~
yarn
~~~

### Scripts
- Para ejecutar la aplicación en modo desarrollo
~~~
npm start
o
yarn start
~~~
- Si se quiere trabajar con las pruebas de sistema e integración
~~~
npm run cypress:open
o
yarn run cypress:open
~~~
- Para realizar los test unitarios
~~~
npm run test
o
yarn run test
~~~
- Por último, para el despliegue de la aplicación
~~~
npm build
o
yarn build
~~~
