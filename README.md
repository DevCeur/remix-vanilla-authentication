# Remix Vanilla Authentication

This is just an implementation of a simple authentication flow, using user credentials.
It was built using core features from Remix such as `Sessions (cookieSessionStorage)`.

## Why?

I wanted to re-learn some key features of this framework since I tried that at the begining but with the latest update some stuff has changed, specially the routing system.

This implementation was made trying to follow some best practices from the Remix docs. also have protected routes and uses [Zod]() to provide form validation on the server.

- [Remix Docs](https://remix.run/docs)

## Development

Create a `.env` file and include a `AUTH_SECRET` variable with a random long secret

```env
AUTH_SECRET=some-super-long-secret-to-encrypt-auth-cookie
```

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`
