# HOLO Challenge - Mutants

## TL;DR

`npm install`

Para ejecutar la API 

`npm start`


Para ejecutar los tests:

`npm test`

## Enunciado

Magneto quiere reclutar la mayor cantidad de mutantes para poder luchar contra los X-Mens.

Te ha contratado a ti para que desarrolles un proyecto que detecte si un humano es mutante basándose en su secuencia de ADN. Para eso te ha pedido crear un programa con un método o función con la siguiente firma:

isMutant(dna);

En donde recibirás como parámetro un array de Strings que representan cada fila de una tabla de (NxN) con la secuencia del ADN. Las letras de los Strings solo pueden ser: (A,T,C,G), las cuales representan cada base nitrogenada del ADN.

A T G C G A
C A G T G C
T T A T T T
A G A C G G
G C G T C A
T C A C T G
A T G C G A
C A G T G C
T T A T  G T
A G A A G G
C C C C T A
T C A C T G


No-Mutante
Mutante



Sabrás si un humano es mutante, si encuentras más de una secuencia de cuatro letras iguales​, de forma oblicua, horizontal o vertical.


Ejemplo (Caso mutante):

dna = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"];

En este caso el llamado a la función isMutant(dna) devuelve “true”. Desarrolla el algoritmo de la manera más eficiente posible.

Desafíos:

Nivel 1:
Programa el algoritmo requerido por Magneto.

Nivel 2:
Crear una API REST, con el servicio el servicio “/mutant/” en donde se pueda detectar si un humano es mutante enviando la secuencia de ADN mediante un HTTP POST con un Json el cual tenga el siguiente formato:

POST → /mutant/
{
“dna”:["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
}

En caso de verificar un mutante, debería devolver un HTTP 200-OK, en caso contrario un 403-Forbidden

Nivel 3:
Anexar una base de datos en Mongodb, la cual guarde los ADN’s verificados con la API. Solo 1 registro por ADN.

Exponer un servicio extra “/stats” que devuelve un Json con las estadísticas de las verificaciones de ADN: {“count_mutant_dna”:40, “count_human_dna”:100: “ratio”:0.4}


--- 
# Solution

## Tech stack
 
Node js - Express - Mongoose 

## Algorithm solution

Se utiliza un algoritmo recursivo para verificar si existe el patrón buscado. 
Al encontrar 2, se detiene la ejecución para evitar seguir recorriendo la matriz.

## API

Se implementa una API (conectada a mongodb Atlas) con los siguientes endpoints:

### POST /mutants

Recibe en el body un {dna: []}

Devuelve 200 o 403 según es o no mutante y almacena en la base de datos el resultado de la ejecución

### GET /stats

Devuelve un objeto json con estadísticas de las ejecuciones


## TESTING

Se realizan los tests correspondientes utilizando JEST y SUPERTEST
