# Monitor web client

### Upute za pokretanje:

1. git clone
2. git checkout develop
3. yarn (za instaliranje paketa, instalirati yarn ako ga nemate)
4. yarn start (za pokretanje aplikacije)

### Upute za github workflow:

1. Svaka grupa treba da se brancha iz 'develop' u branch grupaX ( moze i proizvoljno ime).
2. Svaki novi task se dalje branch-a na način feat/ime-taska.
3. Svaki bugfix se brancha kao fix/ime-fixa.
4. Kada završite task na svom branchu (feat/nesto), pravite pull request na branch grupaX.
5. Druga osoba iz vašeg tima pravi review i approva ili rejecta pull request.
6. Na kraju sprinta sastaju se sve grupe i mergamo sve u develop branch gdje se rješavaju konflikti i rade finalne izmjene.
7. Ako je sve u redu na develop branchu, merga se develop u master branch a zatim ide deploy.
