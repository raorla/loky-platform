# Loky iApp

## Overview

In the current version, the protected data contains data stored in 4 different fields:
- rib
- contrat-travail
- avis-imposition
- fiche-paye

When launching the app, an AI model is started and is injected with a prompt containing the protected data content.

Note: The protected data are deserialize with a Rust binary called borsh-deser.

## Build locally

```
docker build --progress plain -t loky .
```

## Test locally with a protected data

```
EXPERIMENTAL_TDX_APP=1 iapp test --protectedData "dossier"
```

## What could be improved ?

- Improve borsh-deser binary, a Rust binary to retrieve data from a protected data
- Make it more convenient to check different AI models
