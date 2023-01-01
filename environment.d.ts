declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BINANCE_API_KEY: string
      BINACE_API_SECRET: string
    }
  }
}

export {}
