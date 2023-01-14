declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: 'development' | 'production';
			NEXT_PUBLIC_HTTP_SERVER_URL: string;
			NEXT_PUBLIC_WS_SERVER_URL: string;
		}
	}
}

export {};
