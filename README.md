tt# Monitor web client

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
5. Nakon toga, kreirate Issue s istim imenom (feat/nesto) i linkate ga na Pull Request (https://docs.github.com/en/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue) i dodijelite drugu osobu koja nije radila taj task da popuni Issue (napiše test scenario).
6. Zatim, tester vrši provjeru koda te ako prolazi test scenario approva ili rejecta pull request. (https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-request-reviews).
7. Na kraju sprinta sastaju se sve grupe i mergamo sve u develop branch gdje se rješavaju konflikti i rade finalne izmjene.
8. Ako je sve u redu na develop branchu, merga se develop u master branch a zatim ide deploy.
