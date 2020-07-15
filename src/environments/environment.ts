// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  pubnub: {
    publishKey: 'demo',
    subscribeKey: 'sub-c-4377ab04-f100-11e3-bffd-02ee2ddab7fe',
    channels: ['pubnub-market-orders'],
  },
};
