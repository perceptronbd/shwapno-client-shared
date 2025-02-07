# Shared React Component

## Description

A **shared React component library** for shwapno client

## Setup Github Submodule

**RUN**

```
git submodule add https://github.com/perceptronbd/shwapno-client-shared.git src/shared-components
```

**package.json:** add inside the script block of the parent repository

```json
{
  "update-submodule": "node src/shared-components/setup/update-submodule.cjs"
}
```

**Run**

```
git submodule update  --init --remote
npm run update-submodule
```

## Installation

**package.json:** add inside the script block

```json
{
  "install-shared-deps": "node src/shared-components/setup/install-deps.cjs && node src/shared-components/setup/install-dev-deps.cjs",
  "postinstall": "npm run install-shared-deps"
}
```

**tailwind.config.ts:** copy & paste

```typescript
import { tailwindConfig } from "./src/shared-components/tailwind.config";

export default tailwindConfig;
```
