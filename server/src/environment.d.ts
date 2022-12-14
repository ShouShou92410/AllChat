declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: 'development' | 'production';
			PORT: string;
			DETA_PROJECT_KEY: string;
		}
	}
}

export {};
