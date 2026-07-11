# news-board

A low distraction, personal news feed aggregator with keyword based interest classification, searching and filtering.

## Backend Architecture Overview

This backend is designed to fetch news via web scraping in an event-driven manner and periodically.

<img src="./docs/arch.png" width="800">

### Project structure

```text
config/                 # scraper config files
docs/
src/
├── api/                # Express HTTP layer
│   ├── controllers/
│   ├── routes/
│   └── api.ts          # application entrypoint
├── common/             # app config, constants, error utils and graceful shutdown event registry
├── features/           # services, repositories and models separated by domain
│   └── scraper/
├── internal/           # application infrastructure and background tasks
│   ├── jobs/           # scheduled and triggerable tasks
│   └── scraper/        # scraping and browser automation logic
├── tests/
│   └── unit/
│── types/
└── index.ts            # temp entrypoint for development
```
