# Cog-Music

## The API is implemented with node / express
## An example UI is also implemented with react (see below)

# 1. API
**Install**
```
yarn
(or npm install)
```

**start the server**
```
PORT=5000 node server.js
express listening on 5000
```
---

**fetch albums**
```
curl http://localhost:5000/albums
```
---

**fetch album details**
```
curl http://localhost:5000/album/1
```
---

**create an album**
```
curl -H'Content-Type:application/json' --data '{"album":"The Wall", "artist" : "Pink Floyd", "genre" : "Classic Rock", "year" : "1979"}' localhost:5000/createalbum
```
**NOTE** : all fields are required to insert an album

---
**update an existing album by id**
```
curl --request PUT -H'Content-Type:application/json' --data '{"album":"NEW TITLE"}' localhost:5000/updatealbum/1
```
**NOTE** unspecified fields will not be edited

---

**delete an album**
```
curl --request DELETE localhost:5000/delete/1
```
---
**get an index of artists**
```
curl localhost:5000/artists
```
---
**view albums by an artist name**
```
curl localhost:5000/artist/the%20beatles
```
---

**view a count of albums by genre**
```
curl localhost:5000/byGenre
```
---
**view a count of albums by year**
```
curl localhost:5000/byYear
```

# 2. UI
```
yarn start
```