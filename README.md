# Shared React Component

## Description

A **shared React component library** for reuse across multiple projects.

## Setup Github Submodule

**RUN**

```
git submodule add https://github.com/perceptronbd/shwapno-client-shared.git src/shared-components
```

**package.json:** add inside the script block of the parent repository

```json
{
  "update-submodule": "node src/shared-components/update-submodule.cjs"
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
  "install-shared-peerdeps": "node src/shared-components/install-peer-deps.cjs",
  "postinstall": "npm run install-shared-peerdeps"
}
```

**tailwind.config.ts:** copy & paste

```typescript
import { tailwindConfig } from "./src/shared-components/tailwind.config";

export default tailwindConfig;
```
