# node + express, react, db

# node => ambiente di sviluppo javascript al di fuori del browser, basato sul V8 di chrome
# express => framework in ambiente node per facilitare le operazioni di backend
# in particolare sull architettura REST api => basato su utilizzo di risorse i quali
# si effettuano operazioni CRUD - create, read, update, delete

# npm init -y
# npm i express
# nel package.json, magari modificare gli script (npm run dev), usare watch per la compilazione a runtime

# const express .... require  => common JS - senno es6 si usa import/export moderno con i moduli
# creazione rotte => si indica i metodi di richiesta HTTP (chiamate api) get, post, delete, patch => che manda alle operazioni index, show
# per un organizzazione migliore del progetto, si crea una cartella routers => in cui vengono messe le rotte riguardanti una specifica risorsa
# si crea una cartella controllers => in cui ci saranno le operazioni specifiche in base al tipo di operazione da effettuare su una risorsa
# middlewares
# client => chiamata API => server => cerca la rotta => dalla rotta viene effettuata l'operazione richiesta (middleware) => e poi viene mandata la risposta HTTP
# CLIENT => MIDDLEWARES => RISPOSTA


# react 
# libreria per la creazione di interfacce grafiche
# crea applicazioni single page => per cui e costruito in modo tale da renderizzare la pagina a seguito di cambiamento di stato senza ricaricamento effettivo. Basa la funzionalita sull'utilizzo di componenti => i componenti sono scritto in jsx (misto js + html)
# sono presenti gli hooks => sono funzioni speciali di react che agiscono durante le fasi di render
# useState, useEffect, useRef quelli che abbiamo fatto 
# per aprire un progetto react, utilizziamo il builder Vite => semplice e veloce


# DB 
# DATA TYPE (INT, BITINT, CHAR, VARCHAR) => char è fisso, varchar dinamico (default 255) quindi ad esempio "ciao" => varchar(5)
# SELECT * FROM la tabella
# WHERE (condizioni)
# ORDER BY DESC/ASC
# JOIN per joinare tabelle (LEFT JOIN di base)
# collegamenti tra tabelle/risorse=> uno a molti, uno a uno, molti a molti
# tabelle ponte => molti a molti
# COUNT, AVG

# SERVER + DB
# pacchetto mysql2 che permette una connessione rapida e facile tra server e db
# const connection = mysql.createConnection({parametri del db}); connection.connect(cb)
# evitare le sql injections (cioe quello di mandare dati pericolosi al db) con l'utilizzo dei param dinamici contrassegnati con ?, controllo preliminare del dato da passare al db