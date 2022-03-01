# TECNICAS AVANZADAS DE DESARROLLO DE SOFTWARE (TADS)

## DOCENTES

* Meca, Adrian
* Otaduy, Andres

## INTEGRANTES

* Beron, Fernando - Legajo: 31836
* Tabasso, Nahuel - Legajo: 43204

## DESCRIPCION DEL PROYECTO

Trabajo practico final Front-End de la asignatura Tecnicas Avanzadas de Desarrollo de Software (TADS) de la carrera de Ingenieria en Sistemas de informacion 
de UTN FRRo. Esta aplicacion esta desarrollada en Angular 9 integrando el template de codigo abierto y gratuito de [AdminLTE3](https://adminlte.io/themes/v3/) .  
El sistema a desarrollar será una mini red social donde los usuarios podrán compartir publicaciones con imágenes, las cuales podrán ser comentadas y reaccionadas por otros usuarios. 
Los usuarios podrán relacionarse o conectarse con otros usuarios mediantes grupos de amistad. Los usuarios tendrán el control de quien puede ver, comentar o reaccionar a sus publicaciones.

## EMPEZANDO

Instalar el siguiente software en su sistema operativo (Windows, Linux, MacOS)
* Node 12.x  [NodeJS](https://nodejs.org/en/)
* npm 6.13
* Angular CLI 9.0.2 [Angular CLI](https://github.com/angular/angular-cli)

Primero instalamos NodeJS y npm (npm se instala automaticamente al instalar NodeJS)
Despues instalamos angular cli 
`
    npm install -g @angular/cli
`
## LEVANTAR LA APP EN AMBIENTE LOCAL
	- git clone <repo> 
	- git checkout develop 
	- git pull origin develop 
	- npm install
	- ng serve --poll=2000
    - Navegar hacia http://localhost:4200/ 

## CONSTRUIR EL  PROYECTO
Ejecutar `ng build` para construir el proyecto. Este comando generara una carpeta `dist/` en el directorio que contendra todos los archivos .js y html de la aplicacion. Para construir para un entorno de producion ejecutar `ng build --prod`

## PASOS PARA INTEGRAR EL TEMPLATE DE [AdminLTE3](https://adminlte.io/themes/v3/) EN UN PROYECTO DE ANGULAR

En el directorio raiz del proyecto se encuentra un archivo txt `pasos-integrar-template.txt` con los pasos necesarios para integrar el template en una aplicacion generada con Angular CLI.
