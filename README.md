# openfeature-demo
Demo of [OpenFeature](https://openfeature.dev/) using [flagd](https://flagd.dev/) as a provider.  This uses the [OpenFeature Web SDK](https://openfeature.dev/docs/reference/technologies/client/web/), allowing the Web client to get feature flag values from the flagd provider directly.

## Prerequisites
- Docker with Docker Compose

## Running
1. Run `docker compose up` in the root of this project.
2. Navigate to `localhost:8111` to view the client Web page.

## Resources
- OpenFeature
  - [docs](https://openfeature.dev/docs/reference/intro)
  - [web SDK](https://openfeature.dev/docs/reference/technologies/client/web/)
- flagd
  - [docs](https://flagd.dev/)
  - [quick start](https://flagd.dev/quick-start/)
  - [web provider](https://flagd.dev/providers/web/)
  - [flag definitions](https://flagd.dev/reference/flag-definitions/)