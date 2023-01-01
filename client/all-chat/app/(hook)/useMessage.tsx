import { useCallback, useState } from 'react';
import { IChatPayload } from '../(context)/WebSocketContext';

const ERROR_MESSAGE = '😭 Something went wrong 😭';

const useMessage = () => {
	const [last, setLast] = useState('');

	const [data, setData] = useState<IChatPayload[] | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const fetchMessage = useCallback(
		async (limit: number) => {
			if (last !== undefined) {
				setIsLoading(true);
				setData(null);
				setError(null);

				try {
					const res = await fetch(
						`http://localhost:3001/message?limit=${limit}&last=${last}`
					);

					if (!res.ok) {
						setError(ERROR_MESSAGE);
						return;
					}
					const result = await res.json();

					setLast(result.last);
					setData(result.items);
				} catch (error) {
					setError(ERROR_MESSAGE);
				} finally {
					setTimeout(async () => {
						setIsLoading(false);
					}, 5000);
				}
			}
		},
		[last]
	);

	return { data, error, isLoading, fetchMessage };
};

export default useMessage;
