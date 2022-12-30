import { useCallback, useState } from 'react';

const useMessage = () => {
	const [last, setLast] = useState('');

	const [data, setData] = useState<any>(null);
	const [error, setError] = useState<any>(null);
	const [isLoading, setIsLoading] = useState(false);

	const fetchMessage = useCallback(
		async (limit: number) => {
			if (last !== undefined) {
				setIsLoading(true);
				setData(null);
				setError(null);

				const res = await fetch(
					`http://localhost:3001/message?limit=${limit}&last=${last}`
				);

				setTimeout(async () => {
					if (!res.ok) {
						setError('Failed to fetch data');
					} else {
						const result = await res.json();

						setLast(result.last);
						setData(result.items);
					}

					setIsLoading(false);
				}, 5000);
			}
		},
		[last]
	);

	return { data, error, isLoading, fetchMessage };
};

export default useMessage;
